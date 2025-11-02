export type TimerMode = 'work' | 'break' | 'longBreak'

export interface TimerState {
  mode: TimerMode
  timeRemaining: number
  isRunning: boolean
  completedPomodoros: number
  currentSession: number
}

export interface Settings {
  workDuration: number
  breakDuration: number
  longBreakDuration: number
  pomodorosUntilLongBreak: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  soundEnabled: boolean
  soundVolume: number
  notificationsEnabled: boolean
}

export interface SessionStats {
  date: string
  completed: number
  focusTime: number
  breakTime: number
}

export interface Stats {
  today: SessionStats
  weekly: SessionStats[]
  allTime: {
    totalPomodoros: number
    totalFocusTime: number
    currentStreak: number
    longestStreak: number
  }
}
