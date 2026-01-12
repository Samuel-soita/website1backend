import prisma from '../utils/prisma';
import { ReferralFormData } from '../types';
import { ReferralStatus } from '@prisma/client';

export const createReferral = async (data: ReferralFormData) => {
  return await prisma.referral.create({
    data: {
      referrerName: data.referrerName,
      referrerEmail: data.referrerEmail,
      referrerPhone: data.referrerPhone || null,
      companyName: data.companyName || null,
      clientName: data.clientName || null,
      clientEmail: data.clientEmail || null,
      clientPhone: data.clientPhone || null,
      message: data.message || null,
      status: ReferralStatus.PENDING,
    },
  });
};

export const getReferrals = async (page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;
  
  const [referrals, total] = await Promise.all([
    prisma.referral.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.referral.count(),
  ]);

  return {
    referrals,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const updateReferralStatus = async (id: string, status: ReferralStatus) => {
  return await prisma.referral.update({
    where: { id },
    data: { status },
  });
};
