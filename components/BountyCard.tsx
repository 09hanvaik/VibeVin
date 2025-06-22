'use client'

import { motion } from 'framer-motion'
import { Trophy, Clock, Users, DollarSign, Calendar, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Bounty {
  id: string
  title: string
  description: string
  reward: number
  deadline: string
  participants: number
  status: string
  category: string
  tags: string[]
}

interface BountyCardProps {
  bounty: Bounty
  onClick?: () => void
}

export default function BountyCard({ bounty, onClick }: BountyCardProps) {
  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Expired'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays} days left`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Design': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'Development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Marketing': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
              {bounty.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={cn(
                "inline-block px-2 py-1 text-xs font-medium rounded-full",
                getStatusColor(bounty.status)
              )}>
                {bounty.status}
              </span>
              <span className={cn(
                "inline-block px-2 py-1 text-xs font-medium rounded-full",
                getCategoryColor(bounty.category)
              )}>
                {bounty.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {bounty.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {bounty.tags.slice(0, 3).map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
        {bounty.tags.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            +{bounty.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Users size={16} />
          <span>{bounty.participants} participants</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar size={16} />
          <span>{formatDeadline(bounty.deadline)}</span>
        </div>
      </div>

      {/* Reward and Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign size={16} className="text-yellow-500" />
          <span className="font-semibold text-gray-900 dark:text-white">
            ${bounty.reward.toLocaleString()}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
} 