import express from 'express';
import { register, login, logout, getMe } from '../controllers/index.js';
import { protect, authValidation } from '../middleware/index.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', authValidation.register, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and set cookie
 * @access  Public
 */
router.post('/login', authValidation.login, login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and clear cookie
 * @access  Private
 */
router.post('/logout', protect, logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private
 */
router.get('/me', protect, getMe);

export default router;
