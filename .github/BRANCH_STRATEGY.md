# Branch Strategy

This repository follows the same Git Flow branching strategy as the frontend:

## Main Branches

### `main` (Production)
- **Purpose**: Production-ready backend code
- **Protection**: Fully protected, requires PR and approvals
- **Deployment**: Auto-deploys to production on push
- **Merge**: Only from `development` via Pull Request

### `development` (Staging/Development)
- **Purpose**: Integration branch for backend features
- **Protection**: Protected from direct pushes
- **Deployment**: Auto-deploys to development/preview environment
- **Merge**: From feature branches via Pull Request

## Feature Branches

### Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical production fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Examples:
- `feature/add-auth-endpoint`
- `bugfix/fix-database-connection`
- `hotfix/fix-security-vulnerability`
- `refactor/improve-error-handling`
- `docs/update-api-documentation`

## Workflow

### Creating a Feature Branch

1. Start from `development`:
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: add new API endpoint"
   ```

3. Push to remote:
   ```bash
   git push origin feature/your-feature-name
   ```

### Creating a Pull Request

1. Push your feature branch to remote
2. Create a Pull Request on GitHub:
   - From: `feature/your-feature-name`
   - To: `development` (for features)
   - To: `main` (only for hotfixes or releases)

3. Wait for CI/CD pipeline to run and pass
4. Get code review approval
5. Merge PR (squash and merge recommended)

### Merging to Production

1. Create PR from `development` to `main`
2. Get approvals and ensure all tests pass
3. Merge to `main`
4. Production deployment triggers automatically

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
- `feat: add user authentication endpoint`
- `fix: resolve database connection pool issue`
- `docs: update API documentation`
- `refactor: improve service layer structure`

## CI/CD Pipeline

### Automatic Checks on PR:
1. Setup PostgreSQL test database
2. Generate Prisma Client
3. Run Prisma migrations
4. Type check code
5. Build application

### Automatic Deployment:
- **Push to `development`** → Deploy to development environment
- **Push to `main`** → Deploy to production environment

## Environment Variables

Make sure to configure the following secrets in GitHub:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Environment (production/development)

## Database Migrations

1. Create migration:
   ```bash
   npx prisma migrate dev --name migration_name
   ```

2. Commit migration files:
   ```bash
   git add prisma/migrations
   git commit -m "chore: add database migration"
   ```

3. Migrations run automatically in CI/CD pipeline
