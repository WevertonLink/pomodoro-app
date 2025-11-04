import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import type { Challenge } from '../../types/gamification'
import { Calendar, Clock } from 'lucide-react'

interface ChallengeListProps {
  challenges: Challenge[]
}

export function ChallengeList({ challenges }: ChallengeListProps) {
  if (challenges.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>Nenhum desafio ativo no momento</p>
          <p className="text-sm mt-2">Novos desafios aparecem diariamente!</p>
        </CardContent>
      </Card>
    )
  }

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expires = new Date(expiresAt)
    const diff = expires.getTime() - now.getTime()
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className="space-y-3">
      {challenges.map((challenge) => {
        const progress = (challenge.progress / challenge.maxProgress) * 100
        const isDaily = challenge.type === 'daily'

        return (
          <Card 
            key={challenge.id}
            className={challenge.completed ? 'border-primary bg-primary/5' : ''}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div>
                    <CardTitle className="text-base">{challenge.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {challenge.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={isDaily ? 'default' : 'secondary'} className="text-xs">
                  {isDaily ? (
                    <>
                      <Calendar className="h-3 w-3 mr-1" />
                      Diário
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      Semanal
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progresso
                  </span>
                  <span className="font-medium">
                    {challenge.progress} / {challenge.maxProgress}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Rewards & Time */}
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline">
                  +{challenge.xpReward} XP
                </Badge>
                {!challenge.completed && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {getTimeRemaining(challenge.expiresAt)} restantes
                  </div>
                )}
                {challenge.completed && (
                  <Badge variant="default" className="text-xs">
                    ✓ Completo
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
