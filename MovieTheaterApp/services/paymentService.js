// services/paymentService.js
const API_URL = 'http://localhost:8080';

export const paymentService = {
    async savePayment(cardHolderName, cw, cardNumber, expiryMonth, expiryYear, cardType, user, billingAddress) {
        try {
            const response = await fetch(`${API_URL}/api/paymentinfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardHolderName,
                    cw: parseInt(cw),
                    cardNumber,
                    expiryMonth: parseInt(expiryMonth),
                    expiryYear: parseInt(expiryYear),
                    cardType,
                    billingAddress,
                    user
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to save payment: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving payment:', error);
            throw error;
        }
    },


    async payAnnualFee(user, totalAmount) {
        try {
            const userId = user.userId;
            const response = await fetch(`${API_URL}/api/transactions/create?userId=${userId}&totalAmount=${totalAmount}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
            if (!response.ok) {
                throw new Error(`Failed to pay annual fee: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error paying fee:', error);
            throw error;
        }
    },
};