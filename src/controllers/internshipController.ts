import { Request, Response } from 'express';
import { createInternship, getInternships, updateInternshipStatus } from '../services/internshipService';
import { validateRequired, validateEmail, validatePhone } from '../utils/validation';
import { InternshipFormData } from '../types';

export const submitInternship = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: InternshipFormData = req.body;

    // Validate required fields
    const requiredError = validateRequired(data, ['firstName', 'lastName', 'email', 'phone', 'motivation']);
    if (requiredError) {
      res.status(400).json({
        success: false,
        error: requiredError,
      });
      return;
    }

    // Validate email
    const emailError = validateEmail(data.email);
    if (emailError) {
      res.status(400).json({
        success: false,
        error: emailError,
      });
      return;
    }

    // Validate phone
    const phoneError = validatePhone(data.phone);
    if (phoneError) {
      res.status(400).json({
        success: false,
        error: phoneError,
      });
      return;
    }

    const internship = await createInternship(data);

    res.status(201).json({
      success: true,
      message: 'Your internship application has been received. We\'ll review it and get back to you soon!',
      data: { id: internship.id },
    });
  } catch (error: any) {
    console.error('Internship submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit internship application. Please try again.',
    });
  }
};

export const getAllInternships = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await getInternships(page, limit);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Get internships error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch internship applications.',
    });
  }
};
