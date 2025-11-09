import { useAtom } from 'jotai'
import { useCallback } from 'react'
import {
  playerProfileAtom,
  achievementsAtom,
  xpHistoryAtom,
  challengesAtom,
  getTitleForLevel,
  activeChallengesAtom,
  unlockedAchievementsAtom,
} from '../store/gamification-store'
import { statsAtom } from '../store/stats-store'
import type { Challenge } from '../types/gamification'

const calculateXPForLevel = (level: number): number => {
  return level * 100 + (level - 1) * 50
}

export function useGamification() {
  const [profile, setProfile] = useAtom(playerProfileAtom)
  const [achievements, setAchievements] = useAtom(achievementsAtom)
  const [xpHistory, setXPHistory] = useAtom(xpHistoryAtom)
  const [challenges, setChallenges] = useAtom(challengesAtom)
  const [activeChallenges] = useAtom(activeChallengesAtom)
  const [unlockedAchievements] = useAtom(unlockedAchievementsAtom)
  const [stats] = useAtom(statsAtom)

  const addXP = useCallback((amount: number, reason: string) => {
    setProfile((prev) => {
      let newCurrentXP = prev.currentXP + amount
      let newLevel = prev.level
      let newXPToNext = prev.xpToNextLevel
      let leveledUp = false

      while (newCurrentXP >= newXPToNext) {
        newCurrentXP -= newXPToNext
        newLevel++
        newXPToNext = calculateXPForLevel(newLevel)
        leveledUp = true
      }

      const newTitle = getTitleForLevel(newLevel)

      if (leveledUp) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('levelup', { 
            detail: { level: newLevel, title: newTitle } 
          }))
        }, 100)
      }

      return {
        ...prev,
        currentXP: newCurrentXP,
        totalXP: prev.totalXP + amount,
        level: newLevel,
        xpToNextLevel: newXPToNext,
        title: newTitle,
      }
    })

    setXPHistory((prev) => [
      {
        amount,
        reason,
        timestamp: new Date().toISOString(),
      },
      ...prev.slice(0, 49),
    ])
  }, [setProfile, setXPHistory])

  const checkAchievements = useCallback(() => {
    const now = new Date()
    const hour = now.getHours()

    setAchievements((prev) => {
      let newAchievements = [...prev]
      let xpToAdd = 0

      newAchievements = newAchievements.map((ach) => {
        if (ach.unlockedAt) return ach

        let currentProgress = ach.progress

        switch (ach.id) {
          case 'first-pomodoro':
          case 'pomodoro-10':
          case 'pomodoro-50':
          case 'pomodoro-100':
          case 'pomodoro-500':
            currentProgress = stats.totalPomodoros
            break

          case 'streak-3':
          case 'streak-7':
          case 'streak-30':
            currentProgress = stats.currentStreak
            break

          case 'marathon':
            currentProgress = stats.dailyStats.find(
              d => d.date === now.toISOString().split('T')[0]
            )?.completedPomodoros || 0
            break

          case 'night-owl':
            if (hour >= 22 && stats.totalPomodoros > 0) {
              currentProgress = 1
            }
            break

          case 'early-bird':
            if (hour < 6 && stats.totalPomodoros > 0) {
              currentProgress = 1
            }
            break

          case 'task-master':
          case 'task-champion':
            currentProgress = stats.totalTasksCompleted
            break
        }

        if (currentProgress >= ach.maxProgress) {
          xpToAdd += ach.xpReward
          
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('achievement', { 
              detail: ach 
            }))
          }, 100)

          return {
            ...ach,
            progress: ach.maxProgress,
            unlockedAt: new Date().toISOString(),
          }
        }

        return {
          ...ach,
          progress: currentProgress,
        }
      })

      if (xpToAdd > 0) {
        setTimeout(() => {
          addXP(xpToAdd, 'Achievements desbloqueados')
        }, 500)
      }

      return newAchievements
    })
  }, [stats, setAchievements, addXP])

  const generateDailyChallenges = useCallback(() => {
    const today = new Date()
    today.setHours(23, 59, 59, 999)

    const existingDaily = challenges.find(
      c => c.type === 'daily' && 
      new Date(c.expiresAt).toDateString() === today.toDateString()
    )

    if (existingDaily) return

    const dailyChallenges: Challenge[] = [
      {
        id: `daily-pomodoros-${Date.now()}`,
        name: 'Pomodoros Diários',
        description: 'Complete 4 pomodoros hoje',
        icon: '🎯',
        xpReward: 50,
        type: 'daily',
        maxProgress: 4,
        progress: 0,
        completed: false,
        expiresAt: today.toISOString(),
      },
      {
        id: `daily-tasks-${Date.now()}`,
        name: 'Organizador',
        description: 'Complete 3 tarefas hoje',
        icon: '✅',
        xpReward: 40,
        type: 'daily',
        maxProgress: 3,
        progress: 0,
        completed: false,
        expiresAt: today.toISOString(),
      },
    ]

    setChallenges((prev) => [...prev, ...dailyChallenges])
  }, [challenges, setChallenges])

  const updateChallengeProgress = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    const todayStats = stats.dailyStats.find(d => d.date === today)

    if (!todayStats) return

    setChallenges((prev) => 
      prev.map((challenge) => {
        if (challenge.completed) return challenge

        let currentProgress = challenge.progress

        if (challenge.description.includes('pomodoros')) {
          currentProgress = todayStats.completedPomodoros
        } else if (challenge.description.includes('tarefas')) {
          currentProgress = todayStats.tasksCompleted
        }

        const isCompleted = currentProgress >= challenge.maxProgress

        if (isCompleted && !challenge.completed) {
          setTimeout(() => {
            addXP(challenge.xpReward, `Desafio: ${challenge.name}`)
          }, 100)

          return {
            ...challenge,
            progress: challenge.maxProgress,
            completed: true,
            completedAt: new Date().toISOString(),
          }
        }

        return {
          ...challenge,
          progress: currentProgress,
        }
      })
    )
  }, [stats, setChallenges, addXP])

  return {
    profile,
    achievements,
    xpHistory,
    challenges: activeChallenges,
    unlockedAchievements,
    addXP,
    checkAchievements,
    generateDailyChallenges,
    updateChallengeProgress,
  }
}
