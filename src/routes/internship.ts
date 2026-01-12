import { Router } from 'express';
import { submitInternship, getAllInternships } from '../controllers/internshipController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// POST /api/internship - Submit internship application (public)
router.post('/', submitInternship);

// GET /api/internship - Get all internship applications (admin only)
router.get('/', authenticateToken, requireAdmin, getAllInternships);

export default router;
