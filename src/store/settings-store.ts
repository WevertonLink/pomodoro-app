import { atomWithStorage } from 'jotai/utils'
import type { Settings } from '../types/timer'

const defaultSettings: Settings = {
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  pomodorosUntilLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  soundVolume: 0.7,
  notificationsEnabled: true,
}

export const settingsAtom = atomWithStorage<Settings>(
  'pomodoro-settings',
  defaultSettings
)
