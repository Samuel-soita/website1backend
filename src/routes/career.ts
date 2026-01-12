import { Router } from 'express';
import { submitCareer, getAllCareers } from '../controllers/careerController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// POST /api/career - Submit career application (public)
router.post('/', submitCareer);

// GET /api/career - Get all career applications (admin only)
router.get('/', authenticateToken, requireAdmin, getAllCareers);

export default router;
