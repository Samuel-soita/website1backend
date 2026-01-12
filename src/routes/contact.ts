import { Router } from 'express';
import { submitContact, getAllContacts, updateContact } from '../controllers/contactController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// POST /api/contact - Submit contact form (public)
router.post('/', submitContact);

// GET /api/contact - Get all contacts (admin only)
router.get('/', authenticateToken, requireAdmin, getAllContacts);

// PATCH /api/contact/:id - Update contact status (admin only)
router.patch('/:id', authenticateToken, requireAdmin, updateContact);

export default router;