import { Router } from 'express';
import { submitFeedback, getAllFeedbacks, getRating } from '../controllers/feedbackController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// POST /api/feedback - Submit feedback (public)
router.post('/', submitFeedback);

// GET /api/feedback/rating - Get average rating (public)
router.get('/rating', getRating);

// GET /api/feedback - Get all feedbacks (admin only)
router.get('/', authenticateToken, requireAdmin, getAllFeedbacks);

export default router;
