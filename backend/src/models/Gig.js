import mongoose from 'mongoose';

export const GIG_STATUS = {
  OPEN: 'open',
  ASSIGNED: 'assigned',
};

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a gig title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a gig description'],
      trim: true,
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    budget: {
      type: Number,
      required: [true, 'Please provide a budget'],
      min: [1, 'Budget must be at least 1'],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Gig must have an owner'],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(GIG_STATUS),
        message: 'Status must be either open or assigned',
      },
      default: GIG_STATUS.OPEN,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
gigSchema.index({ status: 1 });
gigSchema.index({ ownerId: 1 });
gigSchema.index({ title: 'text', description: 'text' }); // Text search index
gigSchema.index({ createdAt: -1 });

// Virtual for bids on this gig
gigSchema.virtual('bids', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'gigId',
  justOne: false,
});

// Virtual for bid count
gigSchema.virtual('bidCount', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'gigId',
  count: true,
});

// Static method to get open gigs
gigSchema.statics.findOpenGigs = function (searchQuery = '') {
  const query = { status: GIG_STATUS.OPEN };
  
  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { description: { $regex: searchQuery, $options: 'i' } },
    ];
  }
  
  return this.find(query)
    .populate('ownerId', 'name email')
    .sort({ createdAt: -1 });
};

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;
