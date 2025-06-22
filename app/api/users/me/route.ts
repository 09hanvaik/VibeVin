import { NextRequest } from 'next/server'
import { updateUserSchema } from '@/lib/validation'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, withRateLimit } from '@/lib/api'

// Get current user profile
export const GET = withRateLimit(withAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: request.user!.id },
      include: {
        wallets: true,
        badges: true,
        _count: {
          select: {
            bounties: true,
            submissions: true,
            prompts: true,
            content: true
          }
        }
      }
    })

    if (!user) {
      return errorResponse('User not found', 404)
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return successResponse(userWithoutPassword)

  } catch (error) {
    console.error('Get user profile error:', error)
    return errorResponse('Failed to get user profile', 500)
  }
}))

// Update current user profile
export const PUT = withRateLimit(withAuth(async (request: AuthenticatedRequest) => {
  try {
    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: request.user!.id },
      data: {
        name: validatedData.name,
        bio: validatedData.bio,
        avatar: validatedData.avatar
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return successResponse(updatedUser, 'Profile updated successfully')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Update user profile error:', error)
    return errorResponse('Failed to update profile', 500)
  }
})) 