import { Router } from 'express';
import { submitReferral, getAllReferrals } from '../controllers/referralController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// POST /api/referral - Submit referral (public)
router.post('/', submitReferral);

// GET /api/referral - Get all referrals (admin only)
router.get('/', authenticateToken, requireAdmin, getAllReferrals);

export default router;
