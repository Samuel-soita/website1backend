import prisma from '../utils/prisma';
import { ContactFormData } from '../types';
import { ContactStatus } from '@prisma/client';

export const createContact = async (data: ContactFormData) => {
  return await prisma.contact.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      message: data.message,
      service: data.service || null,
      budget: data.budget || null,
      status: ContactStatus.NEW,
    },
  });
};

export const getContacts = async (page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;
  
  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.contact.count(),
  ]);

  return {
    contacts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const updateContactStatus = async (id: string, status: ContactStatus) => {
  return await prisma.contact.update({
    where: { id },
    data: { status },
  });
};
