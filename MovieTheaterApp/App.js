// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './navigation';
import { AuthProvider } from './context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
        </AuthProvider>
    );
}