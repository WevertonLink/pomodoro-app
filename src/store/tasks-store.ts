import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import type { Task, TaskCategory } from '../types/task'

// Categorias padrão
export const defaultCategories: TaskCategory[] = [
  { id: 'work', name: 'Trabalho', color: '#3b82f6', icon: '💼' },
  { id: 'study', name: 'Estudo', color: '#8b5cf6', icon: '📚' },
  { id: 'personal', name: 'Pessoal', color: '#10b981', icon: '🏠' },
  { id: 'health', name: 'Saúde', color: '#ef4444', icon: '💪' },
  { id: 'other', name: 'Outro', color: '#6b7280', icon: '📌' },
]

export const tasksAtom = atomWithStorage<Task[]>('pomodoro-tasks', [])

export const categoriesAtom = atomWithStorage<TaskCategory[]>(
  'pomodoro-categories',
  defaultCategories
)

// Atom para task ativa (vinculada ao timer)
export const activeTaskIdAtom = atomWithStorage<string | null>(
  'pomodoro-active-task',
  null
)

// Derived atoms
export const activeTaskAtom = atom((get) => {
  const tasks = get(tasksAtom)
  const activeId = get(activeTaskIdAtom)
  return tasks.find(t => t.id === activeId) || null
})

export const pendingTasksAtom = atom((get) => {
  const tasks = get(tasksAtom)
  return tasks.filter(t => !t.completed)
})

export const completedTasksAtom = atom((get) => {
  const tasks = get(tasksAtom)
  return tasks.filter(t => t.completed)
})

export const todayTasksAtom = atom((get) => {
  const tasks = get(tasksAtom)
  const today = new Date().toDateString()
  return tasks.filter(t => new Date(t.createdAt).toDateString() === today)
})
