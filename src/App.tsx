import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { useTimer } from './hooks/useTimer'
import { useTasks } from './hooks/useTasks'
import { formatTime } from './lib/utils'
import { Play, Pause, RotateCcw, SkipForward, Timer as TimerIcon, ListTodo } from 'lucide-react'
import { CircularProgress } from './components/timer/CircularProgress'
import { TaskList } from './components/tasks/TaskList'
import { AddTaskDialog } from './components/tasks/AddTaskDialog'
import { useEffect } from 'react'

function App() {
  const { timerState, toggle, reset, skip, progress } = useTimer()
  const { 
    tasks, 
    activeTaskId, 
    categories, 
    addTask, 
    completeTask, 
    deleteTask, 
    setActiveTask,
    incrementTaskPomodoro 
  } = useTasks()

  // Incrementar pomodoro da task ativa quando completar sessão de trabalho
  useEffect(() => {
    if (timerState.timeRemaining === 0 && timerState.mode === 'work' && activeTaskId) {
      incrementTaskPomodoro(activeTaskId)
    }
  }, [timerState.timeRemaining, timerState.mode, activeTaskId, incrementTaskPomodoro])

  const getModeLabel = () => {
    switch (timerState.mode) {
      case 'work':
        return 'Foco'
      case 'break':
        return 'Pausa'
      case 'longBreak':
        return 'Pausa Longa'
    }
  }

  const getModeVariant = () => {
    return timerState.mode === 'work' ? 'destructive' : 'default'
  }

  const getModeColor = () => {
    return timerState.mode === 'work' ? '#ef4444' : '#10b981'
  }

  const activeTask = tasks.find(t => t.id === activeTaskId)
  const pendingTasks = tasks.filter(t => !t.completed)

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold">Pomodoro Pro</h1>
          <p className="text-muted-foreground">Gerencie seu tempo com eficiência</p>
        </div>

        {/* Tabs: Timer e Tarefas */}
        <Tabs defaultValue="timer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timer">
              <TimerIcon className="mr-2 h-4 w-4" />
              Timer
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <ListTodo className="mr-2 h-4 w-4" />
              Tarefas ({pendingTasks.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB: TIMER */}
          <TabsContent value="timer">
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Sessão #{timerState.currentSession}</CardTitle>
                    {activeTask && (
                      <CardDescription className="text-base mt-1">
                        🎯 {activeTask.title}
                      </CardDescription>
                    )}
                  </div>
                  <Badge variant={getModeVariant()} className="text-sm px-3 py-1">
                    {getModeLabel()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center justify-center py-4">
                  <div className="relative">
                    <CircularProgress 
                      progress={progress} 
                      size={320}
                      strokeWidth={12}
                      color={getModeColor()}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-8xl font-bold tabular-nums tracking-tight">
                        {formatTime(timerState.timeRemaining)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {Math.round(progress)}% completo
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-lg text-muted-foreground">
                    🍅 <span className="font-semibold text-foreground">{timerState.completedPomodoros}</span> pomodoros completos hoje
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    size="lg" 
                    className="flex-1 h-14 text-lg"
                    onClick={toggle}
                  >
                    {timerState.isRunning ? (
                      <>
                        <Pause className="mr-2 h-5 w-5" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Iniciar
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={reset}
                    disabled={timerState.isRunning}
                    className="h-14 px-6"
                    title="Resetar"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={skip}
                    className="h-14 px-6"
                    title="Pular"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: TAREFAS */}
          <TabsContent value="tasks" className="space-y-4">
            <AddTaskDialog onAddTask={addTask} categories={categories} />
            
            <Card>
              <CardHeader>
                <CardTitle>Minhas Tarefas</CardTitle>
                <CardDescription>
                  {pendingTasks.length} pendente{pendingTasks.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={pendingTasks}
                  activeTaskId={activeTaskId}
                  onSelectTask={setActiveTask}
                  onCompleteTask={completeTask}
                  onDeleteTask={deleteTask}
                  categories={categories}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
