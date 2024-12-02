// screens/AccountScreen/index.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { User } from 'lucide-react-native'; // Assuming you want to add an icon
import { COLORS } from '../../styles';
import { useAuth } from '../../context/AuthContext';
import { accountService } from '../../services/accountService'; // Import accountService

const AccountScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState([]); // State for payment info

    // State to manage input values if we were to implement editing
    const [name, setName] = useState(user?.name || '');
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [address, setAddress] = useState(user?.address || '');
    const [registrationDate, setRegistrationDate] = useState(user?.registrationDate || '');
    const [annualFeeDueDate, setAnnualFeeDueDate] = useState(user?.annualFeeDueDate || '');

    const [cardHolderName, setCardHolderName] = useState(paymentInfo[0]?.cardHolderName || '');
    const [cardNumber, setCardNumber] = useState(paymentInfo[0]?.cardNumber || '');
    const [expiry, setExpiry] = useState(() => {
        // Check if paymentInfo exists and if expiryMonth and expiryYear are defined
        if (paymentInfo[0]?.expiryMonth && paymentInfo[0]?.expiryYear) {
            return paymentInfo[0].expiryMonth < 10 
                ? '0' + paymentInfo[0].expiryMonth 
                : paymentInfo[0].expiryMonth + '/' + paymentInfo[0].expiryYear;
        }
        return ''; // Return empty string if paymentInfo is not available
    });
    const [billingAddress, setBillingAddress] = useState(paymentInfo[0]?.billingAddress || '');


    useEffect(() => {
        if (user && user.userId) {  // Ensure user and userId are available
            const fetchPaymentInfo = async () => {
                try {
                    const paymentData = await accountService.getPaymentInfo(user.userId);
                    setPaymentInfo(paymentData);
                    console.log(paymentData);
    
                    // Set expiry only after payment data is fetched
                    if (paymentData[0]?.expiryMonth && paymentData[0]?.expiryYear) {
                        setExpiry(
                            paymentData[0].expiryMonth < 10 
                                ? '0' + paymentData[0].expiryMonth 
                                : paymentData[0].expiryMonth + '/' + paymentData[0].expiryYear
                        );
                    }
                } catch (error) {
                    console.error('Error fetching payment info:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPaymentInfo();
            
        } else {
            console.warn('User or userId is not available');
            setLoading(false); // Stop loading if user is not available
        }
    }, [user]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text>Loading account information...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                {/* User Info Header with Icon */}
                <View style={styles.userIconContainer}>
                    <User size={24} color={COLORS.text.primary} />
                    <Text style={styles.userIconText}>Account Details</Text>
                </View>

                {/* Account Details Section */}
                <View style={styles.accountDetailsContainer}>
                    <Text style={styles.sectionTitle}>Account Details</Text>

                    {/* Name Field */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={user.name}
                            value={name}
                            onChangeText={setName}
                            editable={false}
                        />
                    </View>

                    {/* Username Field */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={user.username}
                            value={username}
                            onChangeText={setUsername}
                            editable={false}
                        />
                    </View>

                    {/* Email Field */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={user.email}
                            value={email}
                            onChangeText={setEmail}
                            editable={false}
                        />
                    </View>

                    {/* Address Field */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Address:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={user.address}
                            value={address}
                            onChangeText={setAddress}
                            multiline
                            editable={false}
                        />
                    </View>

                    {/* Registration Date Field */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Registration Date:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={user.registrationDate}
                            value={registrationDate}
                            onChangeText={setRegistrationDate}
                            editable={false} // Prevent editing this field
                        />
                    </View>

                    {/* Annual Fee Due Date Field */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Annual Fee Due Date:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={user.annualFeeDueDate}
                            value={annualFeeDueDate}
                            onChangeText={setAnnualFeeDueDate}
                            editable={false} // Prevent editing this field
                        />
                    </View>
                </View>

                {/* Payment Info Section */}
                {paymentInfo.length > 0 && (
                    <View style={styles.accountDetailsContainer}>
                        <Text style={styles.sectionTitle}>Payment Information</Text>

                        {/* Payment Info Fields */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Cardholder Name:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={paymentInfo[0].cardHolderName}
                                value={cardHolderName}
                                onChangeText={setCardHolderName}
                                editable={false}
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Card Number:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={paymentInfo[0].cardNumber}
                                value={cardNumber}
                                onChangeText={setCardNumber}
                                editable={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Expiration Date:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={expiry}
                                value={expiry}
                                onChangeText={setExpiry}
                                editable={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Billing Address:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={paymentInfo[0].billingAddress}
                                value={billingAddress}
                                onChangeText={setBillingAddress}
                                editable={false}
                            />
                        </View>
                    </View>
                )}

                {/* Navigation Buttons */}
                <View style={styles.navigationButtonsContainer}>
                    <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => navigation.navigate('Ticket')}
                    >
                        <Text style={styles.navigationButtonText}>View/Cancel Tickets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => navigation.navigate('Coupon')}
                    >
                        <Text style={styles.navigationButtonText}>View Coupons</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => navigation.navigate('News')}
                    >
                        <Text style={styles.navigationButtonText}>View News</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default AccountScreen;
