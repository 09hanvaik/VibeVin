'use client'

import { motion } from 'framer-motion'

export default function TestPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Test Page 🧪
        </h1>
        <p className="text-muted-foreground">
          This is a test page to verify that the Header and Sidebar don't re-render during navigation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Navigation Test</h2>
        <p className="text-muted-foreground mb-4">
          Navigate between this page and the dashboard to see if the Header and Sidebar maintain their state.
        </p>
        <a 
          href="/dashboard" 
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go to Dashboard
        </a>
      </motion.div>
    </div>
  )
} 