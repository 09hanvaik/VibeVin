import { NextRequest } from 'next/server'
import { loginSchema } from '@/lib/validation'
import { verifyPassword, generateToken } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, withRateLimit } from '@/lib/api'

export const POST = withRateLimit(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        name: true,
        bio: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    })

    if (!user) {
      return errorResponse('Invalid email or password', 401)
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password)
    if (!isValidPassword) {
      return errorResponse('Invalid email or password', 401)
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return successResponse({
      user: userWithoutPassword,
      token
    }, 'Login successful')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Login error:', error)
    return errorResponse('Failed to login', 500)
  }
}) 