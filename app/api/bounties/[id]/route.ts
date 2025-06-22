import { NextRequest } from 'next/server'
import { updateBountySchema } from '@/lib/validation'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, notFoundResponse, withRateLimit } from '@/lib/api'

// Get specific bounty
export const GET = withRateLimit(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const bounty = await prisma.bounty.findUnique({
      where: { id: params.id },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        submissions: {
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
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            submissions: true
          }
        }
      }
    })

    if (!bounty) {
      return notFoundResponse('Bounty')
    }

    return successResponse(bounty)

  } catch (error) {
    console.error('Get bounty error:', error)
    return errorResponse('Failed to get bounty', 500)
  }
})

// Update bounty (only creator or admin)
export const PUT = withRateLimit(withAuth(async (request: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    const body = await request.json()
    const validatedData = updateBountySchema.parse(body)

    // Check if bounty exists and user has permission
    const existingBounty = await prisma.bounty.findUnique({
      where: { id: params.id }
    })

    if (!existingBounty) {
      return notFoundResponse('Bounty')
    }

    if (existingBounty.creatorId !== request.user!.id && request.user!.role !== 'ADMIN') {
      return errorResponse('You can only update your own bounties', 403)
    }

    const updatedBounty = await prisma.bounty.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        ...(validatedData.tags && { tags: JSON.stringify(validatedData.tags) })
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

    return successResponse(updatedBounty, 'Bounty updated successfully')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Update bounty error:', error)
    return errorResponse('Failed to update bounty', 500)
  }
}))

// Delete bounty (only creator or admin)
export const DELETE = withRateLimit(withAuth(async (request: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    // Check if bounty exists and user has permission
    const existingBounty = await prisma.bounty.findUnique({
      where: { id: params.id }
    })

    if (!existingBounty) {
      return notFoundResponse('Bounty')
    }

    if (existingBounty.creatorId !== request.user!.id && request.user!.role !== 'ADMIN') {
      return errorResponse('You can only delete your own bounties', 403)
    }

    // Check if bounty has submissions
    const submissionCount = await prisma.submission.count({
      where: { bountyId: params.id }
    })

    if (submissionCount > 0) {
      return errorResponse('Cannot delete bounty with existing submissions', 400)
    }

    await prisma.bounty.delete({
      where: { id: params.id }
    })

    return successResponse(null, 'Bounty deleted successfully')

  } catch (error) {
    console.error('Delete bounty error:', error)
    return errorResponse('Failed to delete bounty', 500)
  }
})) 