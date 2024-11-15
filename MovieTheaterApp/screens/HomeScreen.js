// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { api } from '../services/api';

const HomeScreen = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await api.getAllUsers();
            setUsers(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load users');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async () => {
        if (!username || !email || !password || !address) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setLoading(true);
            await api.createUser({
                username,
                email,
                password,
                address
            });
            setUsername('');
            setEmail('');
            setPassword('');
            setAddress('');
            loadUsers();
            Alert.alert('Success', 'User created successfully');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to create user');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderUser = ({ item }) => (
        <View style={styles.userCard}>
            <Text style={styles.userName}>{item.username}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userAddress}>{item.address}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Create New User</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleCreateUser}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Creating...' : 'Create User'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>User List</Text>
                <FlatList
                    data={users}
                    renderItem={renderUser}
                    keyExtractor={item => item.userId.toString()}
                    refreshing={loading}
                    onRefresh={loadUsers}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        padding: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    userCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    userEmail: {
        color: '#666',
        marginBottom: 4,
    },
    userAddress: {
        color: '#666',
        fontStyle: 'italic',
    }
});

export default HomeScreen;