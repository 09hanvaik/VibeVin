import { NextRequest } from 'next/server'
import { registerSchema } from '@/lib/validation'
import { hashPassword, generateToken } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, withRateLimit } from '@/lib/api'

export const POST = withRateLimit(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username }
        ]
      }
    })

    if (existingUser) {
      return errorResponse('User with this email or username already exists', 409)
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        password: hashedPassword,
        name: validatedData.name,
        bio: validatedData.bio
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
        createdAt: true
      }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return successResponse({
      user,
      token
    }, 'User registered successfully')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Registration error:', error)
    return errorResponse('Failed to register user', 500)
  }
}) 