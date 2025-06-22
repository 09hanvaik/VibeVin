'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Trophy, 
  DollarSign,
  Activity,
  Calendar,
  Award,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'
import apiClient from '@/lib/api'

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

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      if (!apiClient.isAuthenticated()) {
        router.push('/login')
        return
      }

      try {
        // Fetch dashboard data
        const [bountiesRes, profileRes] = await Promise.all([
          apiClient.getBounties(),
          apiClient.getProfile()
        ])

        if (bountiesRes.success && profileRes.success) {
          const bounties = bountiesRes.data || []
          const profile = profileRes.data

          // Calculate stats
          const totalBounties = bounties.length
          const activeBounties = bounties.filter((b: any) => b.status === 'active').length
          const totalRewards = bounties.reduce((sum: number, b: any) => sum + (b.reward || 0), 0)
          
          // Mock data for demo
          const mockStats: DashboardStats = {
            totalBounties,
            activeBounties,
            totalRewards,
            totalUsers: 1250,
            userBounties: profile.completedBounties || 0,
            userRewards: profile.totalRewards || 0,
            recentActivity: [
              {
                id: '1',
                type: 'bounty_completed',
                title: 'Completed "Design System Implementation"',
                timestamp: new Date().toISOString(),
                amount: 500
              },
              {
                id: '2',
                type: 'bounty_created',
                title: 'Created "AI Chatbot Integration"',
                timestamp: new Date(Date.now() - 86400000).toISOString()
              },
              {
                id: '3',
                type: 'reward_earned',
                title: 'Earned reward for "Mobile App UI"',
                timestamp: new Date(Date.now() - 172800000).toISOString(),
                amount: 300
              }
            ]
          }

          setStats(mockStats)
        } else {
          setError('Failed to load dashboard data')
        }
      } catch (err) {
        setError('Network error')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-blue-100">
          Here's what's happening in your VibeVin dashboard today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Bounties</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalBounties}</p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Bounties</p>
              <p className="text-2xl font-bold text-foreground">{stats.activeBounties}</p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Rewards</p>
              <p className="text-2xl font-bold text-foreground">${stats.totalRewards.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Community</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-muted-foreground">Bounties Completed</span>
              </div>
              <span className="font-semibold text-foreground">{stats.userBounties}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-muted-foreground">Total Earned</span>
              </div>
              <span className="font-semibold text-foreground">${stats.userRewards.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">Browse Bounties</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">View Analytics</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium">My Submissions</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats.recentActivity.map((activity, index) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className={cn(
                "p-2 rounded-full",
                activity.type === 'bounty_completed' && "bg-green-100 dark:bg-green-900/20",
                activity.type === 'bounty_created' && "bg-blue-100 dark:bg-blue-900/20",
                activity.type === 'reward_earned' && "bg-yellow-100 dark:bg-yellow-900/20"
              )}>
                {activity.type === 'bounty_completed' && <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />}
                {activity.type === 'bounty_created' && <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                {activity.type === 'reward_earned' && <DollarSign className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </p>
              </div>
              {activity.amount && (
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  +${activity.amount}
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 