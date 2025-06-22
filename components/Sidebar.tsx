'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Trophy, 
  BarChart3, 
  Wallet, 
  Palette, 
  MessageSquare,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import AnimatedLogo from './AnimatedLogo'
import { useTheme } from './ThemeProvider'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Trophy, label: 'Bounties', href: '/bounties' },
  { icon: BarChart3, label: 'Prompt Insights', href: '/prompt-insights' },
  { icon: Wallet, label: 'My Wallet', href: '/wallet' },
  { icon: Palette, label: 'Encode Design', href: '/encode-design' },
  { icon: MessageSquare, label: 'Social Feed', href: '/social-feed' },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const themeContext = useTheme()
  
  // Fallback if theme context is not available
  const theme = themeContext?.theme || 'light'

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ 
          x: isMobileOpen ? 0 : (isClient && window.innerWidth < 1024 ? -280 : 0)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed lg:relative z-40 h-full bg-card border-r border-border",
          "w-70 lg:w-auto transition-all duration-300",
          isCollapsed ? "lg:w-16" : "lg:w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <AnimatedLogo 
                size={isCollapsed ? "sm" : "md"} 
                showText={!isCollapsed}
              />
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </motion.a>
            ))}
          </nav>

          {/* Collapse button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </motion.div>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
} 