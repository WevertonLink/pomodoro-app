import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { StatCard } from './StatCard'
import { SimpleBarChart } from './SimpleBarChart'
import { HeatMap } from './HeatMap'
import { useStats } from '../../hooks/useStats'
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Flame,
  Calendar,
  CheckCircle2
} from 'lucide-react'

export function StatsPanel() {
  const { stats, todayStats, last7DaysStats } = useStats()

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const last7DaysData = last7DaysStats.map(day => ({
    label: new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' }),
    value: day.completedPomodoros,
  }))

  const heatMapData = last7DaysStats.map(day => ({
    date: day.date,
    value: day.completedPomodoros,
  }))

  return (
    <div className="space-y-4">
      {/* Cards de resumo */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Hoje"
          value={todayStats.completedPomodoros}
          description="pomodoros completos"
          icon={Target}
          color="text-red-500"
        />
        <StatCard
          title="Foco Hoje"
          value={formatTime(todayStats.focusTime)}
          description="tempo focado"
          icon={Clock}
          color="text-blue-500"
        />
        <StatCard
          title="Sequência"
          value={`${stats.currentStreak} dias`}
          description={`Recorde: ${stats.longestStreak} dias`}
          icon={Flame}
          color="text-orange-500"
        />
        <StatCard
          title="Total"
          value={stats.totalPomodoros}
          description="pomodoros completos"
          icon={TrendingUp}
          color="text-green-500"
        />
      </div>

      {/* Tabs de estatísticas */}
      <Tabs defaultValue="week" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="week">
            <Calendar className="mr-2 h-4 w-4" />
            Semana
          </TabsTrigger>
          <TabsTrigger value="overview">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Geral
          </TabsTrigger>
        </TabsList>

        {/* TAB: SEMANA */}
        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Últimos 7 Dias</CardTitle>
              <CardDescription>
                Pomodoros completos por dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleBarChart 
                data={last7DaysData} 
                color="#ef4444"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mapa de Calor</CardTitle>
              <CardDescription>
                Visualização da última semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HeatMap data={heatMapData} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: GERAL */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Totais</CardTitle>
              <CardDescription>
                Desde o início
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total de Pomodoros</span>
                <span className="text-2xl font-bold">{stats.totalPomodoros}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tempo Total Focado</span>
                <span className="text-2xl font-bold">{formatTime(stats.totalFocusTime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tarefas Completas</span>
                <span className="text-2xl font-bold">{stats.totalTasksCompleted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Maior Sequência</span>
                <span className="text-2xl font-bold">{stats.longestStreak} dias</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sequência Atual</span>
                <span className="text-2xl font-bold text-orange-500">
                  🔥 {stats.currentStreak} dias
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtividade</CardTitle>
              <CardDescription>
                Métricas de desempenho
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Média diária (7 dias)</span>
                <span className="text-lg font-semibold">
                  {(last7DaysStats.reduce((acc, day) => acc + day.completedPomodoros, 0) / 7).toFixed(1)} 🍅
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Melhor dia (7 dias)</span>
                <span className="text-lg font-semibold">
                  {Math.max(...last7DaysStats.map(d => d.completedPomodoros))} 🍅
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
