import { NextRequest } from 'next/server'
import { createContentSchema, paginationSchema } from '@/lib/validation'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, paginatedResponse, withRateLimit } from '@/lib/api'

// Create new content
export const POST = withRateLimit(withAuth(async (request: AuthenticatedRequest) => {
  try {
    const body = await request.json()
    const validatedData = createContentSchema.parse(body)

    const content = await prisma.content.create({
      data: {
        ...validatedData,
        metadata: validatedData.metadata ? JSON.stringify(validatedData.metadata) : null,
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
        prompt: {
          select: {
            id: true,
            title: true,
            content: true
          }
        }
      }
    })

    // Update prompt usage count and success rate
    if (validatedData.promptId) {
      await prisma.prompt.update({
        where: { id: validatedData.promptId },
        data: {
          usageCount: {
            increment: 1
          }
        }
      })
    }

    return successResponse(content, 'Content created successfully')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Create content error:', error)
    return errorResponse('Failed to create content', 500)
  }
}))

// Get all content with pagination and filtering
export const GET = withRateLimit(async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      search: searchParams.get('search') || undefined,
      type: searchParams.get('type') || undefined,
      promptId: searchParams.get('promptId') || undefined,
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const validatedQuery = paginationSchema.parse(query)

    // Build where clause
    const where: any = {}

    if (validatedQuery.search) {
      where.OR = [
        { title: { contains: validatedQuery.search, mode: 'insensitive' } },
        { content: { contains: validatedQuery.search, mode: 'insensitive' } }
      ]
    }

    if (validatedQuery.type) {
      where.type = validatedQuery.type
    }

    if (validatedQuery.promptId) {
      where.promptId = validatedQuery.promptId
    }

    // Get total count
    const total = await prisma.content.count({ where })

    // Get content
    const content = await prisma.content.findMany({
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
        prompt: {
          select: {
            id: true,
            title: true,
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
      content,
      validatedQuery.page,
      validatedQuery.limit,
      total
    )

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Get content error:', error)
    return errorResponse('Failed to get content', 500)
  }
}) 