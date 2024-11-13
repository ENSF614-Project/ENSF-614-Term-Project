// services/api.js
const API_URL = 'http://localhost:8080';

export const api = {
    getAllUsers: async () => {
        try {
            const response = await fetch(`${API_URL}/api/users`);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    createUser: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    password: 'defaultPassword', // This will be updated into a password field
                    address: 'defaultAddress',   // This will be updated into a address field 
                }),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to create user');
            }
            return response.json();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/users/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
};