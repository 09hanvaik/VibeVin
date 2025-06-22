import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Success responses
export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message
  })
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): NextResponse<PaginatedResponse<T>> {
  const totalPages = Math.ceil(total / limit)
  
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  })
}

// Error responses
export function errorResponse(
  error: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error
    },
    { status }
  )
}

export function validationErrorResponse(error: ZodError): NextResponse<ApiResponse> {
  const errorMessage = error.errors.map(err => err.message).join(', ')
  return errorResponse(`Validation error: ${errorMessage}`, 400)
}

export function notFoundResponse(resource: string = 'Resource'): NextResponse<ApiResponse> {
  return errorResponse(`${resource} not found`, 404)
}

export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return errorResponse('Unauthorized', 401)
}

export function forbiddenResponse(): NextResponse<ApiResponse> {
  return errorResponse('Forbidden', 403)
}

export function serverErrorResponse(): NextResponse<ApiResponse> {
  return errorResponse('Internal server error', 500)
}

// Request utilities
export async function getRequestBody<T>(request: NextRequest): Promise<T> {
  try {
    return await request.json()
  } catch (error) {
    throw new Error('Invalid JSON in request body')
  }
}

export function getQueryParams(request: NextRequest): URLSearchParams {
  return request.nextUrl.searchParams
}

// CORS headers
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

// Rate limiting utilities
export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

export class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const record = this.requests.get(identifier)

    if (!record || now > record.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs
      })
      return true
    }

    if (record.count >= this.config.maxRequests) {
      return false
    }

    record.count++
    return true
  }

  getRemainingRequests(identifier: string): number {
    const record = this.requests.get(identifier)
    if (!record) return this.config.maxRequests
    return Math.max(0, this.config.maxRequests - record.count)
  }

  getResetTime(identifier: string): number {
    const record = this.requests.get(identifier)
    return record ? record.resetTime : Date.now() + this.config.windowMs
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
})

// Rate limiting middleware
export function withRateLimit(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const identifier = request.ip || 'unknown'
    
    if (!rateLimiter.isAllowed(identifier)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please try again later.'
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimiter.getRemainingRequests(identifier).toString(),
            'X-RateLimit-Reset': rateLimiter.getResetTime(identifier).toString()
          }
        }
      )
    }

    return handler(request)
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    // Get token from localStorage (client-side only)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: {
    email: string
    username: string
    password: string
    name?: string
    bio?: string
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async getProfile() {
    return this.request('/users/me')
  }

  // Bounties
  async getBounties() {
    return this.request('/bounties')
  }

  async getBounty(id: string) {
    return this.request(`/bounties/${id}`)
  }

  async createBounty(bountyData: {
    title: string
    description: string
    reward: number
    deadline: string
    tags: string[]
  }) {
    return this.request('/bounties', {
      method: 'POST',
      body: JSON.stringify(bountyData),
    })
  }

  async submitBounty(bountyId: string, submissionData: {
    title: string
    description: string
    files: string[]
  }) {
    return this.request(`/bounties/${bountyId}/submissions`, {
      method: 'POST',
      body: JSON.stringify(submissionData),
    })
  }

  // Prompts
  async getPrompts() {
    return this.request('/prompts')
  }

  async createPrompt(promptData: {
    title: string
    content: string
    category: string
    tags: string[]
  }) {
    return this.request('/prompts', {
      method: 'POST',
      body: JSON.stringify(promptData),
    })
  }

  // Content
  async getContent() {
    return this.request('/content')
  }

  async createContent(contentData: {
    title: string
    content: string
    type: string
    tags: string[]
  }) {
    return this.request('/content', {
      method: 'POST',
      body: JSON.stringify(contentData),
    })
  }

  // Wallets
  async getWallet() {
    return this.request('/wallets')
  }

  // Utility methods
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('token')
  }

  logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
  }

  getUser(): any | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }
}

export const apiClient = new ApiClient()
export default apiClient 