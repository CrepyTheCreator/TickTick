import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TFeedState, Ticket } from '../../utils/types';
import { getTicketByIdApi, getTicketList } from '../../utils/api';

const initialState: TFeedState = {
  isLoading: false,
  tickets: [],
  currentTicket: null,
  ticketLoading: false
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

export const getTicketByIdThunk = createAsyncThunk<Ticket, number>(
  'feed/getTicket',
  async (id: number) => {
    const response = await getTicketByIdApi(id);
    
    return response;
  }
);


const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getTickets: (state) => state.tickets,
    getIsLoading: (state) => state.isLoading,
    getCurrentTicket: (state) => state.currentTicket,
    getTicketLoading: (state) => state.ticketLoading
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
        state.isLoading = false
        state.tickets = action.payload
      })
      .addCase(getTicketByIdThunk.pending, (state) => {
        state.ticketLoading = true
      })
      .addCase(getTicketByIdThunk.rejected, (state) => {
        state.ticketLoading = false
      })
      .addCase(getTicketByIdThunk.fulfilled, (state, action) => {
        state.ticketLoading = false
        state.currentTicket = action.payload
      })
  }
});

export const { getTickets, getIsLoading, getCurrentTicket, getTicketLoading } = feedSlice.selectors;
export default feedSlice.reducer;
