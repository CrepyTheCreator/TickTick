import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TFeedState, Ticket } from '../../utils/types';
import { getTicketList } from '../../utils/api';

const initialState: TFeedState = {
  isLoading: false,
  tickets: []
};

export const getFeedThunk = createAsyncThunk<Ticket[], void>(
  'feed/getFeed',
  async () => {
    const response = await getTicketList();
    
    if (response && response.tickets) {
      return response.tickets;
    }
    
    if (Array.isArray(response)) {
      return response;
    }
    
    return [];
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getTickets: (state) => state.tickets,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers(builder) {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFeedThunk.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getFeedThunk.fulfilled, (state, action) => {
        console.log('reload')
        state.isLoading = false
        state.tickets = action.payload
      })
  }
});

export const { getTickets, getIsLoading } = feedSlice.selectors;
export default feedSlice.reducer;
