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
import { User } from 'lucide-react-native';
import { COLORS } from '../../styles';
import { useAuth } from '../../context/AuthContext';
import { accountService } from '../../services/accountService';

const AccountScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState([]);

    // Redirect to login if no user
    useEffect(() => {
        if (!user) {
            navigation.replace('Login');
            return;
        }
    }, [user, navigation]);

    // State management - initialized with empty values
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [annualFeeDueDate, setAnnualFeeDueDate] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [billingAddress, setBillingAddress] = useState('');

    // Fetch user payment info
    useEffect(() => {
        if (user?.userId) {
            const fetchPaymentInfo = async () => {
                try {
                    setLoading(true);
                    const paymentData = await accountService.getPaymentInfo(user.userId);
                    setPaymentInfo(paymentData);

                    // Update state with user info
                    setName(user.name || '');
                    setUsername(user.username || '');
                    setEmail(user.email || '');
                    setAddress(user.address || '');
                    setRegistrationDate(user.registrationDate || '');
                    setAnnualFeeDueDate(user.annualFeeDueDate || '');

                    // Update payment info if available
                    if (paymentData && paymentData[0]) {
                        setCardHolderName(paymentData[0].cardHolderName || '');
                        setCardNumber(paymentData[0].cardNumber || '');
                        setBillingAddress(paymentData[0].billingAddress || '');

                        // Format expiry date
                        if (paymentData[0].expiryMonth && paymentData[0].expiryYear) {
                            const month = paymentData[0].expiryMonth < 10
                                ? `0${paymentData[0].expiryMonth}`
                                : paymentData[0].expiryMonth;
                            setExpiry(`${month}/${paymentData[0].expiryYear}`);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching payment info:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPaymentInfo();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.button.primary.background} />
                <Text style={styles.loadingText}>Loading account information...</Text>
            </View>
        );
    }

    if (!user) {
        return null;
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

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Address:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={address}
                            multiline
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Registration Date:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Registration Date"
                            value={registrationDate}
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Annual Fee Due Date:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Annual Fee Due Date"
                            value={annualFeeDueDate}
                            editable={false}
                        />
                    </View>
                </View>

                {/* Payment Info Section */}
                {paymentInfo.length > 0 && (
                    <View style={styles.accountDetailsContainer}>
                        <Text style={styles.sectionTitle}>Payment Information</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Cardholder Name:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cardholder Name"
                                value={cardHolderName}
                                editable={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Card Number:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Card Number"
                                value={cardNumber}
                                editable={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Expiration Date:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="MM/YY"
                                value={expiry}
                                editable={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Billing Address:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Billing Address"
                                value={billingAddress}
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