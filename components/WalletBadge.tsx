'use client'

import { motion } from 'framer-motion'
import { Wallet, Star, Zap, Crown, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WalletBadgeProps {
  name: string
  description: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  icon: 'star' | 'zap' | 'crown' | 'shield'
  isEquipped?: boolean
  onClick?: () => void
}

export default function WalletBadge({
  name,
  description,
  rarity,
  icon,
  isEquipped = false,
  onClick
}: WalletBadgeProps) {
  const rarityColors = {
    Common: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600',
    Rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-600',
    Epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-600',
    Legendary: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-600'
  }

  const iconMap = {
    star: Star,
    zap: Zap,
    crown: Crown,
    shield: Shield
  }

  const IconComponent = iconMap[icon]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative bg-card border-2 rounded-xl p-4 cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:border-primary/50",
        isEquipped ? "border-primary shadow-lg" : "border-border",
        rarityColors[rarity]
      )}
    >
      {/* Equipped indicator */}
      {isEquipped && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Wallet size={12} className="text-white" />
        </div>
      )}

      {/* Badge Icon */}
      <div className="flex items-center justify-center mb-3">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-primary/20 to-purple-500/20"
        )}>
          <IconComponent size={24} className="text-primary" />
        </div>
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h3 className="font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        
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
          <WalletBadge {...badge} />
        </motion.div>
      ))}
    </div>
  )
} 