import { z } from 'zod'

// User validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional()
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export const updateUserSchema = z.object({
  name: z.string().optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional()
})

// Wallet validation schemas
export const connectWalletSchema = z.object({
  address: z.string().min(42, 'Invalid wallet address').max(42),
  chain: z.enum(['ethereum', 'polygon', 'binance']),
  signature: z.string().optional()
})

export const updateWalletSchema = z.object({
  address: z.string().min(42).max(42),
  chain: z.enum(['ethereum', 'polygon', 'binance']),
  isConnected: z.boolean().optional()
})

// Bounty validation schemas
export const createBountySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description must be less than 2000 characters'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters').max(1000, 'Requirements must be less than 1000 characters'),
  reward: z.number().positive('Reward must be positive'),
  currency: z.enum(['ETH', 'MATIC', 'USDC', 'USDT']).default('ETH'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed'),
  deadline: z.string().datetime().optional(),
  maxSubmissions: z.number().int().positive().optional()
})

export const updateBountySchema = z.object({
  title: z.string().min(5).max(100).optional(),
  description: z.string().min(20).max(2000).optional(),
  requirements: z.string().min(10).max(1000).optional(),
  reward: z.number().positive().optional(),
  currency: z.enum(['ETH', 'MATIC', 'USDC', 'USDT']).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).max(10).optional(),
  deadline: z.string().datetime().optional(),
  maxSubmissions: z.number().int().positive().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED']).optional()
})

// Submission validation schemas
export const createSubmissionSchema = z.object({
  content: z.string().min(10, 'Content must be at least 10 characters').max(10000, 'Content must be less than 10000 characters'),
  attachments: z.array(z.string().url()).max(5, 'Maximum 5 attachments allowed').optional()
})

export const updateSubmissionSchema = z.object({
  content: z.string().min(10).max(10000).optional(),
  attachments: z.array(z.string().url()).max(5).optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW']).optional(),
  score: z.number().min(0).max(100).optional(),
  feedback: z.string().max(1000).optional()
})

// Prompt validation schemas
export const createPromptSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters').max(5000, 'Content must be less than 5000 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed'),
  isPublic: z.boolean().default(true)
})

export const updatePromptSchema = z.object({
  title: z.string().min(5).max(100).optional(),
  content: z.string().min(10).max(5000).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).max(10).optional(),
  isPublic: z.boolean().optional()
})

// Content validation schemas
export const createContentSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters').max(50000, 'Content must be less than 50000 characters'),
  type: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'AUDIO', 'CODE', 'DOCUMENT']),
  metadata: z.record(z.any()).optional(),
  promptId: z.string().optional()
})

export const updateContentSchema = z.object({
  title: z.string().min(5).max(100).optional(),
  content: z.string().min(10).max(50000).optional(),
  type: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'AUDIO', 'CODE', 'DOCUMENT']).optional(),
  metadata: z.record(z.any()).optional(),
  promptId: z.string().optional()
})

// Badge validation schemas
export const createBadgeSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50, 'Name must be less than 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(200, 'Description must be less than 200 characters'),
  imageUrl: z.string().url().optional(),
  rarity: z.enum(['COMMON', 'RARE', 'EPIC', 'LEGENDARY'])
})

// Query validation schemas
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// Response types
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type ConnectWalletInput = z.infer<typeof connectWalletSchema>
export type CreateBountyInput = z.infer<typeof createBountySchema>
export type UpdateBountyInput = z.infer<typeof updateBountySchema>
export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>
export type CreatePromptInput = z.infer<typeof createPromptSchema>
export type CreateContentInput = z.infer<typeof createContentSchema>
export type PaginationInput = z.infer<typeof paginationSchema> 