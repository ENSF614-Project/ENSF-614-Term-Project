// services/seatService.js

const API_URL = 'http://localhost:8080';

export const seatService = {
    getSeatsByShowtime: async (showtimeId) => {
        try {
            const response = await fetch(`${API_URL}/api/seats/showtime/${showtimeId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching seats for showtime:', error);
            throw error;
        }
    },

    getSeatById: async(seatId) => {
        try {
            const response = await fetch(`${API_URL}/api/seats/${seatId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching seat by Id:', error);
            throw error;
        }
    }
};