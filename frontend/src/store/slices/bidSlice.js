import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bidService } from '../../services';

const initialState = {
  bids: [],
  myBids: [],
  isLoading: false,
  error: null,
};

// Create bid
export const createBid = createAsyncThunk(
  'bids/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await bidService.createBid(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit bid');
    }
  }
);

// Get bids by gig
export const getBidsByGig = createAsyncThunk(
  'bids/getByGig',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await bidService.getBidsByGig(gigId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bids');
    }
  }
);

// Get my bids
export const getMyBids = createAsyncThunk(
  'bids/getMine',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bidService.getMyBids();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your bids');
    }
  }
);

// Hire bid
export const hireBid = createAsyncThunk(
  'bids/hire',
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await bidService.hireBid(bidId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to hire freelancer');
    }
  }
);

// Withdraw bid
export const withdrawBid = createAsyncThunk(
  'bids/withdraw',
  async (bidId, { rejectWithValue }) => {
    try {
      await bidService.withdrawBid(bidId);
      return bidId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to withdraw bid');
    }
  }
);

const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBids: (state) => {
      state.bids = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create bid
      .addCase(createBid.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bids.push(action.payload.bid);
      })
      .addCase(createBid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get bids by gig
      .addCase(getBidsByGig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBidsByGig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bids = action.payload.bids;
      })
      .addCase(getBidsByGig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get my bids
      .addCase(getMyBids.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyBids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBids = action.payload.bids;
      })
      .addCase(getMyBids.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Hire bid
      .addCase(hireBid.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(hireBid.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the hired bid
        const index = state.bids.findIndex((b) => b._id === action.payload.bid._id);
        if (index !== -1) {
          state.bids[index] = action.payload.bid;
        }
        // Update other bids to rejected
        state.bids = state.bids.map((bid) => {
          if (bid._id !== action.payload.bid._id && bid.status === 'pending') {
            return { ...bid, status: 'rejected' };
          }
          return bid;
        });
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Withdraw bid
      .addCase(withdrawBid.fulfilled, (state, action) => {
        state.myBids = state.myBids.filter((b) => b._id !== action.payload);
        state.bids = state.bids.filter((b) => b._id !== action.payload);
      });
  },
});

export const { clearError, clearBids } = bidSlice.actions;
export { getMyBids as fetchMyBids };
export default bidSlice.reducer;
