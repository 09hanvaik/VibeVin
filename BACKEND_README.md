# VibeVin Backend Documentation

## Overview

VibeVin is a full-stack web application built with Next.js 13+ App Router, featuring a comprehensive backend API for managing bounties, AI prompts, content generation, user authentication, and wallet integration.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Zod schema validation
- **API**: RESTful API with TypeScript
- **Security**: Rate limiting, CORS, input validation

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp env.example .env.local
```

Update the following variables in `.env.local`:

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
JWT_SECRET="your-jwt-secret-key-here-change-in-production"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Database Setup

Generate Prisma client and push the schema:

```bash
npm run db:generate
npm run db:push
```

### 4. Seed Database

Populate the database with sample data:

```bash
npm run db:seed
```

This creates:
- Admin user: `admin@vibevin.com` / `admin123`
- Test user: `user@vibevin.com` / `user123`
- Sample bounties, prompts, content, wallets, and badges

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/`

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "name": "Full Name",
  "bio": "User bio"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  },
  "message": "User registered successfully"
}
```

#### POST `/api/auth/login`
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Management

#### GET `/api/users/me`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### PUT `/api/users/me`
Update current user profile (requires authentication).

**Request Body:**
```json
{
  "name": "Updated Name",
  "bio": "Updated bio",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Bounties

#### GET `/api/bounties`
Get all active bounties with pagination and filtering.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search in title and description
- `category`: Filter by category
- `status`: Filter by status
- `tags`: Comma-separated tags
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: asc or desc (default: desc)

#### POST `/api/bounties`
Create a new bounty (requires authentication).

**Request Body:**
```json
{
  "title": "Bounty Title",
  "description": "Detailed description",
  "requirements": "Technical requirements",
  "reward": 2.5,
  "currency": "ETH",
  "category": "Development",
  "tags": ["web3", "react", "typescript"],
  "deadline": "2024-02-01T00:00:00Z",
  "maxSubmissions": 5
}
```

#### GET `/api/bounties/[id]`
Get specific bounty details.

#### PUT `/api/bounties/[id]`
Update bounty (creator or admin only).

#### DELETE `/api/bounties/[id]`
Delete bounty (creator or admin only).

### Submissions

#### POST `/api/bounties/[id]/submissions`
Submit to a bounty (requires authentication).

**Request Body:**
```json
{
  "content": "Submission content",
  "attachments": ["https://example.com/file1.pdf"]
}
```

#### GET `/api/bounties/[id]/submissions`
Get submissions for a bounty.

### Prompts

#### GET `/api/prompts`
Get all public prompts with pagination and filtering.

#### POST `/api/prompts`
Create a new prompt (requires authentication).

**Request Body:**
```json
{
  "title": "Prompt Title",
  "content": "Prompt content",
  "category": "Development",
  "tags": ["code", "review"],
  "isPublic": true
}
```

### Content

#### GET `/api/content`
Get all content with pagination and filtering.

#### POST `/api/content`
Create new content (requires authentication).

**Request Body:**
```json
{
  "title": "Content Title",
  "content": "Content body",
  "type": "TEXT",
  "promptId": "prompt_id_optional",
  "metadata": {
    "wordCount": 1000,
    "readingTime": "5 min"
  }
}
```

### Wallets

#### GET `/api/wallets`
Get user's connected wallets (requires authentication).

#### POST `/api/wallets`
Connect a new wallet (requires authentication).

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "chain": "ethereum",
  "signature": "optional_signature"
}
```

## Database Schema

### Core Models

- **User**: User accounts with authentication
- **Bounty**: Hackathon bounties and challenges
- **Submission**: User submissions for bounties
- **Prompt**: AI prompts for content generation
- **Content**: AI-generated content
- **Wallet**: Connected blockchain wallets
- **Badge**: User achievements and badges
- **Session**: User sessions for authentication

### Relationships

- Users can create multiple bounties, prompts, and content
- Users can submit to multiple bounties
- Users can connect multiple wallets
- Users can earn multiple badges
- Content can be generated from prompts

## Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (USER, MODERATOR, ADMIN)
- Password hashing with bcrypt
- Session management

### Input Validation
- Zod schema validation for all endpoints
- Type-safe request/response handling
- SQL injection prevention via Prisma

### Rate Limiting
- Configurable rate limiting per IP
- Request counting and reset windows
- Rate limit headers in responses

### CORS & Headers
- CORS configuration for cross-origin requests
- Security headers via Helmet
- Content-Type validation

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `409`: Conflict (resource already exists)
- `429`: Too Many Requests (rate limited)
- `500`: Internal Server Error

## Development

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with sample data
npm run db:seed
```

### Adding New Endpoints

1. Create route file in `app/api/`
2. Add validation schema in `lib/validation.ts`
3. Implement endpoint with proper error handling
4. Add authentication middleware if needed
5. Test with sample data

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` |
| `NEXTAUTH_URL` | NextAuth base URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth secret key | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## Production Deployment

### Database
- Use PostgreSQL or MySQL for production
- Set up proper database backups
- Configure connection pooling

### Environment
- Use strong, unique secrets
- Set up proper CORS origins
- Configure rate limiting for production load

### Security
- Enable HTTPS
- Set up proper firewall rules
- Monitor API usage and errors
- Implement request logging

## Testing

The backend includes comprehensive validation and error handling. For production, consider adding:

- Unit tests for utility functions
- Integration tests for API endpoints
- Load testing for rate limiting
- Security testing for authentication

## Support

For issues or questions:
1. Check the error logs in the console
2. Verify environment variables are set correctly
3. Ensure database is properly initialized
4. Check API documentation for correct request format 