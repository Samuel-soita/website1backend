// Type definitions for SMIRROR Solutions Backend

export interface UserPayload {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
  budget?: string;
}

export interface ReferralFormData {
  referrerName: string;
  referrerEmail: string;
  referrerPhone?: string;
  companyName?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  message?: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  rating: number;
  message: string;
}

export interface SupportFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category?: string;
}

export interface InternshipFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university?: string;
  course?: string;
  yearOfStudy?: string;
  skills?: string;
  motivation: string;
  portfolioUrl?: string;
  resumeUrl?: string;
}

export interface CareerFormData {
  position: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience?: string;
  skills?: string;
  coverLetter?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
