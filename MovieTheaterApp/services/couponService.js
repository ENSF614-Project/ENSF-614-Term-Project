// services/movieService.js
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
            const response = await fetch(`${API_URL}/api/coupons/user/${email}`);
            if (!response.ok) throw new Error('Failed to fetch coupons');
            return await response.json();
        } catch (error) {
            console.error('Error fetching coupons by email:', error);
            throw error;
        }
    },

    // Get coupon by coupon ID
    async getCouponById(couponId) {
        try {
            const response = await fetch(`${API_URL}/api/coupons/${couponId}`);
            if (!response.ok) throw new Error('Failed to fetch coupon');
            return await response.json();
        } catch (error) {
            console.error('Error fetching coupon by ID:', error);
            throw error;
        }
    },





};