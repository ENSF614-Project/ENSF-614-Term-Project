// screens/CouponScreen/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { couponService } from '../../services/couponService';

const CouponScreen = () => {
    const { user } = useAuth();
    const [couponInput, setCouponInput] = useState('');
    const [filteredCoupons, setFilteredCoupons] = useState([]); //Dont necessarily need when getting real data
    const [errorMessage, setErrorMessage] = useState('');

    // Mock data
    // const allCoupons = [
    //     { isRegistered: 1, CouponCode: 'AZ4g3b3x', Value: 36.0, Expiry: '27/05/2025', Status: 'Valid', userID: 1, email: 'tony@tony.ca' },
    //     { isRegistered: 1, CouponCode: 'Bg6u90Pc', Value: 12.0, Expiry: '25/12/2024', Status: 'Valid', userID: 1, email: 'tony@tony.ca' },
    //     { isRegistered: 1, CouponCode: '5Z345tYd', Value: 48.0, Expiry: '13/04/2025', Status: 'Valid', userID: 1, email: 'tony@tony.ca' },
    //     { isRegistered: 0, CouponCode: '45Ttb3Gj', Value: 10.0, Expiry: '27/05/2025', Status: 'Valid', userID: 2, email: 'biggie@gmail.com' },
    //     { isRegistered: 0, CouponCode: '12Qwp05f', Value: 90.0, Expiry: '14/02/2023', Status: 'Expired', userID: 3, email: 'monkeyman@hotmail.com' },
    //     { isRegistered: 0, CouponCode: 'FFf3r78p', Value: 5.0, Expiry: '01/01/2025', Status: 'Valid', userID: 4, email: 'datboi@waddup.pizza' },
    //     { isRegistered: 1, CouponCode: 'VrtY7e2S', Value: 36.0, Expiry: '27/05/2024', Status: 'Expired', userID: 1, email: 'tony@tony.ca' },
    // ];

    const sortCouponsByExpiry = (coupons) => {
        return coupons.sort((a, b) => {
            const dateA = new Date(a.expiryDate.split('/').reverse().join('-'));
            const dateB = new Date(b.expiryDate.split('/').reverse().join('-'));
            return dateA - dateB; // Earliest expiry first
        });
    };

    // const handleCouponSubmit = () => {
    //     if (!couponInput) {
    //         setErrorMessage('Please enter a coupon code or email.');
    //         return;
    //     }

    //     const isEmail = couponInput.includes('@');

    //     if (isEmail) {
    //         const emailCoupons = allCoupons.filter(
    //             coupon => coupon.email === couponInput && coupon.Status === 'Valid'
    //         );

    //         if (emailCoupons.length > 0) {
    //             setFilteredCoupons(sortCouponsByExpiry(emailCoupons));
    //             setErrorMessage('');
    //         } else {
    //             setErrorMessage('Invalid email or no valid coupons found.');
    //         }
    //     } else {
    //         const coupon = allCoupons.find(
    //             coupon => coupon.CouponCode === couponInput && coupon.Status === 'Valid'
    //         );

    //         if (coupon) {
    //             if (!filteredCoupons.some(c => c.CouponCode === coupon.CouponCode)) {
    //                 setFilteredCoupons(sortCouponsByExpiry([...filteredCoupons, coupon]));
    //             }
    //             setErrorMessage('');
    //         } else {
    //             setErrorMessage('Invalid coupon code.');
    //         }
    //     }

    //     setCouponInput(''); // Clear the input field
    // };

    const handleCouponSubmit = async () => {
        if (!couponInput) {
            setErrorMessage('Please enter a coupon code or email.');
            return;
        }
    
        try {
            const isEmail = couponInput.includes('@');
            let fetchedCoupons = [];
            //console.log(isEmail);
    
            if (isEmail) {
                fetchedCoupons = await couponService.getCouponsByEmail(couponInput);
            } else {
                const singleCoupon = await couponService.getCouponById(couponInput);
                if (singleCoupon) fetchedCoupons = [singleCoupon];
            }
    
            // Check if coupons exist and process them
            if (fetchedCoupons.length > 0) {
                const filteredCoupons = fetchedCoupons.filter(coupon => {
                    // If the coupon belongs to a registered user (isRU) and the user is not the signed-in user, exclude it
                    if (coupon.user.isRU && coupon.userId !== user.userId) {
                        return false; // Don't include this coupon
                    }
                    return true; // Include this coupon
                });
    
                if (filteredCoupons.length > 0) {
                    setFilteredCoupons(sortCouponsByExpiry(filteredCoupons));
                    setErrorMessage('');
                    console.log(filteredCoupons);
                } else {
                    setErrorMessage('No valid coupons found.');
                }
            } else {
                setErrorMessage('No valid coupons found.');
            }
        } catch (error) {
            setErrorMessage('Error fetching coupons. Please try again.');
        }
    
        setCouponInput(''); // Clear the input field
    };


    // Load user's coupons when logged in
    // useEffect(() => {
    //     if (user) {
    //         const userCoupons = allCoupons.filter(
    //             coupon => coupon.userID === user.userId && coupon.Status === 'Valid'
    //         );
    //         setFilteredCoupons(sortCouponsByExpiry(userCoupons));
    //     } else {
    //         setFilteredCoupons([]);
    //     }
    // }, [user]);


    useEffect(() => {
        const fetchUserCoupons = async () => {
            if (user) {
                try {
                    const userCoupons = await couponService.getCouponsByUserId(user.userId);
                    setFilteredCoupons(sortCouponsByExpiry(userCoupons));
                    console.log(userCoupons);
                } catch (error) {
                    console.error('Error fetching user coupons:', error);
                    setFilteredCoupons([]);
                }
            } else {
                setFilteredCoupons([]);
            }
        };
    
        fetchUserCoupons();
    }, [user]);

    //Maybe shoould add like a picture or something accompyniing the Coupon/Credits
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coupon/Credits</Text>
            {/* Search Section - Available to all users */}
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
            {/* Coupons List */}
            <ScrollView style={styles.couponList}>
                <View style={styles.couponListWrapper}>
                    {user && (
                        <Text style={styles.sectionTitle}>Your Coupons</Text>
                    )}
                    {filteredCoupons.map((coupon, index) => (
                        <View key={index} style={styles.couponItem}>
                            <Text style={styles.couponCode}>Coupon Code: {coupon.couponID}</Text>
                            <Text style={styles.couponValue}>Value: ${coupon.value.toFixed(2)}</Text>
                            <Text style={styles.couponExpiry}>Expiry: {coupon.expiryDate}</Text>
                            <Text style={styles.couponStatus}>Status: {coupon.status}</Text>
                        </View>
                    ))}
                    {filteredCoupons.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                {user ? 'No coupons found' : 'Search for coupons using code or email'}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default CouponScreen;