# Backend GitHub Repository Setup

This repository contains the SMIRROR Solutions backend API built with Express.js, TypeScript, and Prisma.

## Repository Structure

- **Main Branch**: Production-ready code (auto-deploys to production)
- **Development Branch**: Integration branch for features (auto-deploys to development)
- **Feature Branches**: Individual feature development

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js 5
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## CI/CD Pipeline

### Automatic Workflows

1. **On Pull Request**:
   - Sets up PostgreSQL test database
   - Generates Prisma Client
   - Runs Prisma migrations
   - Type checks code
   - Builds application

2. **On Push to `development`**:
   - Runs all checks
   - Builds application
   - Deploys to development environment

3. **On Push to `main`**:
   - Runs all checks and tests
   - Builds application
   - Deploys to production environment

### Manual Deploy

You can trigger manual deployments from the GitHub Actions tab:
- Go to Actions → Manual Backend Deploy
- Select environment (development/production)
- Select branch
- Run workflow

## Required GitHub Secrets

For deployment, add these secrets in GitHub Settings → Secrets:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret (for production)
- `NODE_ENV` - Environment (production/development)

### Local Development Setup

See `SETUP.md` for detailed instructions.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### Contact
- `POST /api/contact` - Submit contact form

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback (admin)

### Support
- `POST /api/support` - Create support ticket
- `GET /api/support` - Get support tickets (admin)

### Referrals
- `POST /api/referrals` - Submit referral
- `GET /api/referrals` - Get referrals (admin)

### Internships
- `POST /api/internships/apply` - Apply for internship
- `GET /api/internships` - Get internship applications (admin)

### Careers
- `POST /api/careers/apply` - Apply for job
- `GET /api/careers` - Get job applications (admin)

## Branch Protection Rules

### Main Branch (Production)
- ✅ Require pull request reviews (minimum 1 approval)
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date
- ✅ Include administrators

### Development Branch
- ✅ Require pull request reviews (minimum 1 approval)
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date

## Workflow

1. Create feature branch from `development`
2. Make changes and push
3. Create Pull Request to `development`
4. Wait for CI checks to pass
5. Get code review approval
6. Merge to `development` (triggers development deployment)
7. When ready, create PR from `development` to `main`
8. Merge to `main` (triggers production deployment)

## Database Migrations

Migrations are handled automatically in CI/CD. For local development:

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy
```

## Troubleshooting

### CI/CD Pipeline Failing

1. Check Actions tab for error details
2. Verify Node.js version (should be 20)
3. Ensure DATABASE_URL is configured for test database
4. Check Prisma schema is valid

### Deployment Issues

1. Verify environment secrets are set correctly
2. Check database connection string
3. Verify all environment variables are set
4. Check deployment logs

## Support

For issues or questions, contact the development team or create an issue in this repository.
