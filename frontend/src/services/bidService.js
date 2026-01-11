import api from './api';

export const bidService = {
  createBid: async (data) => {
    const response = await api.post('/bids', data);
    return response.data;
  },

  getBidsByGig: async (gigId) => {
    const response = await api.get(`/bids/${gigId}`);
    return response.data;
  },

  getMyBids: async () => {
    const response = await api.get('/bids/my-bids');
    return response.data;
  },

  hireBid: async (bidId) => {
    const response = await api.patch(`/bids/${bidId}/hire`);
    return response.data;
  },

  withdrawBid: async (bidId) => {
    const response = await api.delete(`/bids/${bidId}`);
    return response.data;
  },
};
