// services/ticketService.js
const API_URL = 'http://localhost:8080';

export const ticektService = {


    // Get tickets by userID
    async getUserTickets(userId) {
        try {
            const response = await fetch(`${API_URL}/api/tickets/user/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch tickets');
            return await response.json();
        } catch (error) {
            console.error('Error fetching tickets by user ID:', error);
            throw error;
        }
    },

    // Get ticket by ticketID
    async getTicketById(ticketId) {
        try {
            const response = await fetch(`${API_URL}/api/tickets/${ticketId}`);
            if (!response.ok) throw new Error('Failed to fetch tickets');
            return await response.json();
        } catch (error) {
            console.error('Error fetching tickets by ticket ID:', error);
            throw error;
        }
    },

    // Cancel ticket by ticketID
    async cancelTicketById(ticketId) {
        try {
            const response = await fetch(`${API_URL}/api/tickets/${ticketId}/cancel`);
            if (!response.ok) throw new Error('Failed to fetch coupon');
            return await response.json();
        } catch (error) {
            console.error('Error fetching coupon by ID:', error);
            throw error;
        }
    },





};