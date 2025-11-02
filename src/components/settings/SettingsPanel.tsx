import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import { 
  Clock, 
  Volume2, 
  Bell, 
  Moon, 
  Sun,
  RotateCcw,
  Palette
} from 'lucide-react'
import { useSettings } from '../../hooks/useSettings'
import { useState } from 'react'

export function SettingsPanel() {
  const { settings, updateSettings } = useSettings()
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  )

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleResetSettings = () => {
    if (confirm('Deseja resetar todas as configurações para os valores padrão?')) {
      updateSettings({
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
        pomodorosUntilLongBreak: 4,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        soundEnabled: true,
        soundVolume: 0.7,
        notificationsEnabled: true,
      })
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="timer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timer">
            <Clock className="mr-2 h-4 w-4" />
            Timer
          </TabsTrigger>
          <TabsTrigger value="audio">
            <Volume2 className="mr-2 h-4 w-4" />
            Áudio
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        {/* TAB: TIMER */}
        <TabsContent value="timer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Durações</CardTitle>
              <CardDescription>
                Configure o tempo de cada sessão (em minutos)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="work-duration">
                  Foco
                  <Badge variant="destructive" className="ml-2">
                    {settings.workDuration}min
                  </Badge>
                </Label>
                <Input
                  id="work-duration"
                  type="number"
                  min={1}
                  max={60}
                  value={settings.workDuration}
                  onChange={(e) => updateSettings({ 
                    workDuration: parseInt(e.target.value) || 25 
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="break-duration">
                  Pausa Curta
                  <Badge variant="default" className="ml-2">
                    {settings.breakDuration}min
                  </Badge>
                </Label>
                <Input
                  id="break-duration"
                  type="number"
                  min={1}
                  max={30}
                  value={settings.breakDuration}
                  onChange={(e) => updateSettings({ 
                    breakDuration: parseInt(e.target.value) || 5 
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="long-break-duration">
                  Pausa Longa
                  <Badge variant="default" className="ml-2">
                    {settings.longBreakDuration}min
                  </Badge>
                </Label>
                <Input
                  id="long-break-duration"
                  type="number"
                  min={1}
                  max={60}
                  value={settings.longBreakDuration}
                  onChange={(e) => updateSettings({ 
                    longBreakDuration: parseInt(e.target.value) || 15 
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="long-break-interval">
                  Pomodoros até Pausa Longa
                  <Badge variant="outline" className="ml-2">
                    {settings.pomodorosUntilLongBreak}
                  </Badge>
                </Label>
                <Input
                  id="long-break-interval"
                  type="number"
                  min={2}
                  max={10}
                  value={settings.pomodorosUntilLongBreak}
                  onChange={(e) => updateSettings({ 
                    pomodorosUntilLongBreak: parseInt(e.target.value) || 4 
                  })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automação</CardTitle>
              <CardDescription>
                Configure o comportamento automático do timer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Iniciar pausas automaticamente</Label>
                  <p className="text-sm text-muted-foreground">
                    Pausas começam assim que o foco termina
                  </p>
                </div>
                <Switch
                  checked={settings.autoStartBreaks}
                  onCheckedChange={(checked) => 
                    updateSettings({ autoStartBreaks: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Iniciar foco automaticamente</Label>
                  <p className="text-sm text-muted-foreground">
                    Sessões de foco começam após a pausa
                  </p>
                </div>
                <Switch
                  checked={settings.autoStartPomodoros}
                  onCheckedChange={(checked) => 
                    updateSettings({ autoStartPomodoros: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: ÁUDIO */}
        <TabsContent value="audio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sons</CardTitle>
              <CardDescription>
                Configure alertas sonoros
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar sons</Label>
                  <p className="text-sm text-muted-foreground">
                    Tocar sons quando sessões completarem
                  </p>
                </div>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => 
                    updateSettings({ soundEnabled: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Volume</Label>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(settings.soundVolume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.soundVolume * 100}
                  onChange={(e) => updateSettings({ 
                    soundVolume: parseInt(e.target.value) / 100 
                  })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  disabled={!settings.soundEnabled}
                />
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                disabled={!settings.soundEnabled}
                onClick={() => {
                  const audio = new Audio()
                  const ctx = new AudioContext()
                  const osc = ctx.createOscillator()
                  const gain = ctx.createGain()
                  osc.connect(gain)
                  gain.connect(ctx.destination)
                  osc.frequency.value = 600
                  gain.gain.setValueAtTime(settings.soundVolume * 0.3, ctx.currentTime)
                  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
                  osc.start(ctx.currentTime)
                  osc.stop(ctx.currentTime + 0.5)
                }}
              >
                <Volume2 className="mr-2 h-4 w-4" />
                Testar Som
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Configure alertas do navegador
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar notificações</Label>
                  <p className="text-sm text-muted-foreground">
                    Mostrar notificações do navegador
                  </p>
                </div>
                <Switch
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) => {
                    updateSettings({ notificationsEnabled: checked })
                    if (checked && Notification.permission === 'default') {
                      Notification.requestPermission()
                    }
                  }}
                />
              </div>

              {Notification.permission === 'denied' && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                  ⚠️ Notificações bloqueadas. Ative nas configurações do navegador.
                </div>
              )}

              {settings.notificationsEnabled && Notification.permission === 'granted' && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    new Notification('Pomodoro Pro', {
                      body: 'Notificações funcionando! 🎉',
                      icon: '/favicon.ico'
                    })
                  }}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Testar Notificação
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: APARÊNCIA */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema</CardTitle>
              <CardDescription>
                Personalize a aparência do app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Escuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Tema escuro para seus olhos
                  </p>
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <div className="flex-1 p-4 rounded-lg border-2 border-primary bg-background text-foreground">
                  {isDark ? (
                    <Moon className="h-8 w-8 mx-auto" />
                  ) : (
                    <Sun className="h-8 w-8 mx-auto" />
                  )}
                  <p className="text-center text-sm mt-2">
                    {isDark ? 'Escuro' : 'Claro'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados</CardTitle>
              <CardDescription>
                Gerenciar dados do aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleResetSettings}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Resetar Configurações
              </Button>

              <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
                ℹ️ Todas as configurações são salvas localmente no seu navegador
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
