import { body, param, query, validationResult } from 'express-validator';
import { ApiError } from '../utils/index.js';

/**
 * Validation result handler middleware
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    throw ApiError.badRequest(errorMessages.join('. '));
  }
  next();
};

/**
 * Auth validation rules
 */
export const authValidation = {
  register: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 50 })
      .withMessage('Name cannot be more than 50 characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    validate,
  ],
  login: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
  ],
};

/**
 * Gig validation rules
 */
export const gigValidation = {
  create: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 100 })
      .withMessage('Title cannot be more than 100 characters'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ max: 2000 })
      .withMessage('Description cannot be more than 2000 characters'),
    body('budget')
      .notEmpty()
      .withMessage('Budget is required')
      .isFloat({ min: 1 })
      .withMessage('Budget must be at least 1'),
    validate,
  ],
  getAll: [
    query('search')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Search query too long'),
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
    validate,
  ],
};

/**
 * Bid validation rules
 */
export const bidValidation = {
  create: [
    body('gigId')
      .notEmpty()
      .withMessage('Gig ID is required')
      .isMongoId()
      .withMessage('Invalid Gig ID'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ max: 1000 })
      .withMessage('Message cannot be more than 1000 characters'),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isFloat({ min: 1 })
      .withMessage('Price must be at least 1'),
    validate,
  ],
  getByGig: [
    param('gigId').isMongoId().withMessage('Invalid Gig ID'),
    validate,
  ],
  hire: [
    param('bidId').isMongoId().withMessage('Invalid Bid ID'),
    validate,
  ],
};
