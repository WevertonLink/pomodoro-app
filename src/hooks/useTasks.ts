import { useAtom } from 'jotai'
import { tasksAtom, activeTaskIdAtom, categoriesAtom } from '../store/tasks-store'
import { useStats } from './useStats'
import type { Task } from '../types/task'

export function useTasks() {
  const [tasks, setTasks] = useAtom(tasksAtom)
  const [activeTaskId, setActiveTaskId] = useAtom(activeTaskIdAtom)
  const [categories] = useAtom(categoriesAtom)
  const { recordTaskComplete } = useStats()

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completedPomodoros' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completedPomodoros: 0,
      completed: false,
    }
    setTasks([...tasks, newTask])
    return newTask
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
    if (activeTaskId === id) {
      setActiveTaskId(null)
    }
  }

  const completeTask = (id: string) => {
    updateTask(id, { 
      completed: true, 
      completedAt: new Date().toISOString() 
    })
    // Registrar nas estatísticas
    recordTaskComplete()
  }

  const incrementTaskPomodoro = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      updateTask(id, { 
        completedPomodoros: task.completedPomodoros + 1 
      })
    }
  }

  const setActiveTask = (id: string | null) => {
    setActiveTaskId(id)
  }

  return {
    tasks,
    activeTaskId,
    categories,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    incrementTaskPomodoro,
    setActiveTask,
  }
}
