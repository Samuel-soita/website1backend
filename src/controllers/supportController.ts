import { Request, Response } from 'express';
import { createSupport, getSupports, updateSupportStatus } from '../services/supportService';
import { validateRequired, validateEmail } from '../utils/validation';
import { SupportFormData } from '../types';

export const submitSupport = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: SupportFormData = req.body;

    // Validate required fields
    const requiredError = validateRequired(data, ['name', 'email', 'subject', 'message']);
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

    const support = await createSupport(data);

    res.status(201).json({
      success: true,
      message: 'Your support request has been received. We\'ll respond within 24 hours.',
      data: { id: support.id },
    });
  } catch (error: any) {
    console.error('Support submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit support request. Please try again.',
    });
  }
};

export const getAllSupports = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await getSupports(page, limit);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Get supports error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch support requests.',
    });
  }
};
