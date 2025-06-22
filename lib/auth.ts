import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// JWT utilities
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

// Session utilities
export async function createSession(userId: string): Promise<string> {
  const sessionToken = generateToken({ userId, email: '', role: '' })
  
  await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  })
  
  return sessionToken
}

export async function validateSession(sessionToken: string): Promise<boolean> {
  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true }
  })
  
  if (!session || session.expires < new Date()) {
    return false
  }
  
  return true
}

export async function deleteSession(sessionToken: string): Promise<void> {
  await prisma.session.delete({
    where: { sessionToken }
  })
}

// User utilities
export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
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
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      wallets: true,
      badges: true
    }
  })
} 