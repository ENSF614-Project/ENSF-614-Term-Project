// services/accountService.js
const API_URL = 'http://localhost:8080';

export const accountService = {
    async getUser(userId) {
        try {
            const response = await fetch(`${API_URL}/api/users/${userId}`);
            if (!response.ok) throw new Error('Failed to get user');
            return await response.json();
        } catch (error) {
                console.error('Error getting user by user ID:', error);
                throw error;
            }
        },


        async getPaymentInfo(userId) {
            try {
                const response = await fetch(`${API_URL}/api/paymentinfo/user/${userId}`);
            if (!response.ok) throw new Error('Failed to get paymentinfo');
            return await response.json();
        } catch (error) {
                console.error('Error getting paymentinfo by user ID:', error);
                throw error;
            }
        },
};