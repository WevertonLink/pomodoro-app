import { useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { timerStateAtom } from '../store/timer-store'
import { settingsAtom } from '../store/settings-store'
import { soundManager } from '../lib/sounds'
import { useStats } from './useStats'

export function useTimer() {
  const [timerState, setTimerState] = useAtom(timerStateAtom)
  const [settings] = useAtom(settingsAtom)
  const { recordPomodoroComplete, recordBreakComplete } = useStats()

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
        if (prev.timeRemaining <= 0) {
          const isWorkSession = prev.mode === 'work'
          
          // Registrar estatísticas quando completar sessão
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

          return {
            ...prev,
            isRunning: shouldAutoStart,
            timeRemaining: 0,
          }
        }

        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
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
    setTimerState((prev) => {
      const nextMode = prev.mode === 'work' ? 'break' : 'work'
      const duration = nextMode === 'work' 
        ? settings.workDuration 
        : settings.breakDuration

      return {
        ...prev,
        mode: nextMode,
        timeRemaining: duration * 60,
        isRunning: false,
        completedPomodoros: prev.mode === 'work' 
          ? prev.completedPomodoros + 1 
          : prev.completedPomodoros,
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
