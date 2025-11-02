import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTimer } from '@/hooks/useTimer'
import { formatTime } from '@/lib/utils'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

function App() {
  const { timerState, toggle, reset, skip } = useTimer()

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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pomodoro Pro</CardTitle>
              <CardDescription>Sessão #{timerState.currentSession}</CardDescription>
            </div>
            <Badge variant={getModeVariant()}>
              {getModeLabel()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            {/* Timer Display */}
            <div className="text-7xl font-bold tabular-nums tracking-tight">
              {formatTime(timerState.timeRemaining)}
            </div>

            {/* Pomodoros completed */}
            <div className="text-sm text-muted-foreground">
              🍅 {timerState.completedPomodoros} pomodoros completos
            </div>

            {/* Controls */}
            <div className="flex gap-2 w-full">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={toggle}
              >
                {timerState.isRunning ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Iniciar
                  </>
                )}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={reset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={skip}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
