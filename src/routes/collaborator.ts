import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();
const prisma = new PrismaClient();

// Submit a collaborator application
router.post('/join', async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            role,
            portfolioUrl,
            linkedinUrl,
            rate,
            availability,
            skills,
            experienceYears,
            bio
        } = req.body;

        if (!firstName || !lastName || !email || !role || !portfolioUrl || !skills) {
            return next(new AppError('Missing required fields', 400));
        }

        // Check if email already exists
        const existing = await prisma.collaboratorApplication.findUnique({
            where: { email }
        });

        if (existing) {
            return next(new AppError('Application with this email already exists', 400));
        }

        const application = await prisma.collaboratorApplication.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                role,
                portfolioUrl,
                linkedinUrl,
                rate,
                availability,
                skills: JSON.stringify(skills),
                experienceYears: Number(experienceYears),
                bio,
                status: 'PENDING'
            }
        });

        res.status(201).json({
            status: 'success',
            data: {
                application
            }
        });
    } catch (error) {
        next(error);
    }
});

// Get all applications (Admin only)
router.get('/', async (req, res, next) => {
    try {
        const applications = await prisma.collaboratorApplication.findMany({
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({
            status: 'success',
            results: applications.length,
            data: {
                applications
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
