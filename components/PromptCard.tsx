'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Prompt {
  id: string
  title: string
  description: string
  performance: number
  usage: number
  category: string
  tags: string[]
}

interface PromptCardProps {
  prompt: Prompt
  onClick?: () => void
}

export default function PromptCard({ prompt, onClick }: PromptCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Design': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'Content': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600 dark:text-green-400'
    if (performance >= 80) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getPerformanceIcon = (performance: number) => {
    if (performance >= 90) return <TrendingUp size={16} className="text-green-500" />
    if (performance >= 80) return <Activity size={16} className="text-yellow-500" />
    return <Activity size={16} className="text-red-500" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <BarChart3 size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
              {prompt.title}
            </h3>
            <span className={cn(
              "inline-block px-2 py-1 text-xs font-medium rounded-full mt-1",
              getCategoryColor(prompt.category)
            )}>
              {prompt.category}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {getPerformanceIcon(prompt.performance)}
          <span className={cn(
            "text-sm font-medium",
            getPerformanceColor(prompt.performance)
          )}>
            {prompt.performance}%
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
        {prompt.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {prompt.tags.slice(0, 2).map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
        {prompt.tags.length > 2 && (
          <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            +{prompt.tags.length - 2} more
          </span>
        )}
      </div>

      {/* Usage Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-white">
            {prompt.usage.toLocaleString()}
          </span> uses
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          {prompt.performance}% success
        </div>
      </div>

      {/* Performance Bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${prompt.performance}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={cn(
              "h-2 rounded-full",
              prompt.performance >= 90 ? "bg-green-500" :
              prompt.performance >= 80 ? "bg-yellow-500" : "bg-red-500"
            )}
          />
        </div>
      </div>
    </motion.div>
  )
} 