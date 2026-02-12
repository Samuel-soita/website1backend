import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Routes
import authRoutes from './routes/auth';
import contactRoutes from './routes/contact';
import referralRoutes from './routes/referral';
import feedbackRoutes from './routes/feedback';
import supportRoutes from './routes/support';
import internshipRoutes from './routes/internship';
import careerRoutes from './routes/career';
import projectRoutes from './routes/project';
import collaboratorRoutes from './routes/collaborator';

// Middleware
import { errorHandler, AppError } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/collaborator', collaboratorRoutes);

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'SMIRROR Solutions API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      contact: '/api/contact',
      referral: '/api/referral',
      feedback: '/api/feedback',
      support: '/api/support',
      internship: '/api/internship',
      career: '/api/career',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError('Route not found', 404));
});

// Error handling middleware (must be last)
app.use(errorHandler as express.ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`🚀 SMIRROR Solutions API server running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});