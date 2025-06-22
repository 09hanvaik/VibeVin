'use client'

import { motion } from 'framer-motion'
import BountyCard from '@/components/BountyCard'
import PromptCard from '@/components/PromptCard'
import { BadgeGrid } from '@/components/WalletBadge'
import ContentFeed from '@/components/ContentFeed'

export default function DashboardPage() {
  const bounties = [
    {
      title: "AI Prompt Optimization",
      description: "Create engaging prompts for social media",
      reward: "500 VIBE",
      progress: 75,
      participants: 24,
      timeLeft: "2 days",
      difficulty: "Medium" as const,
      isClaimable: false
    },
    {
      title: "Design System Creation",
      description: "Build a comprehensive design system",
      reward: "1000 VIBE",
      progress: 100,
      participants: 12,
      timeLeft: "Completed",
      difficulty: "Hard" as const,
      isClaimable: true
    },
    {
      title: "Community Engagement",
      description: "Increase platform engagement metrics",
      reward: "300 VIBE",
      progress: 45,
      participants: 18,
      timeLeft: "5 days",
      difficulty: "Easy" as const,
      isClaimable: false
    }
  ]

  const promptMetrics = [
    {
      title: "Engagement Rate",
      metric: "Average likes per post",
      value: "2.4K",
      change: 12.5,
      changeType: "increase" as const,
      chartData: [1800, 2100, 1950, 2200, 2400, 2300, 2600]
    },
    {
      title: "Response Time",
      metric: "Average response time",
      value: "2.3s",
      change: -8.2,
      changeType: "decrease" as const,
      chartData: [3.1, 2.8, 2.9, 2.5, 2.3, 2.4, 2.1]
    },
    {
      title: "Success Rate",
      metric: "Successful prompts",
      value: "94.2%",
      change: 5.8,
      changeType: "increase" as const,
      chartData: [88, 90, 89, 92, 93, 94, 95]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-6 border border-primary/20"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your VibeChain dashboard today.
        </p>
      </motion.div>

      {/* Active Bounties Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Active Bounties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bounties.map((bounty, index) => (
            <BountyCard key={index} {...bounty} />
          ))}
        </div>
      </motion.section>

      {/* Prompt Performance Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Prompt Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promptMetrics.map((metric, index) => (
            <PromptCard key={index} {...metric} />
          ))}
        </div>
      </motion.section>

      {/* Wallet Badges Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Wallet Badges</h2>
        <BadgeGrid />
      </motion.section>

      {/* Recent Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Recent Content</h2>
        <ContentFeed />
      </motion.section>
    </div>
  )
} 