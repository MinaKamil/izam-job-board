import axios from 'axios';

// Using port 8081 to match the server.js configuration
const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchNavigation = async () => {
  try {
    const response = await api.get('/nav');
    return response.data;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    throw error;
  }
};

export const trackDragEvent = async (payload) => {
  try {
    await api.post('/track', payload);
  } catch (error) {
    console.error('Error tracking drag event:', error);
    throw error;
  }
};

export const saveNavigation = async (navTree) => {
  try {
    await api.post('/nav', navTree);
  } catch (error) {
    console.error('Error saving navigation:', error);
    throw error;
  }
};