'use client'

import { motion } from 'framer-motion'
import { Wallet, Copy, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WalletData {
  id: string
  name: string
  address: string
  balance: number
  symbol: string
  color: string
}

interface WalletBadgeProps {
  wallet: WalletData
  onClick?: () => void
}

export default function WalletBadge({ wallet, onClick }: WalletBadgeProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800'
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative bg-white dark:bg-gray-800 border rounded-lg p-4 cursor-pointer transition-all duration-300",
        "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600",
        colorClasses[wallet.color as keyof typeof colorClasses] || colorClasses.blue
      )}
    >
      {/* Wallet Icon */}
      <div className="flex items-center justify-between mb-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600"
        )}>
          <Wallet size={20} className="text-gray-600 dark:text-gray-400" />
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {wallet.balance.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {wallet.symbol}
          </div>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
          {wallet.name}
        </h3>
        
        {/* Address */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
            {shortenAddress(wallet.address)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              copyAddress()
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Copy address"
          >
            <Copy size={12} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Connected</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            // Open wallet explorer
            window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')
          }}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          title="View on explorer"
        >
          <ExternalLink size={12} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </motion.div>
  )
}

// Legacy Badge Component (keeping for backward compatibility)
interface BadgeData {
  name: string
  description: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  icon: 'star' | 'zap' | 'crown' | 'shield'
  isEquipped?: boolean
}

export function BadgeCard({
  name,
  description,
  rarity,
  icon,
  isEquipped = false,
  onClick
}: BadgeData & { onClick?: () => void }) {
  const rarityColors = {
    Common: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600',
    Rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-600',
    Epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-600',
    Legendary: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-600'
  }

  const iconMap = {
    star: '⭐',
    zap: '⚡',
    crown: '👑',
    shield: '🛡️'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative bg-white dark:bg-gray-800 border-2 rounded-xl p-4 cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:border-blue-500/50",
        isEquipped ? "border-blue-500 shadow-lg" : "border-gray-200 dark:border-gray-700",
        rarityColors[rarity]
      )}
    >
      {/* Equipped indicator */}
      {isEquipped && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <Wallet size={12} className="text-white" />
        </div>
      )}

      {/* Badge Icon */}
      <div className="flex items-center justify-center mb-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
          <span className="text-2xl">{iconMap[icon]}</span>
        </div>
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{description}</p>
        
        {/* Rarity Badge */}
        <span className={cn(
          "inline-block px-2 py-1 rounded-full text-xs font-medium",
          rarityColors[rarity]
        )}>
          {rarity}
        </span>
      </div>

      {/* Shimmer effect for legendary */}
      {rarity === 'Legendary' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none" />
      )}
    </motion.div>
  )
}

// Badge Grid Component
export function BadgeGrid() {
  const badges = [
    {
      name: "Early Adopter",
      description: "Joined VibeVin in beta",
      rarity: "Rare" as const,
      icon: "star" as const,
      isEquipped: true
    },
    {
      name: "Power User",
      description: "Completed 50+ prompts",
      rarity: "Epic" as const,
      icon: "zap" as const,
      isEquipped: false
    },
    {
      name: "Community Leader",
      description: "Top 1% contributor",
      rarity: "Legendary" as const,
      icon: "crown" as const,
      isEquipped: false
    },
    {
      name: "Security Expert",
      description: "Verified wallet holder",
      rarity: "Common" as const,
      icon: "shield" as const,
      isEquipped: false
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <BadgeCard {...badge} />
        </motion.div>
      ))}
    </div>
  )
} 