// services/registerService.js
const API_URL = 'http://localhost:8080';

export const registerService = {
    async createRU(name, email, username, password, address, isRU) {
        try {
            const response = await fetch(`${API_URL}/api/registered-users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password,
                    address,
                    isRU,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to register user: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },
};