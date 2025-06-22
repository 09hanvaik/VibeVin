import { prisma } from './db'
import { hashPassword } from './auth'

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vibevin.com' },
    update: {},
    create: {
      email: 'admin@vibevin.com',
      username: 'admin',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isVerified: true
    }
  })

  // Create test user
  const userPassword = await hashPassword('user123')
  const user = await prisma.user.upsert({
    where: { email: 'user@vibevin.com' },
    update: {},
    create: {
      email: 'user@vibevin.com',
      username: 'testuser',
      password: userPassword,
      name: 'Test User',
      bio: 'A passionate developer and AI enthusiast',
      isVerified: true
    }
  })

  // Create sample bounties
  const bounties = await Promise.all([
    prisma.bounty.upsert({
      where: { id: 'bounty-1' },
      update: {},
      create: {
        id: 'bounty-1',
        title: 'Build a Web3 Dashboard',
        description: 'Create a modern dashboard for tracking DeFi protocols and portfolio performance. Should include real-time data, charts, and wallet integration.',
        requirements: 'React/Next.js, TypeScript, Web3 libraries, Chart.js, responsive design',
        reward: 2.5,
        currency: 'ETH',
        category: 'Development',
        tags: JSON.stringify(['web3', 'dashboard', 'defi', 'react']),
        creatorId: admin.id,
        status: 'ACTIVE',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    }),
    prisma.bounty.upsert({
      where: { id: 'bounty-2' },
      update: {},
      create: {
        id: 'bounty-2',
        title: 'AI Content Generator',
        description: 'Develop an AI-powered content generation tool that can create blog posts, social media content, and marketing copy.',
        requirements: 'Python, OpenAI API, FastAPI, React frontend, content optimization',
        reward: 1.8,
        currency: 'ETH',
        category: 'AI/ML',
        tags: JSON.stringify(['ai', 'content', 'openai', 'python']),
        creatorId: user.id,
        status: 'ACTIVE',
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 21 days
      }
    }),
    prisma.bounty.upsert({
      where: { id: 'bounty-3' },
      update: {},
      create: {
        id: 'bounty-3',
        title: 'NFT Marketplace',
        description: 'Build a decentralized NFT marketplace with minting, trading, and auction features.',
        requirements: 'Solidity, React, IPFS, MetaMask integration, auction system',
        reward: 3.2,
        currency: 'ETH',
        category: 'Blockchain',
        tags: JSON.stringify(['nft', 'marketplace', 'solidity', 'ipfs']),
        creatorId: admin.id,
        status: 'ACTIVE',
        maxSubmissions: 5,
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days
      }
    })
  ])

  // Create sample prompts
  const prompts = await Promise.all([
    prisma.prompt.upsert({
      where: { id: 'prompt-1' },
      update: {},
      create: {
        id: 'prompt-1',
        title: 'Code Review Assistant',
        content: 'You are an expert code reviewer. Analyze the following code for bugs, security issues, performance problems, and best practices. Provide specific suggestions for improvement.',
        category: 'Development',
        tags: JSON.stringify(['code-review', 'security', 'performance']),
        userId: admin.id,
        usageCount: 15,
        successRate: 92.5,
        avgScore: 4.2
      }
    }),
    prisma.prompt.upsert({
      where: { id: 'prompt-2' },
      update: {},
      create: {
        id: 'prompt-2',
        title: 'Creative Writing Generator',
        content: 'Write a creative story based on the following elements: genre, setting, characters, and plot points. Make it engaging and original.',
        category: 'Creative',
        tags: JSON.stringify(['writing', 'creative', 'story']),
        userId: user.id,
        usageCount: 28,
        successRate: 88.0,
        avgScore: 4.5
      }
    }),
    prisma.prompt.upsert({
      where: { id: 'prompt-3' },
      update: {},
      create: {
        id: 'prompt-3',
        title: 'Business Plan Generator',
        content: 'Create a comprehensive business plan for a startup idea. Include market analysis, financial projections, marketing strategy, and risk assessment.',
        category: 'Business',
        tags: JSON.stringify(['business', 'startup', 'planning']),
        userId: admin.id,
        usageCount: 12,
        successRate: 95.0,
        avgScore: 4.8
      }
    })
  ])

  // Create sample content
  const content = await Promise.all([
    prisma.content.upsert({
      where: { id: 'content-1' },
      update: {},
      create: {
        id: 'content-1',
        title: 'Modern React Best Practices',
        content: 'A comprehensive guide to modern React development including hooks, context, performance optimization, and testing strategies.',
        type: 'TEXT',
        promptId: prompts[0].id,
        userId: user.id,
        metadata: JSON.stringify({
          wordCount: 2500,
          readingTime: '10 min',
          tags: ['react', 'javascript', 'frontend']
        })
      }
    }),
    prisma.content.upsert({
      where: { id: 'content-2' },
      update: {},
      create: {
        id: 'content-2',
        title: 'The Future of AI in Healthcare',
        content: 'An analysis of how artificial intelligence is transforming healthcare delivery, diagnosis, and patient care.',
        type: 'TEXT',
        promptId: prompts[1].id,
        userId: admin.id,
        metadata: JSON.stringify({
          wordCount: 1800,
          readingTime: '7 min',
          tags: ['ai', 'healthcare', 'technology']
        })
      }
    })
  ])

  // Create sample wallets
  const wallets = await Promise.all([
    prisma.wallet.upsert({
      where: { id: 'wallet-1' },
      update: {},
      create: {
        id: 'wallet-1',
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        chain: 'ethereum',
        balance: 2.5,
        isConnected: true,
        userId: user.id
      }
    }),
    prisma.wallet.upsert({
      where: { id: 'wallet-2' },
      update: {},
      create: {
        id: 'wallet-2',
        address: '0x8ba1f109551bD432803012645Hac136c772c3c7b',
        chain: 'polygon',
        balance: 150.0,
        isConnected: true,
        userId: admin.id
      }
    })
  ])

  // Create sample badges
  const badges = await Promise.all([
    prisma.badge.upsert({
      where: { id: 'badge-1' },
      update: {},
      create: {
        id: 'badge-1',
        name: 'Early Adopter',
        description: 'One of the first users to join VibeVin',
        rarity: 'RARE',
        userId: user.id
      }
    }),
    prisma.badge.upsert({
      where: { id: 'badge-2' },
      update: {},
      create: {
        id: 'badge-2',
        name: 'Bounty Master',
        description: 'Successfully completed 10+ bounties',
        rarity: 'EPIC',
        userId: admin.id
      }
    }),
    prisma.badge.upsert({
      where: { id: 'badge-3' },
      update: {},
      create: {
        id: 'badge-3',
        name: 'Prompt Wizard',
        description: 'Created 5+ highly-rated prompts',
        rarity: 'LEGENDARY',
        userId: user.id
      }
    })
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`👥 Created ${2} users`)
  console.log(`💰 Created ${bounties.length} bounties`)
  console.log(`🤖 Created ${prompts.length} prompts`)
  console.log(`📝 Created ${content.length} content items`)
  console.log(`💼 Created ${wallets.length} wallets`)
  console.log(`🏆 Created ${badges.length} badges`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 