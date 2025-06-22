'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Trophy, 
  DollarSign,
  Activity,
  Calendar,
  Award,
  Target,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'
import { cn } from '@/lib/utils'
import BountyCard from '@/components/BountyCard'
import PromptCard from '@/components/PromptCard'
import WalletBadge from '@/components/WalletBadge'
import ContentFeed from '@/components/ContentFeed'

interface DashboardStats {
  totalBounties: number
  activeBounties: number
  totalRewards: number
  totalUsers: number
  userBounties: number
  userRewards: number
  recentActivity: Array<{
    id: string
    type: string
    title: string
    timestamp: string
    amount?: number
  }>
}

const mockBounties = [
  {
    id: '1',
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system for our new product',
    reward: 2500,
    deadline: '2024-02-15',
    participants: 12,
    status: 'active',
    category: 'Design',
    tags: ['UI/UX', 'Design System', 'Figma']
  },
  {
    id: '2',
    title: 'AI Chatbot Integration',
    description: 'Integrate OpenAI GPT-4 into our customer support system',
    reward: 3500,
    deadline: '2024-02-20',
    participants: 8,
    status: 'active',
    category: 'Development',
    tags: ['AI', 'OpenAI', 'Chatbot']
  },
  {
    id: '3',
    title: 'Mobile App UI Redesign',
    description: 'Redesign the mobile app interface for better user experience',
    reward: 1800,
    deadline: '2024-02-10',
    participants: 15,
    status: 'active',
    category: 'Design',
    tags: ['Mobile', 'UI/UX', 'Redesign']
  }
]

const mockPrompts = [
  {
    id: '1',
    title: 'Code Review Assistant',
    description: 'AI-powered code review suggestions',
    performance: 94,
    usage: 1250,
    category: 'Development',
    tags: ['Code Review', 'AI', 'Quality']
  },
  {
    id: '2',
    title: 'Design Inspiration Generator',
    description: 'Generate creative design ideas and concepts',
    performance: 87,
    usage: 890,
    category: 'Design',
    tags: ['Design', 'Inspiration', 'Creative']
  },
  {
    id: '3',
    title: 'Content Writer',
    description: 'Professional content writing assistance',
    performance: 92,
    usage: 2100,
    category: 'Content',
    tags: ['Writing', 'Content', 'SEO']
  }
]

const mockWallets = [
  {
    id: '1',
    name: 'Ethereum',
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    balance: 2.5,
    symbol: 'ETH',
    color: 'blue'
  },
  {
    id: '2',
    name: 'Polygon',
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    balance: 1500,
    symbol: 'MATIC',
    color: 'purple'
  },
  {
    id: '3',
    name: 'Solana',
    address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    balance: 25.5,
    symbol: 'SOL',
    color: 'green'
  }
]

const mockContent = [
  {
    id: '1',
    title: 'The Future of Web3 Development',
    type: 'article',
    author: 'Alex Chen',
    timestamp: '2 hours ago',
    likes: 45,
    comments: 12,
    category: 'Development'
  },
  {
    id: '2',
    title: 'Designing for Accessibility',
    type: 'video',
    author: 'Sarah Johnson',
    timestamp: '4 hours ago',
    likes: 32,
    comments: 8,
    category: 'Design'
  },
  {
    id: '3',
    title: 'AI in Creative Industries',
    type: 'podcast',
    author: 'Mike Rodriguez',
    timestamp: '6 hours ago',
    likes: 67,
    comments: 15,
    category: 'AI'
  }
]

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBounties: 24,
    activeBounties: 8,
    totalRewards: 12500,
    totalUsers: 1250,
    userBounties: 3,
    userRewards: 2800,
    recentActivity: [
      {
        id: '1',
        type: 'completed',
        title: 'Design System Implementation',
        timestamp: '2 hours ago',
        amount: 2500
      },
      {
        id: '2',
        type: 'created',
        title: 'AI Chatbot Integration',
        timestamp: '4 hours ago'
      },
      {
        id: '3',
        type: 'rewarded',
        title: 'Mobile App UI',
        timestamp: '6 hours ago',
        amount: 1800
      }
    ]
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bounties</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalBounties}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Trophy className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Bounties</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeBounties}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Activity className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rewards</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalRewards.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <DollarSign className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Community</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Analytics</h3>
            <BarChart3 className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-8 border-blue-200 dark:border-blue-800 flex items-center justify-center mb-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">87%</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overall Performance</p>
            </div>
          </div>
        </motion.div>

        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <LineChart className="text-green-600 dark:text-green-400" size={20} />
          </div>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  activity.type === 'completed' ? "bg-green-500" :
                  activity.type === 'created' ? "bg-blue-500" : "bg-yellow-500"
                )}></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{activity.title}</span>
                {activity.amount && (
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +${activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Bounties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Bounties</h2>
            <a href="/bounties" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              View all
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBounties.map((bounty, index) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </div>
        </motion.div>

        {/* Wallet Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Wallet Badges</h2>
          <div className="space-y-3">
            {mockWallets.map((wallet) => (
              <WalletBadge key={wallet.id} wallet={wallet} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prompt Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Prompt Performance</h2>
          <div className="space-y-3">
            {mockPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </motion.div>

        {/* Content Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Content</h2>
          <ContentFeed content={mockContent} />
        </motion.div>
      </div>
    </div>
  )
} 