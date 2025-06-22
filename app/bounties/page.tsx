'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Clock, 
  Users, 
  DollarSign,
  Plus,
  Filter,
  Search,
  Calendar,
  Tag
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Bounty {
  id: string
  title: string
  description: string
  reward: number
  status: string
  deadline: string
  participants: number
  tags: string[]
  category: string
  createdAt: string
  createdBy: {
    id: string
    name: string
    username: string
  }
}

const mockBounties: Bounty[] = [
  {
    id: '1',
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system for our new product with components, guidelines, and documentation.',
    reward: 2500,
    status: 'active',
    deadline: '2024-02-15',
    participants: 12,
    tags: ['UI/UX', 'Design System', 'Figma'],
    category: 'Design',
    createdAt: '2024-01-15',
    createdBy: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe'
    }
  },
  {
    id: '2',
    title: 'AI Chatbot Integration',
    description: 'Integrate OpenAI GPT-4 into our customer support system with natural language processing.',
    reward: 3500,
    status: 'active',
    deadline: '2024-02-20',
    participants: 8,
    tags: ['AI', 'OpenAI', 'Chatbot'],
    category: 'Development',
    createdAt: '2024-01-20',
    createdBy: {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith'
    }
  },
  {
    id: '3',
    title: 'Mobile App UI Redesign',
    description: 'Redesign the mobile app interface for better user experience and modern design principles.',
    reward: 1800,
    status: 'active',
    deadline: '2024-02-10',
    participants: 15,
    tags: ['Mobile', 'UI/UX', 'Redesign'],
    category: 'Design',
    createdAt: '2024-01-25',
    createdBy: {
      id: '3',
      name: 'Mike Johnson',
      username: 'mikejohnson'
    }
  },
  {
    id: '4',
    title: 'Blockchain Smart Contract',
    description: 'Develop a smart contract for decentralized voting system with security best practices.',
    reward: 4200,
    status: 'active',
    deadline: '2024-02-25',
    participants: 6,
    tags: ['Blockchain', 'Smart Contract', 'Solidity'],
    category: 'Development',
    createdAt: '2024-01-30',
    createdBy: {
      id: '4',
      name: 'Sarah Wilson',
      username: 'sarahwilson'
    }
  },
  {
    id: '5',
    title: 'Content Marketing Strategy',
    description: 'Create a comprehensive content marketing strategy for our SaaS product launch.',
    reward: 1500,
    status: 'completed',
    deadline: '2024-01-30',
    participants: 10,
    tags: ['Marketing', 'Content', 'Strategy'],
    category: 'Marketing',
    createdAt: '2024-01-10',
    createdBy: {
      id: '5',
      name: 'Alex Brown',
      username: 'alexbrown'
    }
  },
  {
    id: '6',
    title: 'Data Analytics Dashboard',
    description: 'Build an interactive dashboard for real-time data visualization and analytics.',
    reward: 2800,
    status: 'active',
    deadline: '2024-02-28',
    participants: 9,
    tags: ['Analytics', 'Dashboard', 'Data'],
    category: 'Development',
    createdAt: '2024-02-01',
    createdBy: {
      id: '6',
      name: 'Emily Davis',
      username: 'emilydavis'
    }
  }
]

export default function BountiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredBounties = mockBounties.filter(bounty => {
    const matchesSearch = bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bounty.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || bounty.status === filterStatus
    const matchesCategory = filterCategory === 'all' || bounty.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Design': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'Development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Marketing': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Expired'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays} days left`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bounties</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Complete challenges and earn rewards
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Create Bounty
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search bounties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="expired">Expired</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="Design">Design</option>
          <option value="Development">Development</option>
          <option value="Marketing">Marketing</option>
        </select>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Bounties</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockBounties.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockBounties.filter(b => b.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Participants</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockBounties.reduce((sum, b) => sum + b.participants, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Rewards</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${mockBounties.reduce((sum, b) => sum + b.reward, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bounties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBounties.map((bounty, index) => (
          <motion.div
            key={bounty.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {bounty.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={cn(
                    "inline-block px-2 py-1 text-xs font-medium rounded-full",
                    getStatusColor(bounty.status)
                  )}>
                    {bounty.status}
                  </span>
                  <span className={cn(
                    "inline-block px-2 py-1 text-xs font-medium rounded-full",
                    getCategoryColor(bounty.category)
                  )}>
                    {bounty.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
                <DollarSign className="h-4 w-4" />
                <span className="font-semibold">{bounty.reward.toLocaleString()}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {bounty.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {bounty.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
              {bounty.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                  +{bounty.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{bounty.participants}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDeadline(bounty.deadline)}</span>
                </div>
              </div>
              <div className="text-xs">
                by @{bounty.createdBy.username}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBounties.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bounties found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  )
} 