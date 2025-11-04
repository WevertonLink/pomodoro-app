import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import confetti from 'canvas-confetti'

interface LevelUpAnimationProps {
  show: boolean
  level: number
  title: string
  onClose: () => void
}

export function LevelUpAnimation({ show, level, title, onClose }: LevelUpAnimationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      
      // Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f97316', '#eab308'],
      })

      // Auto-close após 5 segundos
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 500)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
          >
            <Card className="w-80 border-4 border-primary shadow-2xl">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  {/* Emoji animado */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="text-8xl"
                  >
                    🎉
                  </motion.div>

                  {/* Texto */}
                  <div>
                    <h2 className="text-3xl font-bold text-primary">
                      LEVEL UP!
                    </h2>
                    <p className="text-5xl font-black mt-2">
                      {level}
                    </p>
                    <p className="text-xl text-muted-foreground mt-2">
                      {title}
                    </p>
                  </div>

                  {/* Partículas */}
                  <div className="flex justify-center gap-2 text-2xl">
                    <motion.span
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    >
                      ⭐
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    >
                      ✨
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    >
                      💫
                    </motion.span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
