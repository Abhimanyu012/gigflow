import mongoose from 'mongoose';

export const BID_STATUS = {
  PENDING: 'pending',
  HIRED: 'hired',
  REJECTED: 'rejected',
};

const bidSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gig',
      required: [true, 'Bid must be associated with a gig'],
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Bid must have a freelancer'],
    },
    message: {
      type: String,
      required: [true, 'Please provide a message with your bid'],
      trim: true,
      maxlength: [1000, 'Message cannot be more than 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide your bid price'],
      min: [1, 'Price must be at least 1'],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(BID_STATUS),
        message: 'Status must be pending, hired, or rejected',
      },
      default: BID_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true }); // One bid per user per gig
bidSchema.index({ gigId: 1 });
bidSchema.index({ freelancerId: 1 });
bidSchema.index({ status: 1 });

// Populate freelancer on find
bidSchema.pre(/^find/, function (next) {
  // Only populate if not explicitly disabled
  if (this.options._skipPopulate) {
    return next();
  }
  this.populate('freelancerId', 'name email');
  next();
});

// Static method to reject all other bids for a gig
bidSchema.statics.rejectOtherBids = async function (gigId, hiredBidId) {
  return this.updateMany(
    {
      gigId,
      _id: { $ne: hiredBidId },
      status: BID_STATUS.PENDING,
    },
    { status: BID_STATUS.REJECTED }
  );
};

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
