import { NextRequest, NextResponse } from 'next/server'

// Mock bounty data
const mockBounties = [
  {
    id: '1',
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system for our new product with components, guidelines, and documentation.',
    reward: 2500,
    status: 'active',
    deadline: '2024-02-15',
    participants: 12,
    tags: ['UI/UX', 'Design System', 'Figma'],
    category: 'Design',
    createdAt: '2024-01-15',
    createdBy: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe'
    }
  },
  {
    id: '2',
    title: 'AI Chatbot Integration',
    description: 'Integrate OpenAI GPT-4 into our customer support system with natural language processing.',
    reward: 3500,
    status: 'active',
    deadline: '2024-02-20',
    participants: 8,
    tags: ['AI', 'OpenAI', 'Chatbot'],
    category: 'Development',
    createdAt: '2024-01-20',
    createdBy: {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith'
    }
  },
  {
    id: '3',
    title: 'Mobile App UI Redesign',
    description: 'Redesign the mobile app interface for better user experience and modern design principles.',
    reward: 1800,
    status: 'active',
    deadline: '2024-02-10',
    participants: 15,
    tags: ['Mobile', 'UI/UX', 'Redesign'],
    category: 'Design',
    createdAt: '2024-01-25',
    createdBy: {
      id: '3',
      name: 'Mike Johnson',
      username: 'mikejohnson'
    }
  },
  {
    id: '4',
    title: 'Blockchain Smart Contract',
    description: 'Develop a smart contract for decentralized voting system with security best practices.',
    reward: 4200,
    status: 'active',
    deadline: '2024-02-25',
    participants: 6,
    tags: ['Blockchain', 'Smart Contract', 'Solidity'],
    category: 'Development',
    createdAt: '2024-01-30',
    createdBy: {
      id: '4',
      name: 'Sarah Wilson',
      username: 'sarahwilson'
    }
  },
  {
    id: '5',
    title: 'Content Marketing Strategy',
    description: 'Create a comprehensive content marketing strategy for our SaaS product launch.',
    reward: 1500,
    status: 'completed',
    deadline: '2024-01-30',
    participants: 10,
    tags: ['Marketing', 'Content', 'Strategy'],
    category: 'Marketing',
    createdAt: '2024-01-10',
    createdBy: {
      id: '5',
      name: 'Alex Brown',
      username: 'alexbrown'
    }
  },
  {
    id: '6',
    title: 'Data Analytics Dashboard',
    description: 'Build an interactive dashboard for real-time data visualization and analytics.',
    reward: 2800,
    status: 'active',
    deadline: '2024-02-28',
    participants: 9,
    tags: ['Analytics', 'Dashboard', 'Data'],
    category: 'Development',
    createdAt: '2024-02-01',
    createdBy: {
      id: '6',
      name: 'Emily Davis',
      username: 'emilydavis'
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let filteredBounties = [...mockBounties]

    // Apply filters
    if (status && status !== 'all') {
      filteredBounties = filteredBounties.filter(bounty => bounty.status === status)
    }

    if (category && category !== 'all') {
      filteredBounties = filteredBounties.filter(bounty => bounty.category === category)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredBounties = filteredBounties.filter(bounty =>
        bounty.title.toLowerCase().includes(searchLower) ||
        bounty.description.toLowerCase().includes(searchLower) ||
        bounty.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredBounties,
      total: filteredBounties.length
    })

  } catch (error) {
    console.error('Bounties API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, reward, deadline, category, tags } = body

    // Basic validation
    if (!title || !description || !reward || !deadline || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new bounty
    const newBounty = {
      id: `bounty_${Date.now()}`,
      title,
      description,
      reward: Number(reward),
      status: 'active',
      deadline,
      participants: 0,
      tags: tags || [],
      category,
      createdAt: new Date().toISOString(),
      createdBy: {
        id: 'current_user',
        name: 'Current User',
        username: 'currentuser'
      }
    }

    return NextResponse.json({
      success: true,
      data: newBounty,
      message: 'Bounty created successfully'
    })

  } catch (error) {
    console.error('Create bounty error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 