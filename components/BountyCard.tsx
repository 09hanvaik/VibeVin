'use client'

import { motion } from 'framer-motion'
import { Trophy, Clock, Users, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BountyCardProps {
  title: string
  description: string
  reward: string
  progress: number
  participants: number
  timeLeft: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  isClaimable?: boolean
}

export default function BountyCard({
  title,
  description,
  reward,
  progress,
  participants,
  timeLeft,
  difficulty,
  isClaimable = false
}: BountyCardProps) {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          difficultyColors[difficulty]
        )}>
          {difficulty}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Users size={16} />
          <span>{participants} participants</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{timeLeft}</span>
        </div>
      </div>

      {/* Reward and Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap size={16} className="text-yellow-500" />
          <span className="font-semibold text-foreground">{reward}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!isClaimable}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-colors",
            isClaimable
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {isClaimable ? 'Claim' : 'In Progress'}
        </motion.button>
      </div>
    </motion.div>
  )
} 