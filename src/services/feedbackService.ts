import prisma from '../utils/prisma';
import { FeedbackFormData } from '../types';
import { FeedbackStatus } from '@prisma/client';

export const createFeedback = async (data: FeedbackFormData) => {
  return await prisma.feedback.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      rating: data.rating,
      message: data.message,
      status: FeedbackStatus.NEW,
    },
  });
};

export const getFeedbacks = async (page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;
  
  const [feedbacks, total] = await Promise.all([
    prisma.feedback.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.feedback.count(),
  ]);

  return {
    feedbacks,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getAverageRating = async (): Promise<number> => {
  const result = await prisma.feedback.aggregate({
    _avg: {
      rating: true,
    },
  });

  return result._avg.rating || 0;
};
