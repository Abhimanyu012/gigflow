import api from './api';

export const gigService = {
  getGigs: async (params = {}) => {
    const response = await api.get('/gigs', { params });
    return response.data;
  },

  getGig: async (id) => {
    const response = await api.get(`/gigs/${id}`);
    return response.data;
  },

  createGig: async (data) => {
    const response = await api.post('/gigs', data);
    return response.data;
  },

  updateGig: async (id, data) => {
    const response = await api.put(`/gigs/${id}`, data);
    return response.data;
  },

  deleteGig: async (id) => {
    const response = await api.delete(`/gigs/${id}`);
    return response.data;
  },

  getMyGigs: async () => {
    const response = await api.get('/gigs/my-gigs');
    return response.data;
  },
};
