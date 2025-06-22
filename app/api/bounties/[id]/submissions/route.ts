import { NextRequest } from 'next/server'
import { createSubmissionSchema, paginationSchema } from '@/lib/validation'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, paginatedResponse, notFoundResponse, withRateLimit } from '@/lib/api'

// Create submission for bounty
export const POST = withRateLimit(withAuth(async (request: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    const body = await request.json()
    const validatedData = createSubmissionSchema.parse(body)

    // Check if bounty exists and is active
    const bounty = await prisma.bounty.findUnique({
      where: { id: params.id }
    })

    if (!bounty) {
      return notFoundResponse('Bounty')
    }

    if (bounty.status !== 'ACTIVE') {
      return errorResponse('Bounty is not accepting submissions', 400)
    }

    // Check if user has already submitted
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        bountyId: params.id,
        userId: request.user!.id
      }
    })

    if (existingSubmission) {
      return errorResponse('You have already submitted to this bounty', 400)
    }

    // Check max submissions limit
    if (bounty.maxSubmissions) {
      const submissionCount = await prisma.submission.count({
        where: { bountyId: params.id }
      })

      if (submissionCount >= bounty.maxSubmissions) {
        return errorResponse('Maximum submissions reached for this bounty', 400)
      }
    }

    const submission = await prisma.submission.create({
      data: {
        ...validatedData,
        attachments: validatedData.attachments ? JSON.stringify(validatedData.attachments) : null,
        bountyId: params.id,
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
        bounty: {
          select: {
            id: true,
            title: true,
            reward: true,
            currency: true
          }
        }
      }
    })

    return successResponse(submission, 'Submission created successfully')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Create submission error:', error)
    return errorResponse('Failed to create submission', 500)
  }
}))

// Get submissions for bounty
export const GET = withRateLimit(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      status: searchParams.get('status') || undefined,
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const validatedQuery = paginationSchema.parse(query)

    // Check if bounty exists
    const bounty = await prisma.bounty.findUnique({
      where: { id: params.id }
    })

    if (!bounty) {
      return notFoundResponse('Bounty')
    }

    // Build where clause
    const where: any = {
      bountyId: params.id
    }

    if (validatedQuery.status) {
      where.status = validatedQuery.status
    }

    // Get total count
    const total = await prisma.submission.count({ where })

    // Get submissions
    const submissions = await prisma.submission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
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
      submissions,
      validatedQuery.page,
      validatedQuery.limit,
      total
    )

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Get submissions error:', error)
    return errorResponse('Failed to get submissions', 500)
  }
}) 