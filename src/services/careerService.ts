import prisma from '../utils/prisma';
import { CareerFormData } from '../types';
import { CareerStatus } from '@prisma/client';

export const createCareer = async (data: CareerFormData) => {
  return await prisma.career.create({
    data: {
      position: data.position,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      experience: data.experience || null,
      skills: data.skills || null,
      coverLetter: data.coverLetter || null,
      resumeUrl: data.resumeUrl || null,
      portfolioUrl: data.portfolioUrl || null,
      status: CareerStatus.PENDING,
    },
  });
};

export const getCareers = async (page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;
  
  const [careers, total] = await Promise.all([
    prisma.career.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.career.count(),
  ]);

  return {
    careers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const updateCareerStatus = async (id: string, status: CareerStatus) => {
  return await prisma.career.update({
    where: { id },
    data: { status },
  });
};
