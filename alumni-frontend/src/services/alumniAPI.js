// API Service for Alumni Directory
// Replace the sample data in DirectoryPage.jsx with these API calls

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Alumni API functions
export const alumniAPI = {
  // Fetch all alumni profiles
  getAllAlumni: async () => {
    try {
      const response = await api.get('/profile/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching alumni:', error);
      throw error;
    }
  },

  // Search alumni by query
  searchAlumni: async (searchQuery) => {
    try {
      const response = await api.get(`/profile/search?q=${encodeURIComponent(searchQuery)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching alumni:', error);
      throw error;
    }
  },

  // Filter alumni by criteria
  filterAlumni: async (filters) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const response = await api.get(`/profile/filter?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error filtering alumni:', error);
      throw error;
    }
  },

  // Get alumni by department
  getAlumniByDepartment: async (department) => {
    try {
      const response = await api.get(`/profile/department/${department}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching alumni by department:', error);
      throw error;
    }
  },

  // Get alumni by graduation year
  getAlumniByYear: async (year) => {
    try {
      const response = await api.get(`/profile/year/${year}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching alumni by year:', error);
      throw error;
    }
  },

  // Get alumni statistics
  getAlumniStats: async () => {
    try {
      const response = await api.get('/profile/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching alumni stats:', error);
      throw error;
    }
  },

  // Contact alumni (send message)
  contactAlumni: async (alumniId, message) => {
    try {
      const response = await api.post(`/profile/${alumniId}/contact`, { message });
      return response.data;
    } catch (error) {
      console.error('Error contacting alumni:', error);
      throw error;
    }
  },
};

export default alumniAPI;