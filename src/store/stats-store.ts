import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'

export interface DailyStats {
  date: string // YYYY-MM-DD
  completedPomodoros: number
  focusTime: number // em minutos
  breakTime: number
  tasksCompleted: number
  sessionsCompleted: number
}

export interface WeeklyStats {
  weekStart: string // YYYY-MM-DD
  totalPomodoros: number
  totalFocusTime: number
  averageDailyPomodoros: number
  mostProductiveDay: string
}

export interface StatsData {
  dailyStats: DailyStats[]
  totalPomodoros: number
  totalFocusTime: number // em minutos
  currentStreak: number // dias consecutivos
  longestStreak: number
  totalTasksCompleted: number
  averageSessionsPerDay: number
  lastUpdated: string
}

const defaultStats: StatsData = {
  dailyStats: [],
  totalPomodoros: 0,
  totalFocusTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalTasksCompleted: 0,
  averageSessionsPerDay: 0,
  lastUpdated: new Date().toISOString(),
}

export const statsAtom = atomWithStorage<StatsData>('pomodoro-stats', defaultStats)

// Derived atoms
export const todayStatsAtom = atom((get) => {
  const stats = get(statsAtom)
  const today = new Date().toISOString().split('T')[0]
  return stats.dailyStats.find(s => s.date === today) || {
    date: today,
    completedPomodoros: 0,
    focusTime: 0,
    breakTime: 0,
    tasksCompleted: 0,
    sessionsCompleted: 0,
  }
})

export const last7DaysStatsAtom = atom((get) => {
  const stats = get(statsAtom)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  return last7Days.map(date => 
    stats.dailyStats.find(s => s.date === date) || {
      date,
      completedPomodoros: 0,
      focusTime: 0,
      breakTime: 0,
      tasksCompleted: 0,
      sessionsCompleted: 0,
    }
  )
})

export const last30DaysStatsAtom = atom((get) => {
  const stats = get(statsAtom)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  return last30Days.map(date => 
    stats.dailyStats.find(s => s.date === date) || {
      date,
      completedPomodoros: 0,
      focusTime: 0,
      breakTime: 0,
      tasksCompleted: 0,
      sessionsCompleted: 0,
    }
  )
})
