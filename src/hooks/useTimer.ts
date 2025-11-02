import { useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { timerStateAtom } from '@/store/timer-store'
import { settingsAtom } from '@/store/settings-store'

export function useTimer() {
  const [timerState, setTimerState] = useAtom(timerStateAtom)
  const [settings] = useAtom(settingsAtom)

  // Countdown logic
  useEffect(() => {
    if (!timerState.isRunning) return

    const interval = setInterval(() => {
      setTimerState((prev) => {
        if (prev.timeRemaining <= 0) {
          // Timer finished
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

  // Start/Resume timer
  const start = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: true,
    }))
  }, [setTimerState])

  // Pause timer
  const pause = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
    }))
  }, [setTimerState])

  // Reset timer to current mode duration
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

  // Skip to next session
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
      }
    })
  }, [setTimerState, settings])

  // Toggle start/pause
  const toggle = useCallback(() => {
    if (timerState.isRunning) {
      pause()
    } else {
      start()
    }
  }, [timerState.isRunning, start, pause])

  return {
    timerState,
    start,
    pause,
    reset,
    skip,
    toggle,
  }
}
