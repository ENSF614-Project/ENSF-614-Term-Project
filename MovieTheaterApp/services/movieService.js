// services/movieService.js
const API_URL = 'http://localhost:8080';

export const movieService = {
    getAllMovies: async () => {
        try {
            const response = await fetch(`${API_URL}/api/movies`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    },

    getMovieById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/movies/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching movie:', error);
            throw error;
        }
    },

    getEarlyAccessMovies: async () => {
        try {
            const response = await fetch(`${API_URL}/api/movies/early-access`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching early access movies:', error);
            throw error;
        }
    }
};