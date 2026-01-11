import express from 'express';
import { createBid, getBidsByGig, hireBid, getMyBids, withdrawBid } from '../controllers/index.js';
import { protect, bidValidation } from '../middleware/index.js';

const router = express.Router();

/**
 * @route   POST /api/bids
 * @desc    Submit a bid for a gig
 * @access  Private
 */
router.post('/', protect, bidValidation.create, createBid);

/**
 * @route   GET /api/bids/my-bids
 * @desc    Get bids submitted by current user
 * @access  Private
 */
router.get('/my-bids', protect, getMyBids);

/**
 * @route   GET /api/bids/:gigId
 * @desc    Get all bids for a specific gig (Owner only)
 * @access  Private
 */
router.get('/:gigId', protect, bidValidation.getByGig, getBidsByGig);

/**
 * @route   PATCH /api/bids/:bidId/hire
 * @desc    Hire a freelancer (Accept a bid) - Atomic operation
 * @access  Private (Gig owner only)
 */
router.patch('/:bidId/hire', protect, bidValidation.hire, hireBid);

/**
 * @route   DELETE /api/bids/:bidId
 * @desc    Withdraw a bid
 * @access  Private (Freelancer who submitted the bid)
 */
router.delete('/:bidId', protect, withdrawBid);

export default router;
