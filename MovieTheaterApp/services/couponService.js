// services/couponService.js
const API_URL = 'http://localhost:8080';

export const couponService = {
    //Need to get coupons by user
    //Need to get coupons by email
    //Need to get coupon by couponID
    // Get coupons by user ID
    async getCouponsByUserId(userId) {
        try {
            const response = await fetch(`${API_URL}/api/coupons/user/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch coupons');
            return await response.json();
        } catch (error) {
            console.error('Error fetching coupons by user ID:', error);
            throw error;
        }
    },

    // Get coupons by email
    async getCouponsByEmail(email) {
        try {
            const response = await fetch(`${API_URL}/api/coupons/email/${email}`);
            if (!response.ok) {
                throw new Error('Failed to fetch coupons');
            }
            const coupons = await response.json();
            // Ensure values are numbers and validate data structure
            return coupons.map(coupon => ({
                ...coupon,
                value: typeof coupon.value === 'number' ? coupon.value : parseFloat(coupon.value) || 0
            }));
        } catch (error) {
            console.error('Error fetching coupons by email:', error);
            return [];
        }
    },

    // Get coupon by coupon ID
    async getCouponById(couponId) {
        try {
            const response = await fetch(`${API_URL}/api/coupons/${couponId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch coupon');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching coupon by ID:', error);
            throw error;
        }
    },

    // Apply coupon to transaction
    async applyCoupon(couponId, amount) {
        try {
            const response = await fetch(`${API_URL}/api/coupons/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    couponID: couponId.toString(),
                    amount: amount.toString()
                }).toString()
            });

            if (!response.ok) {
                throw new Error('Failed to apply coupon');
            }

            const coupon = await response.json();
            // Ensure value is a number
            return {
                ...coupon,
                value: typeof coupon.value === 'number' ? coupon.value : parseFloat(coupon.value) || 0
            };
        } catch (error) {
            console.error('Error applying coupon:', error);
            throw error;
        }
    },

    async getRemainingValue(couponId) {
        try {
            const response = await fetch(`${API_URL}/api/coupons/${couponId}/remaining`);
            if (!response.ok) {
                throw new Error('Failed to get coupon remaining value');
            }
            return await response.json();
        } catch (error) {
            console.error('Error getting coupon remaining value:', error);
            throw error;
        }
    }
};