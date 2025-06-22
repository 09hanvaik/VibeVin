import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'
import { getUserById } from './auth'
import { unauthorizedResponse } from './api'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    role: string
  }
}

export async function authenticateRequest(request: NextRequest): Promise<AuthenticatedRequest> {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization header')
  }

  const token = authHeader.substring(7)
  const payload = verifyToken(token)
  
  if (!payload) {
    throw new Error('Invalid or expired token')
  }

  // Verify user still exists in database
  const user = await getUserById(payload.userId)
  if (!user) {
    throw new Error('User not found')
  }

  const authenticatedRequest = request as AuthenticatedRequest
  authenticatedRequest.user = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  return authenticatedRequest
}

export function withAuth(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const authenticatedRequest = await authenticateRequest(request)
      return await handler(authenticatedRequest)
    } catch (error) {
      return unauthorizedResponse()
    }
  }
}

export function withRole(requiredRole: string) {
  return function(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
    return async (request: NextRequest): Promise<NextResponse> => {
      try {
        const authenticatedRequest = await authenticateRequest(request)
        
        if (authenticatedRequest.user?.role !== requiredRole && authenticatedRequest.user?.role !== 'ADMIN') {
          return NextResponse.json(
            { success: false, error: 'Insufficient permissions' },
            { status: 403 }
          )
        }
        
        return await handler(authenticatedRequest)
      } catch (error) {
        return unauthorizedResponse()
      }
    }
  }
}

export function withRateLimit(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    if (!rateLimiter.isAllowed(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((rateLimiter.getResetTime(ip) - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimiter.getRemainingRequests(ip).toString(),
            'X-RateLimit-Reset': rateLimiter.getResetTime(ip).toString()
          }
        }
      )
    }
    
    return await handler(request)
  }
}

// Import rate limiter
import { rateLimiter } from './api' 