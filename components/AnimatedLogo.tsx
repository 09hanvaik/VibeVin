'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function AnimatedLogo({ 
  size = 'md', 
  showText = true, 
  className = '' 
}: AnimatedLogoProps) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-12 h-12 text-xl'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Container */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden`}>
        {/* Initial W */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={hasAnimated ? { opacity: 0, scale: 0.8 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-white font-bold">W</span>
        </motion.div>

        {/* First V */}
        <motion.div
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={hasAnimated ? { opacity: 1, x: -2, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-white font-bold">V</span>
        </motion.div>

        {/* Second V */}
        <motion.div
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={hasAnimated ? { opacity: 1, x: 2, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-white font-bold">V</span>
        </motion.div>

        {/* Final VV */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-white font-bold">VV</span>
        </motion.div>
      </div>

      {/* Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          className={`font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}
        >
          VibeVin
        </motion.div>
      )}
    </div>
  )
} 