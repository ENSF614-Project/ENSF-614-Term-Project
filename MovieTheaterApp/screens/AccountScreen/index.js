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

const AccountScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    // State to manage input values if we were to implement editing
    const [name, setName] = useState(user?.name || '');
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [address, setAddress] = useState(user?.address || '');
    const [registrationDate, setRegistrationDate] = useState(user?.registrationDate || '');
    const [annualFeeDueDate, setAnnualFeeDueDate] = useState(user?.annualFeeDueDate || '');

    useEffect(() => {
        setLoading(false);
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
