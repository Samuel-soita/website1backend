import { Request, Response } from 'express';
import { createCareer, getCareers, updateCareerStatus } from '../services/careerService';
import { validateRequired, validateEmail, validatePhone } from '../utils/validation';
import { CareerFormData } from '../types';

export const submitCareer = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: CareerFormData = req.body;

    // Validate required fields
    const requiredError = validateRequired(data, ['position', 'firstName', 'lastName', 'email', 'phone']);
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

    const career = await createCareer(data);

    res.status(201).json({
      success: true,
      message: 'Your career application has been received. We\'ll review it and contact you soon!',
      data: { id: career.id },
    });
  } catch (error: any) {
    console.error('Career submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit career application. Please try again.',
    });
  }
};

export const getAllCareers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await getCareers(page, limit);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Get careers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch career applications.',
    });
  }
};
