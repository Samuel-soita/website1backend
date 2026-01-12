import { Router } from 'express';
import { submitSupport, getAllSupports } from '../controllers/supportController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// POST /api/support - Submit support request (public)
router.post('/', submitSupport);

// GET /api/support - Get all support requests (admin only)
router.get('/', authenticateToken, requireAdmin, getAllSupports);

export default router;
