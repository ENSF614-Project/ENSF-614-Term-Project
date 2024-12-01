// services/paymentFlowService.js
const API_URL = 'http://localhost:8080';

export const paymentFlowService = {
    async ensureUser(email) {
        try {
            const response = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    isRU: false
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create/get user');
            }

            return await response.json();
        } catch (error) {
            console.error('Error ensuring user:', error);
            throw error;
        }
    },

    async purchaseTickets({
        email,
        userId,
        showtimeId,
        selectedSeats,
        pricePerSeat,
        couponId = null
    }) {
        try {
            // If no userId provided, create/get user with email
            let purchaseUserId = userId;
            if (!purchaseUserId && email) {
                const user = await this.ensureUser(email);
                purchaseUserId = user.userId;
            }

            // Purchase tickets directly - transaction will be created by the backend
            const ticketResponse = await fetch(`${API_URL}/api/tickets/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    userId: purchaseUserId?.toString(),
                    showtimeID: showtimeId.toString(),
                    seatIDs: selectedSeats.map(seat => seat.seatId).join(','),
                    price: pricePerSeat.toString(),
                    ...(couponId && { couponId: couponId.toString() })
                }).toString()
            });

            if (!ticketResponse.ok) {
                throw new Error('Failed to create tickets');
            }

            return {
                tickets: await ticketResponse.json()
            };
        } catch (error) {
            console.error('Error in purchase flow:', error);
            throw error;
        }
    }
};