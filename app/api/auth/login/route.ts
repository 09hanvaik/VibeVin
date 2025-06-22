import { NextRequest, NextResponse } from 'next/server'

// Mock user data for demo
const mockUsers = [
  {
    id: '1',
    email: 'admin@vibevin.com',
    username: 'admin',
    name: 'Admin User',
    password: 'admin123',
    role: 'admin',
    isVerified: true,
    avatar: null,
    bio: 'Platform administrator'
  },
  {
    id: '2',
    email: 'user@vibevin.com',
    username: 'user',
    name: 'Demo User',
    password: 'user123',
    role: 'user',
    isVerified: true,
    avatar: null,
    bio: 'Demo user account'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create mock token
    const token = `mock_token_${user.id}_${Date.now()}`

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 