import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { validateRequired, validateEmail } from '../utils/validation';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    const requiredError = validateRequired({ email, password, name }, ['email', 'password', 'name']);
    if (requiredError) {
      res.status(400).json({
        success: false,
        error: requiredError,
      });
      return;
    }

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      res.status(400).json({
        success: false,
        error: emailError,
      });
      return;
    }

    // Validate password length
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long',
      });
      return;
    }

    const result = await registerUser(email, password, name);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Registration failed',
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    const requiredError = validateRequired({ email, password }, ['email', 'password']);
    if (requiredError) {
      res.status(400).json({
        success: false,
        error: requiredError,
      });
      return;
    }

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      res.status(400).json({
        success: false,
        error: emailError,
      });
      return;
    }

    const result = await loginUser(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(401).json({
      success: false,
      error: error.message || 'Invalid email or password',
    });
  }
};
