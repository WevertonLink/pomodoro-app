import { atom } from 'jotai'
import type { TimerState } from '../types/timer'

export const timerStateAtom = atom<TimerState>({
  mode: 'work',
  timeRemaining: 25 * 60,
  isRunning: false,
  completedPomodoros: 0,
  currentSession: 1,
})

export const isRunningAtom = atom(
  (get) => get(timerStateAtom).isRunning
)
