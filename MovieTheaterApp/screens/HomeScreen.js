// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBackendData();
    }, []);

    const fetchBackendData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/test');
            const data = await response.text();
            setMessage(data);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error connecting to backend');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default HomeScreen;