import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();
const prisma = new PrismaClient();

// Create a new project inquiry
router.post('/inquiry', async (req, res, next) => {
    try {
        const {
            clientName,
            clientEmail,
            companyName,
            projectType,
            budgetRange,
            timeline,
            description,
            techPreferences
        } = req.body;

        if (!clientName || !clientEmail || !projectType || !description) {
            return next(new AppError('Missing required fields', 400));
        }

        const inquiry = await prisma.projectInquiry.create({
            data: {
                clientName,
                clientEmail,
                companyName,
                projectType,
                budgetRange,
                timeline,
                description,
                techPreferences: JSON.stringify(techPreferences),
                status: 'NEW'
            }
        });

        res.status(201).json({
            status: 'success',
            data: {
                inquiry
            }
        });
    } catch (error) {
        next(error);
    }
});

// Get all inquiries (Admin only - protected route placeholder)
router.get('/', async (req, res, next) => {
    try {
        const inquiries = await prisma.projectInquiry.findMany({
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({
            status: 'success',
            results: inquiries.length,
            data: {
                inquiries
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
