'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Settings, 
  User,
  CheckCircle,
  Moon,
  Sun
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from './ThemeProvider'

export default function Header() {
  const [pageTitle] = useState('Dashboard')
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-card border-b border-border px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">{pageTitle}</h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle size={16} className="text-green-500" />
            <span>Synced with VibeOps ✅</span>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-accent transition-colors relative text-foreground"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <Settings size={20} />
          </motion.button>

          {/* User avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground">User</p>
              <p className="text-xs text-muted-foreground">user@vibevin.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
} 