import { NextRequest } from 'next/server'
import { connectWalletSchema } from '@/lib/validation'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { prisma } from '@/lib/db'
import { successResponse, errorResponse, validationErrorResponse, withRateLimit } from '@/lib/api'

// Connect wallet
export const POST = withRateLimit(withAuth(async (request: AuthenticatedRequest) => {
  try {
    const body = await request.json()
    const validatedData = connectWalletSchema.parse(body)

    // Check if wallet is already connected by another user
    const existingWallet = await prisma.wallet.findUnique({
      where: { address: validatedData.address }
    })

    if (existingWallet && existingWallet.userId !== request.user!.id) {
      return errorResponse('Wallet is already connected to another account', 409)
    }

    // Check if user already has this wallet
    const userWallet = await prisma.wallet.findFirst({
      where: {
        address: validatedData.address,
        userId: request.user!.id
      }
    })

    if (userWallet) {
      // Update existing wallet
      const updatedWallet = await prisma.wallet.update({
        where: { id: userWallet.id },
        data: {
          chain: validatedData.chain,
          isConnected: true
        }
      })

      return successResponse(updatedWallet, 'Wallet updated successfully')
    }

    // Create new wallet connection
    const wallet = await prisma.wallet.create({
      data: {
        address: validatedData.address,
        chain: validatedData.chain,
        userId: request.user!.id,
        isConnected: true
      }
    })

    return successResponse(wallet, 'Wallet connected successfully')

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return validationErrorResponse(error as any)
    }
    
    console.error('Connect wallet error:', error)
    return errorResponse('Failed to connect wallet', 500)
  }
}))

// Get user's wallets
export const GET = withRateLimit(withAuth(async (request: AuthenticatedRequest) => {
  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId: request.user!.id },
      orderBy: { createdAt: 'desc' }
    })

    return successResponse(wallets)

  } catch (error) {
    console.error('Get wallets error:', error)
    return errorResponse('Failed to get wallets', 500)
  }
})) 