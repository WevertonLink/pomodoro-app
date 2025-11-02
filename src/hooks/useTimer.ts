import { useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { timerStateAtom } from '../store/timer-store'
import { settingsAtom } from '../store/settings-store'
import { soundManager } from '../lib/sounds'

export function useTimer() {
  const [timerState, setTimerState] = useAtom(timerStateAtom)
  const [settings] = useAtom(settingsAtom)

  // Solicitar permissão para notificações na primeira montagem
  useEffect(() => {
    soundManager.requestNotificationPermission()
  }, [])

  // Atualizar volume do som quando settings mudar
  useEffect(() => {
    soundManager.setVolume(settings.soundVolume)
    soundManager.setEnabled(settings.soundEnabled)
  }, [settings.soundVolume, settings.soundEnabled])

  // Countdown logic
  useEffect(() => {
    if (!timerState.isRunning) return

    const interval = setInterval(() => {
      setTimerState((prev) => {
        if (prev.timeRemaining <= 0) {
          // Timer finished - play sound and show notification
          const isWorkSession = prev.mode === 'work'
          
          if (isWorkSession) {
            soundManager.play('work-end')
            soundManager.showNotification(
              'Sessão de Foco Completa! 🎉',
              'Hora de fazer uma pausa!'
            )
          } else {
            soundManager.play('break-end')
            soundManager.showNotification(
              'Pausa Terminada! 💪',
              'Pronto para focar novamente?'
            )
          }

          return {
            ...prev,
            isRunning: false,
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
  }, [timerState.isRunning, setTimerState])

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

  // Calcular progresso (0-100)
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
