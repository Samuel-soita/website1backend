import { Request, Response } from 'express';
import { createReferral, getReferrals, updateReferralStatus } from '../services/referralService';
import { validateRequired, validateEmail, validatePhone } from '../utils/validation';
import { ReferralFormData } from '../types';

export const submitReferral = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ReferralFormData = req.body;

    // Validate required fields
    const requiredError = validateRequired(data, ['referrerName', 'referrerEmail']);
    if (requiredError) {
      res.status(400).json({
        success: false,
        error: requiredError,
      });
      return;
    }

    // Validate email
    const emailError = validateEmail(data.referrerEmail);
    if (emailError) {
      res.status(400).json({
        success: false,
        error: emailError,
      });
      return;
    }

    // Validate client email if provided
    if (data.clientEmail) {
      const clientEmailError = validateEmail(data.clientEmail);
      if (clientEmailError) {
        res.status(400).json({
          success: false,
          error: `Client ${clientEmailError}`,
        });
        return;
      }
    }

    const referral = await createReferral(data);

    res.status(201).json({
      success: true,
      message: 'Thank you for your referral! We appreciate your support.',
      data: { id: referral.id },
    });
  } catch (error: any) {
    console.error('Referral submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit referral. Please try again.',
    });
  }
};

export const getAllReferrals = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await getReferrals(page, limit);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Get referrals error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch referrals.',
    });
  }
};
