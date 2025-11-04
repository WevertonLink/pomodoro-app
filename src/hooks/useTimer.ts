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
  const hasCompletedRef = useRef(false)

  // Log para debug
  useEffect(() => {
    console.log('Timer State:', timerState)
  }, [timerState])

  useEffect(() => {
    soundManager.requestNotificationPermission()
  }, [])

  useEffect(() => {
    soundManager.setVolume(settings.soundVolume)
    soundManager.setEnabled(settings.soundEnabled)
  }, [settings.soundVolume, settings.soundEnabled])

  // Timer countdown
  useEffect(() => {
    if (!timerState.isRunning) return

    const interval = setInterval(() => {
      setTimerState((prev) => {
        if (prev.timeRemaining > 0) {
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerState.isRunning, setTimerState])

  // Detectar quando chega a zero e fazer transição
  useEffect(() => {
    if (timerState.timeRemaining === 0 && timerState.isRunning && !hasCompletedRef.current) {
      console.log('🎯 Timer completed! Starting transition...')
      hasCompletedRef.current = true

      const isWorkSession = timerState.mode === 'work'
      console.log('Was work session?', isWorkSession)
      
      // Parar o timer primeiro
      setTimerState((prev) => {
        console.log('⏸️ Stopping timer')
        return {
          ...prev,
          isRunning: false,
        }
      })

      // Tocar som e registrar stats
      if (isWorkSession) {
        recordPomodoroComplete(settings.workDuration)
        soundManager.play('work-end')
        soundManager.showNotification(
          'Sessão de Foco Completa! 🎉',
          `Você focou por ${settings.workDuration} minutos!`
        )
      } else {
        recordBreakComplete(
          timerState.mode === 'break' ? settings.breakDuration : settings.longBreakDuration
        )
        soundManager.play('break-end')
        soundManager.showNotification(
          'Pausa Terminada! 💪',
          'Pronto para focar novamente?'
        )
      }

      // Fazer transição após pequeno delay
      setTimeout(() => {
        console.log('🔄 Starting next session...')
        
        setTimerState((prev) => {
          const newCompletedPomodoros = isWorkSession 
            ? prev.completedPomodoros + 1 
            : prev.completedPomodoros

          let nextMode: 'work' | 'break' | 'longBreak'
          
          if (isWorkSession) {
            if (newCompletedPomodoros % settings.pomodorosUntilLongBreak === 0) {
              nextMode = 'longBreak'
            } else {
              nextMode = 'break'
            }
          } else {
            nextMode = 'work'
          }

          const nextDuration = nextMode === 'work' 
            ? settings.workDuration 
            : nextMode === 'break'
            ? settings.breakDuration
            : settings.longBreakDuration

          const shouldAutoStart = isWorkSession 
            ? settings.autoStartBreaks 
            : settings.autoStartPomodoros

          console.log('Next mode:', nextMode)
          console.log('Next duration:', nextDuration)
          console.log('Auto start?', shouldAutoStart)

          if (shouldAutoStart) {
            setTimeout(() => {
              if (nextMode === 'work') {
                soundManager.play('work-start')
              } else {
                soundManager.play('break-start')
              }
            }, 300)
          }

          hasCompletedRef.current = false

          const newState = {
            ...prev,
            mode: nextMode,
            timeRemaining: nextDuration * 60,
            isRunning: shouldAutoStart,
            completedPomodoros: newCompletedPomodoros,
            currentSession: prev.currentSession + 1,
          }

          console.log('✅ New state:', newState)
          return newState
        })
      }, 1000)
    }
  }, [
    timerState.timeRemaining,
    timerState.isRunning,
    timerState.mode,
    timerState.completedPomodoros,
    settings,
    setTimerState,
    recordPomodoroComplete,
    recordBreakComplete,
  ])

  const start = useCallback(() => {
    hasCompletedRef.current = false
    
    if (!timerState.isRunning && timerState.timeRemaining > 0) {
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
    hasCompletedRef.current = false
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
    hasCompletedRef.current = false
    
    setTimerState((prev) => {
      const isWork = prev.mode === 'work'
      const newCompletedPomodoros = isWork 
        ? prev.completedPomodoros + 1 
        : prev.completedPomodoros
      
      let nextMode: 'work' | 'break' | 'longBreak'
      
      if (isWork) {
        if (newCompletedPomodoros % settings.pomodorosUntilLongBreak === 0) {
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
        completedPomodoros: newCompletedPomodoros,
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
