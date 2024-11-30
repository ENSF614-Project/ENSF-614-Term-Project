// services/api.js
const API_URL = 'http://localhost:8080';

export const api = {
    getAllUsers: async () => {
        try {
            console.log('Making request to:', `${API_URL}/api/users`);
            
            const response = await fetch(`${API_URL}/api/users`);
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('Parsed response data:', data);
            return data;
            
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            throw error;
        }
    },

    testEndpoint: async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/test`);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text(); // Using text() instead of json() since it returns a string
        } catch (error) {
            console.error('Error testing endpoint:', error);
            throw error;
        }
    },
};

export const getEarlyAccessNotifications = async () => {
  const response = await fetch("http://localhost:8080/api/notifications/early-access");
  if (!response.ok) {
    throw new Error("Failed to fetch early access notifications");
  }
  return response.json();
};