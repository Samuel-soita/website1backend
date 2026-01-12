# SMIRROR Solutions Backend API

Complete TypeScript backend API for SMIRROR Solutions web development company.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up PostgreSQL database:**
   - Install PostgreSQL (if not already installed)
   - Create a database:
     ```sql
     CREATE DATABASE smirror_db;
     ```

4. **Set up Prisma:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```

6. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
src/
├── controllers/     # Route controllers (business logic)
│   ├── authController.ts
│   ├── contactController.ts
│   ├── referralController.ts
│   ├── feedbackController.ts
│   ├── supportController.ts
│   ├── internshipController.ts
│   └── careerController.ts
├── routes/          # API route definitions
│   ├── auth.ts
│   ├── contact.ts
│   ├── referral.ts
│   ├── feedback.ts
│   ├── support.ts
│   ├── internship.ts
│   └── career.ts
├── services/        # Business logic services
│   ├── authService.ts
│   ├── contactService.ts
│   ├── referralService.ts
│   ├── feedbackService.ts
│   ├── supportService.ts
│   ├── internshipService.ts
│   └── careerService.ts
├── middleware/      # Custom middleware
│   ├── auth.ts
│   └── errorHandler.ts
├── utils/           # Helper functions
│   ├── prisma.ts
│   ├── jwt.ts
│   └── validation.ts
├── types/           # TypeScript type definitions
│   └── index.ts
└── server.ts        # Express server setup
```

## 🛠️ Tech Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Helmet, CORS, Rate Limiting
- **Validation:** Custom validation utilities

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all contacts (admin only)
- `PATCH /api/contact/:id` - Update contact status (admin only)

### Referral
- `POST /api/referral` - Submit referral (public)
- `GET /api/referral` - Get all referrals (admin only)

### Feedback
- `POST /api/feedback` - Submit feedback (public)
- `GET /api/feedback/rating` - Get average rating (public)
- `GET /api/feedback` - Get all feedbacks (admin only)

### Support
- `POST /api/support` - Submit support request (public)
- `GET /api/support` - Get all support requests (admin only)

### Internship
- `POST /api/internship` - Submit internship application (public)
- `GET /api/internship` - Get all applications (admin only)

### Career
- `POST /api/career` - Submit career application (public)
- `GET /api/career` - Get all applications (admin only)

### Utility
- `GET /health` - Health check endpoint
- `GET /api` - API information endpoint

## 🔒 Environment Variables

Required environment variables (see `.env.example`):

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/smirror_db
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📝 Database Schema

The Prisma schema includes the following models:
- **User** - Authentication and authorization
- **Contact** - Contact form submissions
- **Referral** - Referral submissions
- **Feedback** - Customer feedback with ratings
- **Support** - Support ticket system
- **Internship** - Internship applications
- **Career** - Career/Job applications

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:
1. Register/Login to get a token
2. Include token in Authorization header: `Bearer <token>`
3. Protected routes require valid token
4. Admin routes require ADMIN or SUPER_ADMIN role

## 🛡️ Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing (configurable)
- **Rate Limiting** - Prevents abuse (100 requests per 15 minutes)
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Comprehensive validation on all inputs
- **Error Handling** - Proper error handling and logging

## 📊 Features

- ✅ Full CRUD operations for all entities
- ✅ Pagination support
- ✅ JWT authentication & authorization
- ✅ Role-based access control (USER, ADMIN, SUPER_ADMIN)
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting
- ✅ Health check endpoint
- ✅ TypeScript strict mode
- ✅ Prisma ORM for database operations

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Remove build directory

## 🗄️ Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database (development only)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio

# Format Prisma schema
npx prisma format
```

## 🧪 Testing

Run tests (when implemented):
```bash
npm test
```

## 📝 Development Notes

- TypeScript strict mode enabled
- All routes include proper error handling
- Comprehensive validation on all inputs
- Admin routes protected with middleware
- Rate limiting applied to all API routes
- Environment-based configuration

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Update database connection string
3. Set secure `JWT_SECRET` (minimum 32 characters)
4. Configure CORS with production frontend URL
5. Build and start:
   ```bash
   npm run build
   npm start
   ```

## 📞 Support

For issues or questions, contact the development team.
