import { Request, Response } from 'express';
import { createFeedback, getFeedbacks, getAverageRating } from '../services/feedbackService';
import { validateRequired, validateEmail, validateRating } from '../utils/validation';
import { FeedbackFormData } from '../types';

export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: FeedbackFormData = req.body;

    // Validate required fields
    const requiredError = validateRequired(data, ['name', 'email', 'rating', 'message']);
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

    // Validate rating
    const ratingError = validateRating(data.rating);
    if (ratingError) {
      res.status(400).json({
        success: false,
        error: ratingError,
      });
      return;
    }

    const feedback = await createFeedback(data);

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! It helps us improve.',
      data: { id: feedback.id },
    });
  } catch (error: any) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit feedback. Please try again.',
    });
  }
};

export const getAllFeedbacks = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await getFeedbacks(page, limit);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Get feedbacks error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feedbacks.',
    });
  }
};

export const getRating = async (req: Request, res: Response): Promise<void> => {
  try {
    const averageRating = await getAverageRating();

    res.json({
      success: true,
      data: { averageRating },
    });
  } catch (error: any) {
    console.error('Get rating error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch average rating.',
    });
  }
};
