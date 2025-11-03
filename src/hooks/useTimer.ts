import { useEffect, useCallback, useRef } from 'react'
import { useAtom } from 'jotai'
import { timerStateAtom } from '../store/timer-store'
import { settingsAtom } from '../store/settings-store'
import { soundManager } from '../lib/sounds'
import { useStats } from './useStats'

export function useTimer() {
  const [timerState, setTimerState] = useAtom(timerStateAtom)
  const [settings] = useAtom(settingsAtom)
  const { recordPomodoroComplete, recordBreakComplete } = useStats()
  const hasPlayedSoundRef = useRef(false)

  useEffect(() => {
    soundManager.requestNotificationPermission()
  }, [])

  useEffect(() => {
    soundManager.setVolume(settings.soundVolume)
    soundManager.setEnabled(settings.soundEnabled)
  }, [settings.soundVolume, settings.soundEnabled])

  useEffect(() => {
    if (!timerState.isRunning) return

    const interval = setInterval(() => {
      setTimerState((prev) => {
        // Se já chegou a zero, não fazer nada (evita loop)
        if (prev.timeRemaining <= 0) {
          return prev
        }

        const newTime = prev.timeRemaining - 1

        // Quando chegar a zero exatamente
        if (newTime === 0) {
          const isWorkSession = prev.mode === 'work'
          
          // Tocar som e notificar apenas uma vez
          if (!hasPlayedSoundRef.current) {
            hasPlayedSoundRef.current = true
            
            if (isWorkSession) {
              recordPomodoroComplete(settings.workDuration)
              soundManager.play('work-end')
              soundManager.showNotification(
                'Sessão de Foco Completa! 🎉',
                `Você focou por ${settings.workDuration} minutos!`
              )
            } else {
              recordBreakComplete(
                prev.mode === 'break' ? settings.breakDuration : settings.longBreakDuration
              )
              soundManager.play('break-end')
              soundManager.showNotification(
                'Pausa Terminada! 💪',
                'Pronto para focar novamente?'
              )
            }

            // Auto-start próxima sessão se configurado
            const shouldAutoStart = isWorkSession 
              ? settings.autoStartBreaks 
              : settings.autoStartPomodoros

            // Determinar próximo modo
            const completedPomodoros = prev.completedPomodoros + (isWorkSession ? 1 : 0)
            let nextMode: 'work' | 'break' | 'longBreak' = 'work'
            
            if (isWorkSession) {
              // Acabou trabalho, vai para pausa
              if (completedPomodoros % settings.pomodorosUntilLongBreak === 0) {
                nextMode = 'longBreak'
              } else {
                nextMode = 'break'
              }
            } else {
              // Acabou pausa, volta para trabalho
              nextMode = 'work'
            }

            const nextDuration = nextMode === 'work' 
              ? settings.workDuration 
              : nextMode === 'break'
              ? settings.breakDuration
              : settings.longBreakDuration

            // Resetar flag de som após um breve delay
            setTimeout(() => {
              hasPlayedSoundRef.current = false
            }, 1000)

            return {
              ...prev,
              mode: nextMode,
              timeRemaining: nextDuration * 60,
              isRunning: shouldAutoStart,
              completedPomodoros: completedPomodoros,
              currentSession: prev.currentSession + 1,
            }
          }

          return prev
        }

        return {
          ...prev,
          timeRemaining: newTime,
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [
    timerState.isRunning, 
    setTimerState, 
    settings, 
    recordPomodoroComplete, 
    recordBreakComplete
  ])

  const start = useCallback(() => {
    const isStarting = !timerState.isRunning && timerState.timeRemaining > 0
    
    if (isStarting) {
      hasPlayedSoundRef.current = false
      if (timerState.mode === 'work') {
        soundManager.play('work-start')
      } else {
        soundManager.play('break-start')
      }
    }

    setTimerState((prev) => ({
      ...prev,
      isRunning: true,
    }))
  }, [timerState.isRunning, timerState.timeRemaining, timerState.mode, setTimerState])

  const pause = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
    }))
  }, [setTimerState])

  const reset = useCallback(() => {
    hasPlayedSoundRef.current = false
    setTimerState((prev) => {
      const duration = prev.mode === 'work' 
        ? settings.workDuration 
        : prev.mode === 'break'
        ? settings.breakDuration
        : settings.longBreakDuration

      return {
        ...prev,
        timeRemaining: duration * 60,
        isRunning: false,
      }
    })
  }, [setTimerState, settings])

  const skip = useCallback(() => {
    hasPlayedSoundRef.current = false
    setTimerState((prev) => {
      // Determinar próximo modo
      const isWork = prev.mode === 'work'
      const completedPomodoros = prev.completedPomodoros + (isWork ? 1 : 0)
      
      let nextMode: 'work' | 'break' | 'longBreak' = 'work'
      
      if (isWork) {
        if (completedPomodoros % settings.pomodorosUntilLongBreak === 0) {
          nextMode = 'longBreak'
        } else {
          nextMode = 'break'
        }
      } else {
        nextMode = 'work'
      }

      const duration = nextMode === 'work' 
        ? settings.workDuration 
        : nextMode === 'break'
        ? settings.breakDuration
        : settings.longBreakDuration

      return {
        ...prev,
        mode: nextMode,
        timeRemaining: duration * 60,
        isRunning: false,
        completedPomodoros: completedPomodoros,
        currentSession: prev.currentSession + 1,
      }
    })
  }, [setTimerState, settings])

  const toggle = useCallback(() => {
    if (timerState.isRunning) {
      pause()
    } else {
      start()
    }
  }, [timerState.isRunning, start, pause])

  const getProgress = useCallback(() => {
    const totalTime = timerState.mode === 'work'
      ? settings.workDuration * 60
      : timerState.mode === 'break'
      ? settings.breakDuration * 60
      : settings.longBreakDuration * 60
    
    return ((totalTime - timerState.timeRemaining) / totalTime) * 100
  }, [timerState, settings])

  return {
    timerState,
    start,
    pause,
    reset,
    skip,
    toggle,
    progress: getProgress(),
  }
}
