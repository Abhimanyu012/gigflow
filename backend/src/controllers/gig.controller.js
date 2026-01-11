import { Gig, GIG_STATUS } from '../models/index.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';

/**
 * @desc    Get all open gigs (with optional search)
 * @route   GET /api/gigs
 * @access  Public
 */
export const getGigs = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;

  // Build query
  const query = { status: GIG_STATUS.OPEN };

  // Add search filter if provided
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // Pagination
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const [gigs, total] = await Promise.all([
    Gig.find(query)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Gig.countDocuments(query),
  ]);

  // Pagination info
  const pagination = {
    currentPage: pageNum,
    totalPages: Math.ceil(total / limitNum),
    totalItems: total,
    itemsPerPage: limitNum,
    hasNextPage: pageNum < Math.ceil(total / limitNum),
    hasPrevPage: pageNum > 1,
  };

  ApiResponse.success(res, { gigs, pagination }, 'Gigs fetched successfully');
});

/**
 * @desc    Get single gig by ID
 * @route   GET /api/gigs/:id
 * @access  Public
 */
export const getGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id)
    .populate('ownerId', 'name email')
    .populate('assignedTo', 'name email')
    .populate({
      path: 'bids',
      populate: {
        path: 'freelancerId',
        select: 'name email',
      },
    });

  if (!gig) {
    throw ApiError.notFound('Gig not found');
  }

  ApiResponse.success(res, { gig }, 'Gig fetched successfully');
});

/**
 * @desc    Create a new gig
 * @route   POST /api/gigs
 * @access  Private
 */
export const createGig = asyncHandler(async (req, res) => {
  const { title, description, budget } = req.body;

  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId: req.user.id,
  });

  // Populate owner info
  await gig.populate('ownerId', 'name email');

  ApiResponse.created(res, { gig }, 'Gig created successfully');
});

/**
 * @desc    Update a gig
 * @route   PUT /api/gigs/:id
 * @access  Private (Owner only)
 */
export const updateGig = asyncHandler(async (req, res) => {
  let gig = await Gig.findById(req.params.id);

  if (!gig) {
    throw ApiError.notFound('Gig not found');
  }

  // Check ownership
  if (gig.ownerId.toString() !== req.user.id) {
    throw ApiError.forbidden('You are not authorized to update this gig');
  }

  // Can't update if already assigned
  if (gig.status === GIG_STATUS.ASSIGNED) {
    throw ApiError.badRequest('Cannot update an assigned gig');
  }

  // Update allowed fields only
  const allowedUpdates = ['title', 'description', 'budget'];
  const updates = {};
  
  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  gig = await Gig.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  }).populate('ownerId', 'name email');

  ApiResponse.success(res, { gig }, 'Gig updated successfully');
});

/**
 * @desc    Delete a gig
 * @route   DELETE /api/gigs/:id
 * @access  Private (Owner only)
 */
export const deleteGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id);

  if (!gig) {
    throw ApiError.notFound('Gig not found');
  }

  // Check ownership
  if (gig.ownerId.toString() !== req.user.id) {
    throw ApiError.forbidden('You are not authorized to delete this gig');
  }

  // Can't delete if already assigned
  if (gig.status === GIG_STATUS.ASSIGNED) {
    throw ApiError.badRequest('Cannot delete an assigned gig');
  }

  await gig.deleteOne();

  ApiResponse.success(res, null, 'Gig deleted successfully');
});

/**
 * @desc    Get gigs posted by current user
 * @route   GET /api/gigs/my-gigs
 * @access  Private
 */
export const getMyGigs = asyncHandler(async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.user.id })
    .populate('ownerId', 'name email')
    .populate({
      path: 'bids',
      populate: {
        path: 'freelancerId',
        select: 'name email',
      },
    })
    .sort({ createdAt: -1 });

  ApiResponse.success(res, { gigs }, 'Your gigs fetched successfully');
});
