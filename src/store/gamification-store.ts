import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import type { PlayerProfile, Achievement, Challenge, XPGain } from '../types/gamification'

// Fórmula de XP: level * 100 + (level - 1) * 50
const calculateXPForLevel = (level: number): number => {
  return level * 100 + (level - 1) * 50
}

const defaultProfile: PlayerProfile = {
  level: 1,
  currentXP: 0,
  xpToNextLevel: calculateXPForLevel(1),
  totalXP: 0,
  title: 'Iniciante',
  joinedAt: new Date().toISOString(),
}

export const playerProfileAtom = atomWithStorage<PlayerProfile>(
  'pomodoro-player-profile',
  defaultProfile
)

// Achievements disponíveis
const allAchievements: Omit<Achievement, 'progress' | 'unlockedAt'>[] = [
  {
    id: 'first-pomodoro',
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro pomodoro',
    icon: '🥉',
    xpReward: 10,
    maxProgress: 1,
    category: 'pomodoro',
  },
  {
    id: 'pomodoro-10',
    name: 'Focado',
    description: 'Complete 10 pomodoros',
    icon: '🎯',
    xpReward: 50,
    maxProgress: 10,
    category: 'pomodoro',
  },
  {
    id: 'pomodoro-50',
    name: 'Determinado',
    description: 'Complete 50 pomodoros',
    icon: '💪',
    xpReward: 150,
    maxProgress: 50,
    category: 'pomodoro',
  },
  {
    id: 'pomodoro-100',
    name: 'Centurião',
    description: 'Complete 100 pomodoros',
    icon: '💯',
    xpReward: 300,
    maxProgress: 100,
    category: 'pomodoro',
  },
  {
    id: 'pomodoro-500',
    name: 'Lendário',
    description: 'Complete 500 pomodoros',
    icon: '👑',
    xpReward: 1000,
    maxProgress: 500,
    category: 'pomodoro',
  },
  {
    id: 'streak-3',
    name: 'Consistente',
    description: 'Mantenha streak de 3 dias',
    icon: '🔥',
    xpReward: 25,
    maxProgress: 3,
    category: 'streak',
  },
  {
    id: 'streak-7',
    name: 'Dedicado',
    description: 'Mantenha streak de 7 dias',
    icon: '⚡',
    xpReward: 100,
    maxProgress: 7,
    category: 'streak',
  },
  {
    id: 'streak-30',
    name: 'Inabalável',
    description: 'Mantenha streak de 30 dias',
    icon: '🏆',
    xpReward: 500,
    maxProgress: 30,
    category: 'streak',
  },
  {
    id: 'marathon',
    name: 'Maratonista',
    description: 'Complete 10 pomodoros em um dia',
    icon: '🏃',
    xpReward: 200,
    maxProgress: 10,
    category: 'pomodoro',
  },
  {
    id: 'perfect-5',
    name: 'Perfeccionista',
    description: 'Complete 5 sessões sem pular',
    icon: '✨',
    xpReward: 75,
    maxProgress: 5,
    category: 'pomodoro',
  },
  {
    id: 'night-owl',
    name: 'Coruja',
    description: 'Complete um pomodoro após 22h',
    icon: '🦉',
    xpReward: 50,
    maxProgress: 1,
    category: 'special',
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Complete um pomodoro antes das 6h',
    icon: '🌅',
    xpReward: 50,
    maxProgress: 1,
    category: 'special',
  },
  {
    id: 'task-master',
    name: 'Organizador',
    description: 'Complete 10 tarefas',
    icon: '📋',
    xpReward: 100,
    maxProgress: 10,
    category: 'task',
  },
  {
    id: 'task-champion',
    name: 'Campeão de Tarefas',
    description: 'Complete 50 tarefas',
    icon: '🏅',
    xpReward: 300,
    maxProgress: 50,
    category: 'task',
  },
]

export const achievementsAtom = atomWithStorage<Achievement[]>(
  'pomodoro-achievements',
  allAchievements.map(ach => ({ ...ach, progress: 0 }))
)

export const xpHistoryAtom = atomWithStorage<XPGain[]>(
  'pomodoro-xp-history',
  []
)

export const challengesAtom = atomWithStorage<Challenge[]>(
  'pomodoro-challenges',
  []
)

// Derived atoms
export const unlockedAchievementsAtom = atom((get) => {
  const achievements = get(achievementsAtom)
  return achievements.filter(a => a.unlockedAt)
})

export const pendingAchievementsAtom = atom((get) => {
  const achievements = get(achievementsAtom)
  return achievements.filter(a => !a.unlockedAt)
})

export const activeChallengesAtom = atom((get) => {
  const challenges = get(challengesAtom)
  const now = new Date()
  return challenges.filter(c => 
    !c.completed && new Date(c.expiresAt) > now
  )
})

// Títulos por nível
export const LEVEL_TITLES: Record<number, string> = {
  1: 'Iniciante',
  5: 'Aprendiz',
  10: 'Estudante',
  15: 'Praticante',
  20: 'Profissional',
  25: 'Especialista',
  30: 'Mestre',
  35: 'Grão-Mestre',
  40: 'Lenda',
  45: 'Mito',
  50: 'Deus do Pomodoro',
}

export const getTitleForLevel = (level: number): string => {
  const levels = Object.keys(LEVEL_TITLES).map(Number).sort((a, b) => b - a)
  for (const lvl of levels) {
    if (level >= lvl) {
      return LEVEL_TITLES[lvl]
    }
  }
  return LEVEL_TITLES[1]
}
