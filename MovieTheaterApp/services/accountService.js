// services/accountService.js
const API_URL = 'http://localhost:8080';

export const registerService = {
    async getUser(userId) {
        try {
            const response = await fetch(`${API_URL}/api/users/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch tickets');
            return await response.json();
        } catch (error) {
                console.error('Error getting user by user ID:', error);
                throw error;
            }
        }
};