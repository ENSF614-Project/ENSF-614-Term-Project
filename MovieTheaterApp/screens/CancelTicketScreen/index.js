// screens/CancelTicketScreen/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { api } from '../../services/api';

const CancelTicketScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const addDebugInfo = (info) => {
        setDebugInfo(prev => prev + '\n' + info);
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            setDebugInfo('Attempting to fetch users...');

            const response = await api.getAllUsers();
            addDebugInfo('Raw response received');
            addDebugInfo(`Response type: ${typeof response}`);
            addDebugInfo(`Response: ${JSON.stringify(response, null, 2)}`);

            setUsers(response);
            addDebugInfo('Users state updated');

        } catch (err) {
            console.error('Error in fetchUsers:', err);
            setError(`Error: ${err.message}`);
            addDebugInfo(`Error occurred: ${err.message}`);
            if (err.response) {
                addDebugInfo(`Status: ${err.response.status}`);
                addDebugInfo(`Status Text: ${err.response.statusText}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        fetchUsers();
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#E31837" />
                <Text style={styles.loadingText}>Fetching Users...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Registered Users</Text>

            {error ? (
                <View style={styles.messageContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity 
                        style={styles.retryButton}
                        onPress={handleRetry}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.subtitle}>Users Found: {users.length}</Text>
                    {users.map((user, index) => (
                        <View key={index} style={styles.userCard}>
                            <Text style={styles.userText}>Email: {user.email}</Text>
                            <Text style={styles.userText}>Username: {user.username}</Text>
                            <Text style={styles.userText}>User ID: {user.userId}</Text>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.debugContainer}>
                <Text style={styles.debugTitle}>Debug Information:</Text>
                <Text style={styles.debugText}>{debugInfo}</Text>
            </View>
        </ScrollView>
    );
};

export default CancelTicketScreen;