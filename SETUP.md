# Backend Setup Instructions

## Prerequisites

1. **Node.js 20+** - Install from [nodejs.org](https://nodejs.org/)
2. **PostgreSQL** - Install from [postgresql.org](https://www.postgresql.org/download/)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd Mainwebsite/backend
npm install
```

### 2. Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE smirror_db;

# Exit psql
\q
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Database (Update with your PostgreSQL credentials)
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/smirror_db?schema=public"

# JWT Configuration (Use a secure random string, minimum 32 characters)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

This will:
- Create all database tables
- Set up the database schema

### 6. (Optional) Create an Admin User

You can create an admin user using Prisma Studio or directly in the database:

```bash
# Open Prisma Studio
npm run prisma:studio

# Then manually create a user, or use this SQL:
```

```sql
-- Hash a password (use bcrypt in your code, this is just an example)
-- Password: admin123 (hash this using bcrypt)
INSERT INTO users (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@smirror.solutions',
  '$2a$10$YourHashedPasswordHere',
  'Admin User',
  'ADMIN',
  NOW(),
  NOW()
);
```

Or create a seed script (recommended):

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@smirror.solutions' },
    update: {},
    create: {
      email: 'admin@smirror.solutions',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Then add to `package.json`:
```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Run: `npx prisma db seed`

### 7. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 8. Verify Setup

Test the health endpoint:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-01-10T...",
  "uptime": 123.456,
  "environment": "development"
}
```

## API Testing

### Test Contact Form Submission

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Test Authentication

Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running:
   ```bash
   # Linux/Mac
   sudo systemctl status postgresql
   
   # Or check if process is running
   ps aux | grep postgres
   ```

2. Verify DATABASE_URL format:
   ```
   postgresql://username:password@host:port/database?schema=public
   ```

3. Test connection:
   ```bash
   psql "postgresql://username:password@localhost:5432/smirror_db"
   ```

### Prisma Issues

1. Reset database (development only):
   ```bash
   npx prisma migrate reset
   ```

2. Regenerate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

3. Format Prisma schema:
   ```bash
   npm run prisma:format
   ```

### TypeScript Errors

1. Clean and rebuild:
   ```bash
   npm run clean
   npm run build
   ```

2. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a secure `JWT_SECRET` (minimum 32 characters, random)
3. Update `DATABASE_URL` with production database
4. Update `FRONTEND_URL` with production frontend URL
5. Build and start:
   ```bash
   npm run build
   npm start
   ```

## Next Steps

- Connect frontend to backend API endpoints
- Set up email notifications (optional)
- Configure file uploads (S3 or local storage)
- Set up monitoring and logging
- Add API documentation (Swagger/OpenAPI)
