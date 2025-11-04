import { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Trophy, Target, Zap } from 'lucide-react'
import { LevelDisplay } from './LevelDisplay'
import { AchievementList } from './AchievementList'
import { ChallengeList } from './ChallengeList'
import { useGamification } from '../../hooks/useGamification'

export function GamificationPanel() {
  const {
    profile,
    achievements,
    challenges,
    unlockedAchievements,
    checkAchievements,
    generateDailyChallenges,
    updateChallengeProgress,
  } = useGamification()

  useEffect(() => {
    // Verificar achievements ao montar
    checkAchievements()
    // Gerar desafios diários
    generateDailyChallenges()
    // Atualizar progresso de desafios
    updateChallengeProgress()
  }, [checkAchievements, generateDailyChallenges, updateChallengeProgress])

  return (
    <div className="space-y-4">
      <LevelDisplay profile={profile} />

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">
            <Trophy className="mr-2 h-4 w-4" />
            Conquistas
          </TabsTrigger>
          <TabsTrigger value="challenges">
            <Target className="mr-2 h-4 w-4" />
            Desafios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <AchievementList 
            achievements={achievements} 
            unlocked={unlockedAchievements}
          />
        </TabsContent>

        <TabsContent value="challenges">
          <ChallengeList challenges={challenges} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
