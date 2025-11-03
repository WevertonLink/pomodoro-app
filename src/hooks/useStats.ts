import { useAtom } from 'jotai'
import { statsAtom, todayStatsAtom, last7DaysStatsAtom } from '../store/stats-store'
import { useCallback } from 'react'

export function useStats() {
  const [stats, setStats] = useAtom(statsAtom)
  const [todayStats] = useAtom(todayStatsAtom)
  const [last7DaysStats] = useAtom(last7DaysStatsAtom)

  const recordPomodoroComplete = useCallback((focusMinutes: number) => {
    const today = new Date().toISOString().split('T')[0]
    
    setStats((prev) => {
      const dailyStats = [...prev.dailyStats]
      const todayIndex = dailyStats.findIndex(s => s.date === today)
      
      if (todayIndex >= 0) {
        dailyStats[todayIndex] = {
          ...dailyStats[todayIndex],
          completedPomodoros: dailyStats[todayIndex].completedPomodoros + 1,
          focusTime: dailyStats[todayIndex].focusTime + focusMinutes,
          sessionsCompleted: dailyStats[todayIndex].sessionsCompleted + 1,
        }
      } else {
        dailyStats.push({
          date: today,
          completedPomodoros: 1,
          focusTime: focusMinutes,
          breakTime: 0,
          tasksCompleted: 0,
          sessionsCompleted: 1,
        })
      }

      const sortedDates = dailyStats
        .map(s => s.date)
        .sort()
        .reverse()
      
      let currentStreak = 0
      let longestStreak = prev.longestStreak
      
      for (let i = 0; i < sortedDates.length; i++) {
        const expectedDate = new Date()
        expectedDate.setDate(expectedDate.getDate() - i)
        const expected = expectedDate.toISOString().split('T')[0]
        
        if (sortedDates[i] === expected) {
          currentStreak++
        } else {
          break
        }
      }
      
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak
      }

      return {
        ...prev,
        dailyStats,
        totalPomodoros: prev.totalPomodoros + 1,
        totalFocusTime: prev.totalFocusTime + focusMinutes,
        currentStreak,
        longestStreak,
        lastUpdated: new Date().toISOString(),
      }
    })
  }, [setStats])

  const recordBreakComplete = useCallback((breakMinutes: number) => {
    const today = new Date().toISOString().split('T')[0]
    
    setStats((prev) => {
      const dailyStats = [...prev.dailyStats]
      const todayIndex = dailyStats.findIndex(s => s.date === today)
      
      if (todayIndex >= 0) {
        dailyStats[todayIndex] = {
          ...dailyStats[todayIndex],
          breakTime: dailyStats[todayIndex].breakTime + breakMinutes,
        }
      }

      return {
        ...prev,
        dailyStats,
        lastUpdated: new Date().toISOString(),
      }
    })
  }, [setStats])

  const recordTaskComplete = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    
    setStats((prev) => {
      const dailyStats = [...prev.dailyStats]
      const todayIndex = dailyStats.findIndex(s => s.date === today)
      
      if (todayIndex >= 0) {
        dailyStats[todayIndex] = {
          ...dailyStats[todayIndex],
          tasksCompleted: dailyStats[todayIndex].tasksCompleted + 1,
        }
      } else {
        dailyStats.push({
          date: today,
          completedPomodoros: 0,
          focusTime: 0,
          breakTime: 0,
          tasksCompleted: 1,
          sessionsCompleted: 0,
        })
      }

      return {
        ...prev,
        dailyStats,
        totalTasksCompleted: prev.totalTasksCompleted + 1,
        lastUpdated: new Date().toISOString(),
      }
    })
  }, [setStats])

  return {
    stats,
    todayStats,
    last7DaysStats,
    recordPomodoroComplete,
    recordBreakComplete,
    recordTaskComplete,
  }
}
