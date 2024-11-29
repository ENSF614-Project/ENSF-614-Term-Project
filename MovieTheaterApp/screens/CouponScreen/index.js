// screens/CouponScreen/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';

const CouponScreen = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // Replace with actual login logic
    const [userID, setUserID] = useState(1); // Mock logged-in user ID
    const [couponInput, setCouponInput] = useState('');
    const [filteredCoupons, setFilteredCoupons] = useState([]); //Dont necessarily need when getting real data
    const [errorMessage, setErrorMessage] = useState('');

    // Mock data
    const allCoupons = [
        { isRegistered: 1, CouponCode: 'AZ4g3b3x', Value: 36.0, Expiry: '27/05/2025', Status: 'Valid', userID: 1, email: 'tony@tony.ca' },
        { isRegistered: 1, CouponCode: 'Bg6u90Pc', Value: 12.0, Expiry: '25/12/2024', Status: 'Valid', userID: 1, email: 'tony@tony.ca' },
        { isRegistered: 1, CouponCode: '5Z345tYd', Value: 48.0, Expiry: '13/04/2025', Status: 'Valid', userID: 1, email: 'tony@tony.ca' },
        { isRegistered: 0, CouponCode: '45Ttb3Gj', Value: 10.0, Expiry: '27/05/2025', Status: 'Valid', userID: 2, email: 'biggie@gmail.com' },
        { isRegistered: 0, CouponCode: '12Qwp05f', Value: 90.0, Expiry: '14/02/2023', Status: 'Expired', userID: 3, email: 'monkeyman@hotmail.com' },
        { isRegistered: 0, CouponCode: 'FFf3r78p', Value: 5.0, Expiry: '01/01/2025', Status: 'Valid', userID: 4, email: 'datboi@waddup.pizza' },
        { isRegistered: 1, CouponCode: 'VrtY7e2S', Value: 36.0, Expiry: '27/05/2024', Status: 'Expired', userID: 1, email: 'tony@tony.ca' },
    ];

    const sortCouponsByExpiry = (coupons) => {
        return coupons.sort((a, b) => {
            const dateA = new Date(a.Expiry.split('/').reverse().join('-'));
            const dateB = new Date(b.Expiry.split('/').reverse().join('-'));
            return dateA - dateB; // Earliest expiry first
        });
    };

    const handleCouponSubmit = () => {
        if (!couponInput) {
            setErrorMessage('Please enter a coupon code or email.');
            return;
        }

        const isEmail = couponInput.includes('@');

        if (isEmail) {
            const emailCoupons = allCoupons.filter(
                (coupon) =>
                    coupon.email === couponInput &&
                    (!coupon.isRegistered || isUserLoggedIn) &&
                    coupon.Status === 'Valid'
            );

            if (emailCoupons.length > 0) {
                setFilteredCoupons(sortCouponsByExpiry(emailCoupons));
                setErrorMessage('');
            } else {
                setErrorMessage('Invalid email or no valid coupons found.');
            }
        } else {
            const newCoupon = allCoupons.find(
                (coupon) =>
                    coupon.CouponCode === couponInput &&
                    (!coupon.isRegistered || isUserLoggedIn)
            );

            if (newCoupon) {
                if (!filteredCoupons.some((c) => c.CouponCode === newCoupon.CouponCode)) {
                    setFilteredCoupons(sortCouponsByExpiry([...filteredCoupons, newCoupon]));
                }
                setErrorMessage('');
            } else {
                setErrorMessage('Invalid coupon code.');
            }
        }

        setCouponInput(''); // Clear the input field
    };

    useEffect(() => {
        if (isUserLoggedIn) {
            const userCoupons = allCoupons.filter(
                (coupon) => coupon.userID === userID &&
                    coupon.Status === 'Valid'
            );
            setFilteredCoupons(sortCouponsByExpiry(userCoupons));
        }
    }, [isUserLoggedIn, userID]);

    //Maybe shoould add like a picture or something accompyniing the Coupon/Credits
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coupon/Credits</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        errorMessage ? styles.inputError : null, // Apply error styling if there's an error
                    ]}
                    placeholder="Enter coupon code or email"
                    value={couponInput}
                    onChangeText={(text) => {
                        setCouponInput(text);
                        if (errorMessage) setErrorMessage(''); // Clear error on input change
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={handleCouponSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <ScrollView style={styles.couponList}>
                <View style={styles.couponListWrapper}>
                    {filteredCoupons.map((coupon, index) => (
                        <View key={index} style={styles.couponItem}>
                            <Text style={styles.couponCode}>Code: {coupon.CouponCode}</Text>
                            <Text>Value: ${coupon.Value.toFixed(2)}</Text>
                            {coupon.Status === 'Valid' && coupon.Expiry && <Text>Expiry: {coupon.Expiry}</Text>}
                            <Text>Status: {coupon.Status}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default CouponScreen;
