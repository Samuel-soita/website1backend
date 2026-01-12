import prisma from '../utils/prisma';
import { InternshipFormData } from '../types';
import { InternshipStatus } from '@prisma/client';

export const createInternship = async (data: InternshipFormData) => {
  return await prisma.internship.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      university: data.university || null,
      course: data.course || null,
      yearOfStudy: data.yearOfStudy || null,
      skills: data.skills || null,
      motivation: data.motivation,
      portfolioUrl: data.portfolioUrl || null,
      resumeUrl: data.resumeUrl || null,
      status: InternshipStatus.PENDING,
    },
  });
};

export const getInternships = async (page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;
  
  const [internships, total] = await Promise.all([
    prisma.internship.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.internship.count(),
  ]);

  return {
    internships,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const updateInternshipStatus = async (id: string, status: InternshipStatus) => {
  return await prisma.internship.update({
    where: { id },
    data: { status },
  });
};
