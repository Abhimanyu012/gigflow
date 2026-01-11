import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gigService } from '../../services';

const initialState = {
  gigs: [],
  myGigs: [],
  currentGig: null,
  pagination: null,
  isLoading: false,
  error: null,
};

// Get all gigs
export const getGigs = createAsyncThunk(
  'gigs/getAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await gigService.getGigs(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch gigs');
    }
  }
);

// Get single gig
export const getGig = createAsyncThunk(
  'gigs/getOne',
  async (id, { rejectWithValue }) => {
    try {
      const response = await gigService.getGig(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch gig');
    }
  }
);

// Create gig
export const createGig = createAsyncThunk(
  'gigs/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await gigService.createGig(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create gig');
    }
  }
);

// Update gig
export const updateGig = createAsyncThunk(
  'gigs/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await gigService.updateGig(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update gig');
    }
  }
);

// Delete gig
export const deleteGig = createAsyncThunk(
  'gigs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await gigService.deleteGig(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete gig');
    }
  }
);

// Get my gigs
export const getMyGigs = createAsyncThunk(
  'gigs/getMine',
  async (_, { rejectWithValue }) => {
    try {
      const response = await gigService.getMyGigs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your gigs');
    }
  }
);

const gigSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentGig: (state) => {
      state.currentGig = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all gigs
      .addCase(getGigs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGigs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gigs = action.payload.gigs;
        state.pagination = action.payload.pagination;
      })
      .addCase(getGigs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get single gig
      .addCase(getGig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGig = action.payload.gig;
      })
      .addCase(getGig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create gig
      .addCase(createGig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gigs.unshift(action.payload.gig);
        state.myGigs.unshift(action.payload.gig);
      })
      .addCase(createGig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update gig
      .addCase(updateGig.fulfilled, (state, action) => {
        const index = state.gigs.findIndex((g) => g._id === action.payload.gig._id);
        if (index !== -1) {
          state.gigs[index] = action.payload.gig;
        }
        const myIndex = state.myGigs.findIndex((g) => g._id === action.payload.gig._id);
        if (myIndex !== -1) {
          state.myGigs[myIndex] = action.payload.gig;
        }
        if (state.currentGig?._id === action.payload.gig._id) {
          state.currentGig = action.payload.gig;
        }
      })
      // Delete gig
      .addCase(deleteGig.fulfilled, (state, action) => {
        state.gigs = state.gigs.filter((g) => g._id !== action.payload);
        state.myGigs = state.myGigs.filter((g) => g._id !== action.payload);
      })
      // Get my gigs
      .addCase(getMyGigs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyGigs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myGigs = action.payload.gigs;
      })
      .addCase(getMyGigs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentGig } = gigSlice.actions;
export { getGigs as fetchGigs, getGig as fetchGigById, getMyGigs as fetchMyGigs };
export const searchGigs = getGigs;
export default gigSlice.reducer;
