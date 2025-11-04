export interface PlayerProfile {
  level: number
  currentXP: number
  xpToNextLevel: number
  totalXP: number
  title: string
  joinedAt: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xpReward: number
  unlockedAt?: string
  progress: number
  maxProgress: number
  category: 'pomodoro' | 'streak' | 'task' | 'special'
}

export interface Challenge {
  id: string
  name: string
  description: string
  icon: string
  xpReward: number
  type: 'daily' | 'weekly'
  progress: number
  maxProgress: number
  expiresAt: string
  completed: boolean
  completedAt?: string
}

export interface XPGain {
  amount: number
  reason: string
  timestamp: string
}

export interface LevelUpReward {
  level: number
  title?: string
  achievement?: string
  xpBoost?: number
}
