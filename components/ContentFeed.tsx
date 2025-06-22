'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Heart, Share2, User, Clock, FileText, Video, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentItem {
  id: string
  title: string
  type: 'article' | 'video' | 'podcast'
  author: string
  timestamp: string
  likes: number
  comments: number
  category: string
}

interface ContentFeedProps {
  content: ContentItem[]
}

export default function ContentFeed({ content }: ContentFeedProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText size={16} className="text-blue-500" />
      case 'video': return <Video size={16} className="text-red-500" />
      case 'podcast': return <Mic size={16} className="text-purple-500" />
      default: return <FileText size={16} className="text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'podcast': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Design': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'AI': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-3">
      {content.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          {/* Header */}
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-white text-sm">
                  {item.author}
                </span>
                <span className={cn(
                  "inline-block px-2 py-1 text-xs font-medium rounded-full",
                  getTypeColor(item.type)
                )}>
                  {item.type}
                </span>
                <span className={cn(
                  "inline-block px-2 py-1 text-xs font-medium rounded-full",
                  getCategoryColor(item.category)
                )}>
                  {item.category}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock size={12} />
                <span>{item.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
              {item.title}
            </h4>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Heart size={12} className="text-red-500" />
                <span>{item.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare size={12} className="text-blue-500" />
                <span>{item.comments}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {getTypeIcon(item.type)}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Load more button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-medium text-sm"
      >
        Load More Content
      </motion.button>
    </div>
  )
} 