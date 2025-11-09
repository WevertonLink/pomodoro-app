import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import type { Achievement } from '../../types/gamification'
import { Lock, CheckCircle2 } from 'lucide-react'

interface AchievementListProps {
  achievements: Achievement[]
  unlocked: Achievement[]
}

export function AchievementList({ achievements, unlocked }: AchievementListProps) {
  const categories = {
    pomodoro: achievements.filter(a => a.category === 'pomodoro'),
    streak: achievements.filter(a => a.category === 'streak'),
    task: achievements.filter(a => a.category === 'task'),
    special: achievements.filter(a => a.category === 'special'),
  }

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const isUnlocked = !!achievement.unlockedAt
    const progress = (achievement.progress / achievement.maxProgress) * 100

    return (
      <Card className={isUnlocked ? 'border-primary' : 'opacity-60'}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`text-3xl ${!isUnlocked && 'grayscale'}`}>
              {achievement.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold truncate">
                  {achievement.name}
                </h4>
                {isUnlocked && (
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                )}
                {!isUnlocked && (
                  <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mt-1">
                {achievement.description}
              </p>

              {!isUnlocked && (
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">
                      {achievement.progress} / {achievement.maxProgress}
                    </span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  +{achievement.xpReward} XP
                </Badge>
                {isUnlocked && achievement.unlockedAt && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="pomodoro">🍅</TabsTrigger>
        <TabsTrigger value="streak">🔥</TabsTrigger>
        <TabsTrigger value="task">✅</TabsTrigger>
        <TabsTrigger value="special">⭐</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Progresso Geral</CardTitle>
            <CardDescription>
              {unlocked.length} de {achievements.length} conquistas desbloqueadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(unlocked.length / achievements.length) * 100} 
              className="h-3"
            />
          </CardContent>
        </Card>

        <div className="space-y-3">
          {achievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </TabsContent>

      {Object.entries(categories).map(([key, items]) => (
        <TabsContent key={key} value={key} className="space-y-3">
          {items.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  )
}
