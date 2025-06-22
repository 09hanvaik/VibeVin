'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut,
  User,
  Moon,
  Sun
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from './ThemeProvider'
import apiClient from '@/lib/api'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState(3)
  const themeContext = useTheme()
  
  // Fallback if theme context is not available
  const theme = themeContext?.theme || 'light'
  const toggleTheme = themeContext?.toggleTheme || (() => {})

  useEffect(() => {
    const userData = apiClient.getUser()
    if (userData) {
      setUser(userData)
    }
  }, [])

  const handleLogout = () => {
    apiClient.logout()
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search bounties, prompts, users..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{user.name || user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              </>
            ) : (
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
} 