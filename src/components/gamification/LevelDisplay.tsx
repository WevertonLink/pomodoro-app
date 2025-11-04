import { Card, CardContent } from '../ui/card'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import type { PlayerProfile } from '../../types/gamification'

interface LevelDisplayProps {
  profile: PlayerProfile
}

export function LevelDisplay({ profile }: LevelDisplayProps) {
  const progressPercent = (profile.currentXP / profile.xpToNextLevel) * 100

  return (
    <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Level e Título */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-primary">
                  Nível {profile.level}
                </span>
              </div>
              <Badge variant="secondary" className="mt-1">
                {profile.title}
              </Badge>
            </div>
            <div className="text-6xl">
              {profile.level < 10 ? '🥉' :
               profile.level < 25 ? '🥈' :
               profile.level < 40 ? '🥇' : '👑'}
            </div>
          </div>

          {/* Barra de XP */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">XP</span>
              <span className="font-medium">
                {profile.currentXP} / {profile.xpToNextLevel}
              </span>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <div className="text-xs text-muted-foreground text-right">
              {Math.round(progressPercent)}% para próximo nível
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {profile.totalXP}
              </div>
              <div className="text-xs text-muted-foreground">XP Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {profile.level}
              </div>
              <div className="text-xs text-muted-foreground">Nível Atual</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
