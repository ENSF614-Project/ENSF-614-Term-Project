// services/paymentFlowService.js
const API_URL = 'http://localhost:8080';

// services/paymentFlowService.js
export const paymentFlowService = {
    async ensureUser(email) {
        try {
            const response = await fetch(`http://localhost:8080/api/users`, {
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
        couponId = null,
        finalTotal
    }) {
        try {
            // If no userId provided, create/get user with email
            let purchaseUserId = userId;
            if (!purchaseUserId && email) {
                const user = await this.ensureUser(email);
                purchaseUserId = user.userId;
            }

            // Purchase tickets with the final total
            const ticketResponse = await fetch(`${API_URL}/api/tickets/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    userId: purchaseUserId?.toString(),
                    showtimeID: showtimeId.toString(),
                    seatIDs: selectedSeats.map(seat => seat.seatId).join(','),
                    price: (finalTotal / selectedSeats.length).toString(), // Calculate per-ticket price
                    ...(couponId && { couponId: couponId.toString() }),
                    totalAmount: finalTotal.toString()
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