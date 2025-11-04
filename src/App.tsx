import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { useTimer } from './hooks/useTimer'
import { useTasks } from './hooks/useTasks'
import { useGamification } from './hooks/useGamification'
import { formatTime } from './lib/utils'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Timer as TimerIcon, 
  ListTodo, 
  Settings, 
  BarChart3,
  Gamepad2,
  X 
} from 'lucide-react'
import { CircularProgress } from './components/timer/CircularProgress'
import { TaskList } from './components/tasks/TaskList'
import { AddTaskDialog } from './components/tasks/AddTaskDialog'
import { SettingsPanel } from './components/settings/SettingsPanel'
import { StatsPanel } from './components/stats/StatsPanel'
import { InstallPrompt } from './components/pwa/InstallPrompt'
import { OfflineIndicator } from './components/pwa/OfflineIndicator'
import { GamificationPanel } from './components/gamification/GamificationPanel'
import { LevelUpAnimation } from './components/gamification/LevelUpAnimation'
import { AchievementToast } from './components/gamification/AchievementToast'
import type { Achievement } from './types/gamification'

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
  
  const {
    addXP,
    checkAchievements,
    updateChallengeProgress,
  } = useGamification()

  // Animações
  const [levelUpData, setLevelUpData] = useState<{ level: number; title: string } | null>(null)
  const [achievementData, setAchievementData] = useState<Achievement | null>(null)

  // Listeners para eventos de gamificação
  useEffect(() => {
    const handleLevelUp = (e: CustomEvent) => {
      setLevelUpData(e.detail)
    }

    const handleAchievement = (e: CustomEvent) => {
      setAchievementData(e.detail)
    }

    window.addEventListener('levelup', handleLevelUp as EventListener)
    window.addEventListener('achievement', handleAchievement as EventListener)

    return () => {
      window.removeEventListener('levelup', handleLevelUp as EventListener)
      window.removeEventListener('achievement', handleAchievement as EventListener)
    }
  }, [])

  // Verificar achievements quando stats mudam
  useEffect(() => {
    checkAchievements()
    updateChallengeProgress()
  }, [timerState.completedPomodoros, checkAchievements, updateChallengeProgress])

  // Dar XP quando completar pomodoro
  useEffect(() => {
    if (timerState.timeRemaining === 0 && timerState.mode === 'work' && activeTaskId) {
      incrementTaskPomodoro(activeTaskId)
      
      // XP por completar pomodoro
      setTimeout(() => {
        addXP(10, 'Pomodoro completo')
        
        // XP bônus se tiver tarefa vinculada
        addXP(5, 'Tarefa vinculada')
      }, 1000)
    }
  }, [timerState.timeRemaining, timerState.mode, activeTaskId, incrementTaskPomodoro, addXP])

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

  const handleUnlinkTask = () => {
    setActiveTask(null)
  }

  return (
    <>
      {/* PWA Components */}
      <OfflineIndicator />
      <InstallPrompt />

      {/* Gamification Animations */}
      {levelUpData && (
        <LevelUpAnimation
          show={!!levelUpData}
          level={levelUpData.level}
          title={levelUpData.title}
          onClose={() => setLevelUpData(null)}
        />
      )}
      
      <AchievementToast
        achievement={achievementData}
        onClose={() => setAchievementData(null)}
      />

      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold">Pomodoro Pro</h1>
            <p className="text-muted-foreground">Gerencie seu tempo com eficiência</p>
          </div>

          <Tabs defaultValue="timer" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="timer">
                <TimerIcon className="mr-2 h-4 w-4" />
                Timer
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <ListTodo className="mr-2 h-4 w-4" />
                Tarefas ({pendingTasks.length})
              </TabsTrigger>
              <TabsTrigger value="gamification">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Game
              </TabsTrigger>
              <TabsTrigger value="stats">
                <BarChart3 className="mr-2 h-4 w-4" />
                Stats
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Config
              </TabsTrigger>
            </TabsList>

            {/* TAB: TIMER */}
            <TabsContent value="timer">
              <Card className="w-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl">Sessão #{timerState.currentSession}</CardTitle>
                      {activeTask ? (
                        <div className="flex items-center gap-2 mt-2">
                          <CardDescription className="text-base">
                            🎯 {activeTask.title}
                          </CardDescription>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={handleUnlinkTask}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <CardDescription className="text-base mt-1">
                          Nenhuma tarefa vinculada
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

                  <div className="space-y-2">
                    <div className="text-center text-lg text-muted-foreground">
                      🍅 <span className="font-semibold text-foreground">{timerState.completedPomodoros}</span> pomodoros completos hoje
                    </div>
                    
                    {activeTask && (
                      <div className="text-center text-sm text-muted-foreground">
                        {activeTask.completedPomodoros} / {activeTask.estimatedPomodoros} pomodoros nesta tarefa
                      </div>
                    )}
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
                    {activeTask && (
                      <span className="ml-2 text-primary">
                        • {activeTask.title} ativa
                      </span>
                    )}
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

            {/* TAB: GAMIFICAÇÃO */}
            <TabsContent value="gamification">
              <GamificationPanel />
            </TabsContent>

            {/* TAB: ESTATÍSTICAS */}
            <TabsContent value="stats">
              <StatsPanel />
            </TabsContent>

            {/* TAB: CONFIGURAÇÕES */}
            <TabsContent value="settings">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default App
