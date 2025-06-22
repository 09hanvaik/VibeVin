'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PromptCardProps {
  title: string
  metric: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  chartData?: number[]
}

export default function PromptCard({
  title,
  metric,
  value,
  change,
  changeType,
  chartData = [65, 72, 68, 75, 82, 78, 85]
}: PromptCardProps) {
  const maxValue = Math.max(...chartData)
  const minValue = Math.min(...chartData)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{metric}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {changeType === 'increase' ? (
            <TrendingUp size={16} className="text-green-500" />
          ) : (
            <TrendingDown size={16} className="text-red-500" />
          )}
          <span className={cn(
            "text-sm font-medium",
            changeType === 'increase' ? "text-green-600" : "text-red-600"
          )}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-foreground mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className="text-sm text-muted-foreground">
          vs last period
        </div>
      </div>

      {/* Mini Chart */}
      <div className="flex items-end justify-between h-16 space-x-1">
        {chartData.map((dataPoint, index) => {
          const height = ((dataPoint - minValue) / (maxValue - minValue)) * 100
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "flex-1 rounded-t-sm min-w-[4px]",
                "bg-gradient-to-t from-primary/60 to-primary"
              )}
              style={{ height: `${height}%` }}
            />
          )
        })}
      </div>

      {/* Status indicator */}
      <div className="flex items-center space-x-2 mt-4 text-sm">
        <Activity size={14} className="text-green-500" />
        <span className="text-muted-foreground">Prompt loading...</span>
      </div>
    </motion.div>
  )
} 