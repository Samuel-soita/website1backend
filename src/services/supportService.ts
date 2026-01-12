import prisma from '../utils/prisma';
import { SupportFormData } from '../types';
import { SupportStatus, SupportPriority } from '@prisma/client';

export const createSupport = async (data: SupportFormData) => {
  return await prisma.support.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      category: data.category || null,
      priority: SupportPriority.MEDIUM,
      status: SupportStatus.OPEN,
    },
  });
};

export const getSupports = async (page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;
  
  const [supports, total] = await Promise.all([
    prisma.support.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.support.count(),
  ]);

  return {
    supports,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const updateSupportStatus = async (id: string, status: SupportStatus) => {
  return await prisma.support.update({
    where: { id },
    data: { status },
  });
};
