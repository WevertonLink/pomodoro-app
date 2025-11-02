export interface Task {
  id: string
  title: string
  description?: string
  category?: string
  estimatedPomodoros: number
  completedPomodoros: number
  completed: boolean
  createdAt: string
  completedAt?: string
}

export interface TaskCategory {
  id: string
  name: string
  color: string
  icon: string
}
