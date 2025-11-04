import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import type { Achievement } from '../../types/gamification'

interface AchievementToastProps {
  achievement: Achievement | null
  onClose: () => void
}

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setVisible(true)

      // Auto-close após 4 segundos
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 500)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed top-20 right-4 z-50"
        >
          <Card className="w-80 border-2 border-primary shadow-xl bg-gradient-to-br from-primary/20 to-accent/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl"
                >
                  {achievement.icon}
                </motion.div>
                
                <div className="flex-1">
                  <div className="text-xs font-medium text-primary mb-1">
                    🏆 Achievement Desbloqueado!
                  </div>
                  <h4 className="font-bold text-lg">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    +{achievement.xpReward} XP
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
