'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Heart, Share2, Repeat2, User, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentItem {
  id: string
  content: string
  author: string
  timestamp: string
  likes: number
  shares: number
  retweets: number
  isAI: boolean
  platform: 'twitter' | 'linkedin' | 'instagram'
}

interface ContentFeedProps {
  items?: ContentItem[]
}

export default function ContentFeed({ items }: ContentFeedProps) {
  const defaultItems: ContentItem[] = [
    {
      id: '1',
      content: "Just discovered VibeVin's AI-powered prompt optimization! The way it analyzes engagement patterns and suggests improvements is mind-blowing. 🚀 #AI #Productivity",
      author: "Sarah Chen",
      timestamp: "2 hours ago",
      likes: 124,
      shares: 18,
      retweets: 32,
      isAI: true,
      platform: 'twitter'
    },
    {
      id: '2',
      content: "The future of content creation is here. VibeVin's prompt insights are helping me create more engaging posts with 40% better performance. Highly recommend!",
      author: "Tech Innovator",
      timestamp: "4 hours ago",
      likes: 89,
      shares: 12,
      retweets: 15,
      isAI: true,
      platform: 'linkedin'
    },
    {
      id: '3',
      content: "Working on some amazing AI-generated designs with VibeVin's Encode Design feature. The creativity possibilities are endless! ✨ #Design #AI",
      author: "Creative Designer",
      timestamp: "6 hours ago",
      likes: 256,
      shares: 45,
      retweets: 67,
      isAI: true,
      platform: 'instagram'
    }
  ]

  const feedItems = items || defaultItems

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-500'
      case 'linkedin': return 'text-blue-600'
      case 'instagram': return 'text-pink-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      {feedItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{item.author}</h3>
                {item.isAI && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                    AI Generated
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock size={14} />
                <span>{item.timestamp}</span>
                <span className={cn("font-medium", getPlatformColor(item.platform))}>
                  {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-foreground leading-relaxed">{item.content}</p>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Heart size={16} className="text-red-500" />
                <span>{item.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Repeat2 size={16} className="text-green-500" />
                <span>{item.retweets}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 size={16} className="text-blue-500" />
                <span>{item.shares}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Heart size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Repeat2 size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Share2 size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Load more button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-4 bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg transition-colors font-medium"
      >
        Load More Content
      </motion.button>
    </div>
  )
} 