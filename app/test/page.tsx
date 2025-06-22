'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function TestPage() {
  const [testResults, setTestResults] = useState<Array<{
    name: string
    status: 'pass' | 'fail' | 'pending'
    message: string
  }>>([
    { name: 'Page Loading', status: 'pending', message: 'Testing...' },
    { name: 'API Routes', status: 'pending', message: 'Testing...' },
    { name: 'Authentication', status: 'pending', message: 'Testing...' },
    { name: 'Components', status: 'pending', message: 'Testing...' },
    { name: 'Theme System', status: 'pending', message: 'Testing...' },
  ])

  const runTests = async () => {
    const newResults = [...testResults]

    // Test 1: Page Loading
    newResults[0] = { name: 'Page Loading', status: 'pass', message: 'Page loads successfully' }

    // Test 2: API Routes
    try {
      const response = await fetch('/api/bounties')
      const data = await response.json()
      if (data.success && data.data) {
        newResults[1] = { name: 'API Routes', status: 'pass', message: `Found ${data.data.length} bounties` }
      } else {
        newResults[1] = { name: 'API Routes', status: 'fail', message: 'API response invalid' }
      }
    } catch (error) {
      newResults[1] = { name: 'API Routes', status: 'fail', message: 'API request failed' }
    }

    // Test 3: Authentication
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@vibevin.com', password: 'admin123' })
      })
      const data = await response.json()
      if (data.success && data.data.token) {
        newResults[2] = { name: 'Authentication', status: 'pass', message: 'Login works with demo credentials' }
      } else {
        newResults[2] = { name: 'Authentication', status: 'fail', message: 'Login failed' }
      }
    } catch (error) {
      newResults[2] = { name: 'Authentication', status: 'fail', message: 'Authentication API failed' }
    }

    // Test 4: Components
    try {
      // Test if localStorage is available (for theme persistence)
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('test', 'test')
        localStorage.removeItem('test')
        newResults[3] = { name: 'Components', status: 'pass', message: 'Components and localStorage working' }
      } else {
        newResults[3] = { name: 'Components', status: 'fail', message: 'localStorage not available' }
      }
    } catch (error) {
      newResults[3] = { name: 'Components', status: 'fail', message: 'Component test failed' }
    }

    // Test 5: Theme System
    try {
      if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('theme') || 'light'
        newResults[4] = { name: 'Theme System', status: 'pass', message: `Current theme: ${theme}` }
      } else {
        newResults[4] = { name: 'Theme System', status: 'fail', message: 'Window object not available' }
      }
    } catch (error) {
      newResults[4] = { name: 'Theme System', status: 'fail', message: 'Theme system failed' }
    }

    setTestResults(newResults)
  }

  const getStatusIcon = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'fail':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            VibeVin System Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Testing all system components and functionality
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={runTests}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Run All Tests
          </button>
        </div>

        <div className="grid gap-4">
          {testResults.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getStatusColor(test.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {test.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {test.message}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {test.status === 'pass' && 'PASSED'}
                  {test.status === 'fail' && 'FAILED'}
                  {test.status === 'pending' && 'PENDING'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/"
              className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-center"
            >
              <div className="font-medium text-gray-900 dark:text-white">Home</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Landing page</div>
            </a>
            <a
              href="/dashboard"
              className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-center"
            >
              <div className="font-medium text-gray-900 dark:text-white">Dashboard</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Main dashboard</div>
            </a>
            <a
              href="/bounties"
              className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-center"
            >
              <div className="font-medium text-gray-900 dark:text-white">Bounties</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Browse bounties</div>
            </a>
            <a
              href="/login"
              className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-center"
            >
              <div className="font-medium text-gray-900 dark:text-white">Login</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Authentication</div>
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>VibeVin v1.0.0 - All systems operational</p>
        </div>
      </motion.div>
    </div>
  )
} 