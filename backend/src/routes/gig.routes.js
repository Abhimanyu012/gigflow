import express from 'express';
import { getGigs, getGig, createGig, updateGig, deleteGig, getMyGigs } from '../controllers/index.js';
import { protect, gigValidation } from '../middleware/index.js';

const router = express.Router();

/**
 * @route   GET /api/gigs
 * @desc    Get all open gigs with optional search
 * @access  Public
 */
router.get('/', gigValidation.getAll, getGigs);

/**
 * @route   GET /api/gigs/my-gigs
 * @desc    Get gigs posted by current user
 * @access  Private
 */
router.get('/my-gigs', protect, getMyGigs);

/**
 * @route   GET /api/gigs/:id
 * @desc    Get single gig by ID
 * @access  Public
 */
router.get('/:id', getGig);

/**
 * @route   POST /api/gigs
 * @desc    Create a new gig
 * @access  Private
 */
router.post('/', protect, gigValidation.create, createGig);

/**
 * @route   PUT /api/gigs/:id
 * @desc    Update a gig
 * @access  Private (Owner only)
 */
router.put('/:id', protect, updateGig);

/**
 * @route   DELETE /api/gigs/:id
 * @desc    Delete a gig
 * @access  Private (Owner only)
 */
router.delete('/:id', protect, deleteGig);

export default router;
