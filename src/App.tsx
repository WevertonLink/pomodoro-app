import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { useTimer } from './hooks/useTimer'
import { formatTime } from './lib/utils'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import { CircularProgress } from './components/timer/CircularProgress'

function App() {
  const { timerState, toggle, reset, skip, progress } = useTimer()

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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Pomodoro Pro</CardTitle>
              <CardDescription className="text-base">Sessão #{timerState.currentSession}</CardDescription>
            </div>
            <Badge variant={getModeVariant()} className="text-sm px-3 py-1">
              {getModeLabel()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Circular Progress com Timer DENTRO */}
          <div className="flex items-center justify-center py-4">
            <div className="relative">
              <CircularProgress 
                progress={progress} 
                size={320}
                strokeWidth={12}
                color={getModeColor()}
              />
              {/* Timer centralizado DENTRO do círculo */}
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

          {/* Stats */}
          <div className="text-center">
            <div className="text-lg text-muted-foreground">
              🍅 <span className="font-semibold text-foreground">{timerState.completedPomodoros}</span> pomodoros completos hoje
            </div>
          </div>

          {/* Controls */}
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
    </div>
  )
}

export default App
