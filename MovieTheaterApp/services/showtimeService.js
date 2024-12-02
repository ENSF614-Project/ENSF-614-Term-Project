// services/showtimeService.js
const API_URL = 'http://localhost:8080';

export const showtimeService = {
    getShowtimesByMovie: async (movieId) => {
        try {
            const response = await fetch(`${API_URL}/api/showtime/movie/${movieId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie showtimes:', error);
            throw error;
        }
    },

    getShowtimeById: async (showtimeId) => {
        try{
            const response = await fetch(`${API_URL}/api/showtime/${showtimeId}`);
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie showtimes:', error);
            throw error;
        }
    },
};