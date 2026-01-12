import { Request, Response } from 'express';
import { createContact, getContacts, updateContactStatus } from '../services/contactService';
import { validateRequired, validateEmail, validatePhone } from '../utils/validation';
import { ContactFormData } from '../types';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ContactFormData = req.body;

    // Validate required fields
    const requiredError = validateRequired(data, ['name', 'email', 'message']);
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

    // Validate phone if provided
    if (data.phone) {
      const phoneError = validatePhone(data.phone);
      if (phoneError) {
        res.status(400).json({
          success: false,
          error: phoneError,
        });
        return;
      }
    }

    const contact = await createContact(data);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We\'ll get back to you within 24 hours!',
      data: { id: contact.id },
    });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form. Please try again.',
    });
  }
};

export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await getContacts(page, limit);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts.',
    });
  }
};

export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !id) {
      res.status(400).json({
        success: false,
        error: 'Status and ID are required',
      });
      return;
    }

    const contact = await updateContactStatus(id, status);

    res.json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact.',
    });
  }
};
