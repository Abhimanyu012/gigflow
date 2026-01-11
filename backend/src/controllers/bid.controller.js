import mongoose from 'mongoose';
import { Bid, Gig, BID_STATUS, GIG_STATUS } from '../models/index.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';

/**
 * @desc    Submit a bid for a gig
 * @route   POST /api/bids
 * @access  Private
 */
export const createBid = asyncHandler(async (req, res) => {
  const { gigId, message, price } = req.body;
  const freelancerId = req.user.id;

  // Find the gig
  const gig = await Gig.findById(gigId);

  if (!gig) {
    throw ApiError.notFound('Gig not found');
  }

  // Check if gig is still open
  if (gig.status !== GIG_STATUS.OPEN) {
    throw ApiError.badRequest('This gig is no longer accepting bids');
  }

  // Check if user is trying to bid on their own gig
  if (gig.ownerId.toString() === freelancerId) {
    throw ApiError.badRequest('You cannot bid on your own gig');
  }

  // Check if user has already submitted a bid
  const existingBid = await Bid.findOne({ gigId, freelancerId });
  if (existingBid) {
    throw ApiError.conflict('You have already submitted a bid for this gig');
  }

  // Create bid
  const bid = await Bid.create({
    gigId,
    freelancerId,
    message,
    price,
  });

  // Populate freelancer info
  await bid.populate('freelancerId', 'name email');

  ApiResponse.created(res, { bid }, 'Bid submitted successfully');
});

/**
 * @desc    Get all bids for a specific gig (Owner only)
 * @route   GET /api/bids/:gigId
 * @access  Private (Gig owner only)
 */
export const getBidsByGig = asyncHandler(async (req, res) => {
  const { gigId } = req.params;

  // Find the gig
  const gig = await Gig.findById(gigId);

  if (!gig) {
    throw ApiError.notFound('Gig not found');
  }

  // Check if user is the gig owner
  if (gig.ownerId.toString() !== req.user.id) {
    throw ApiError.forbidden('Only the gig owner can view bids');
  }

  // Get all bids for this gig
  const bids = await Bid.find({ gigId })
    .populate('freelancerId', 'name email')
    .sort({ createdAt: -1 });

  ApiResponse.success(res, { bids, gigId }, 'Bids fetched successfully');
});

/**
 * @desc    Hire a freelancer (Accept a bid)
 * @route   PATCH /api/bids/:bidId/hire
 * @access  Private (Gig owner only)
 * 
 * Operations:
 * 1. Updates gig status to 'assigned'
 * 2. Updates chosen bid status to 'hired'
 * 3. Rejects all other bids for the same gig
 */
export const hireBid = asyncHandler(async (req, res) => {
  const { bidId } = req.params;

  // Find the bid
  const bid = await Bid.findById(bidId);

  if (!bid) {
    throw ApiError.notFound('Bid not found');
  }

  // Check if bid is still pending
  if (bid.status !== BID_STATUS.PENDING) {
    throw ApiError.badRequest('This bid has already been processed');
  }

  // Find the associated gig
  const gig = await Gig.findById(bid.gigId);

  if (!gig) {
    throw ApiError.notFound('Associated gig not found');
  }

  // Check if user is the gig owner
  if (gig.ownerId.toString() !== req.user.id) {
    throw ApiError.forbidden('Only the gig owner can hire freelancers');
  }

  // Check if gig is still open
  if (gig.status !== GIG_STATUS.OPEN) {
    throw ApiError.badRequest('This gig has already been assigned');
  }

  // 1. Update gig status to assigned
  await Gig.findByIdAndUpdate(gig._id, {
    status: GIG_STATUS.ASSIGNED,
    assignedTo: bid.freelancerId,
  });

  // 2. Update chosen bid status to hired
  await Bid.findByIdAndUpdate(bidId, { status: BID_STATUS.HIRED });

  // 3. Reject all other bids for this gig
  await Bid.updateMany(
    {
      gigId: gig._id,
      _id: { $ne: bidId },
      status: BID_STATUS.PENDING,
    },
    { status: BID_STATUS.REJECTED }
  );

  // Fetch updated data for response
  const updatedBid = await Bid.findById(bidId).populate('freelancerId', 'name email');
  const updatedGig = await Gig.findById(gig._id)
    .populate('ownerId', 'name email')
    .populate('assignedTo', 'name email');

  ApiResponse.success(
    res,
    {
      bid: updatedBid,
      gig: updatedGig,
    },
    'Freelancer hired successfully'
  );
});

/**
 * @desc    Get bids submitted by current user
 * @route   GET /api/bids/my-bids
 * @access  Private
 */
export const getMyBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ freelancerId: req.user.id })
    .populate({
      path: 'gigId',
      select: 'title description budget status ownerId',
      populate: {
        path: 'ownerId',
        select: 'name email',
      },
    })
    .sort({ createdAt: -1 });

  ApiResponse.success(res, { bids }, 'Your bids fetched successfully');
});

/**
 * @desc    Withdraw a bid
 * @route   DELETE /api/bids/:bidId
 * @access  Private (Freelancer who submitted the bid)
 */
export const withdrawBid = asyncHandler(async (req, res) => {
  const { bidId } = req.params;

  const bid = await Bid.findById(bidId);

  if (!bid) {
    throw ApiError.notFound('Bid not found');
  }

  // Check ownership
  if (bid.freelancerId._id.toString() !== req.user.id) {
    throw ApiError.forbidden('You can only withdraw your own bids');
  }

  // Can only withdraw pending bids
  if (bid.status !== BID_STATUS.PENDING) {
    throw ApiError.badRequest('Cannot withdraw a processed bid');
  }

  await bid.deleteOne();

  ApiResponse.success(res, null, 'Bid withdrawn successfully');
});
