import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, username, password, name, bio } = body

    // Basic validation
    if (!email || !username || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Create mock user
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      username,
      name,
      bio: bio || '',
      role: 'user',
      isVerified: true,
      avatar: null,
      createdAt: new Date().toISOString()
    }

    // Create mock token
    const token = `mock_token_${newUser.id}_${Date.now()}`

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        user: newUser,
        token
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 