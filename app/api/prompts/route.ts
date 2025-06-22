import { NextRequest } from 'next/server'
import { createPromptSchema, paginationSchema } from '@/lib/validation'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, paginatedResponse, withRateLimit } from '@/lib/api'

// Create new prompt
export const POST = withRateLimit(withAuth(async (request: AuthenticatedRequest) => {
  try {
    const body = await request.json()
    const validatedData = createPromptSchema.parse(body)

    const prompt = await prisma.prompt.create({
      data: {
        ...validatedData,
        tags: JSON.stringify(validatedData.tags),
        userId: request.user!.id
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        _count: {
          select: {
            content: true
          }
        }
      }
    })

    return successResponse(prompt, 'Prompt created successfully')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Create prompt error:', error)
    return errorResponse('Failed to create prompt', 500)
  }
}))

// Get all prompts with pagination and filtering
export const GET = withRateLimit(async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      tags: searchParams.get('tags')?.split(',') || undefined,
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const validatedQuery = paginationSchema.parse(query)

    // Build where clause
    const where: any = {
      isPublic: true // Only show public prompts
    }

    if (validatedQuery.search) {
      where.OR = [
        { title: { contains: validatedQuery.search, mode: 'insensitive' } },
        { content: { contains: validatedQuery.search, mode: 'insensitive' } }
      ]
    }

    if (validatedQuery.category) {
      where.category = validatedQuery.category
    }

    if (validatedQuery.tags && validatedQuery.tags.length > 0) {
      where.tags = {
        contains: JSON.stringify(validatedQuery.tags[0])
      }
    }

    // Get total count
    const total = await prisma.prompt.count({ where })

    // Get prompts
    const prompts = await prisma.prompt.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        _count: {
          select: {
            content: true
          }
        }
      },
      orderBy: {
        [validatedQuery.sortBy]: validatedQuery.sortOrder
      },
      skip: (validatedQuery.page - 1) * validatedQuery.limit,
      take: validatedQuery.limit
    })

    return paginatedResponse(
      prompts,
      validatedQuery.page,
      validatedQuery.limit,
      total
    )

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Get prompts error:', error)
    return errorResponse('Failed to get prompts', 500)
  }
}) 