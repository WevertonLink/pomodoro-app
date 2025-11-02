import { Task } from '../../types/task'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Check, Trash2, Play, Pause } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  activeTaskId: string | null
  onSelectTask: (id: string) => void
  onCompleteTask: (id: string) => void
  onDeleteTask: (id: string) => void
  categories: { id: string; name: string; color: string; icon: string }[]
}

export function TaskList({ 
  tasks, 
  activeTaskId, 
  onSelectTask, 
  onCompleteTask, 
  onDeleteTask,
  categories 
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-lg">Nenhuma tarefa ainda</p>
        <p className="text-sm">Adicione sua primeira tarefa para começar!</p>
      </div>
    )
  }

  const getCategoryById = (categoryId?: string) => {
    return categories.find(c => c.id === categoryId) || categories[4]
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => {
        const category = getCategoryById(task.category)
        const progress = (task.completedPomodoros / task.estimatedPomodoros) * 100
        const isActive = task.id === activeTaskId

        return (
          <Card 
            key={task.id} 
            className={`p-4 transition-all ${
              isActive ? 'ring-2 ring-primary shadow-lg bg-primary/5' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className="text-2xl flex-shrink-0"
                style={{ filter: `drop-shadow(0 0 8px ${category.color})` }}
              >
                {category.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base truncate">
                    {task.title}
                  </h3>
                  {isActive && (
                    <Badge variant="default" className="text-xs">
                      Ativa
                    </Badge>
                  )}
                </div>
                {task.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {task.description}
                  </p>
                )}
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {task.completedPomodoros} / {task.estimatedPomodoros} 🍅
                    </span>
                    <span className="font-medium">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="mt-2">
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{ 
                      borderColor: category.color,
                      color: category.color 
                    }}
                  >
                    {category.name}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant={isActive ? "default" : "outline"}
                  onClick={() => onSelectTask(isActive ? '' : task.id)}
                  disabled={task.completed}
                  title={isActive ? "Desvincular" : "Vincular ao timer"}
                >
                  {isActive ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCompleteTask(task.id)}
                  disabled={task.completed}
                  title="Marcar como completa"
                >
                  <Check className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteTask(task.id)}
                  title="Deletar tarefa"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
