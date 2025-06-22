import { NextRequest } from 'next/server'
import { createBountySchema, paginationSchema } from '@/lib/validation'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, paginatedResponse, withRateLimit } from '@/lib/api'

// Create new bounty
export const POST = withRateLimit(withAuth(async (request: AuthenticatedRequest) => {
  try {
    const body = await request.json()
    const validatedData = createBountySchema.parse(body)

    const bounty = await prisma.bounty.create({
      data: {
        ...validatedData,
        tags: JSON.stringify(validatedData.tags),
        creatorId: request.user!.id
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        _count: {
          select: {
            submissions: true
          }
        }
      }
    })

    return successResponse(bounty, 'Bounty created successfully')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Create bounty error:', error)
    return errorResponse('Failed to create bounty', 500)
  }
}))

// Get all bounties with pagination and filtering
export const GET = withRateLimit(async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      tags: searchParams.get('tags')?.split(',') || undefined,
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const validatedQuery = paginationSchema.parse(query)

    // Build where clause
    const where: any = {
      status: { not: 'DRAFT' } // Only show non-draft bounties publicly
    }

    if (validatedQuery.search) {
      where.OR = [
        { title: { contains: validatedQuery.search, mode: 'insensitive' } },
        { description: { contains: validatedQuery.search, mode: 'insensitive' } }
      ]
    }

    if (validatedQuery.category) {
      where.category = validatedQuery.category
    }

    if (validatedQuery.status) {
      where.status = validatedQuery.status
    }

    if (validatedQuery.tags && validatedQuery.tags.length > 0) {
      where.tags = {
        contains: JSON.stringify(validatedQuery.tags[0])
      }
    }

    // Get total count
    const total = await prisma.bounty.count({ where })

    // Get bounties
    const bounties = await prisma.bounty.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        _count: {
          select: {
            submissions: true
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
      bounties,
      validatedQuery.page,
      validatedQuery.limit,
      total
    )

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Get bounties error:', error)
    return errorResponse('Failed to get bounties', 500)
  }
}) 