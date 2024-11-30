import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { getEarlyAccessNotifications } from "../../services/api.js";

const NewsScreen = ({ navigation }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // Replace with actual login logic
    const [notifications, setNotifications] = useState([]); // State for notifications

    // Mock data
    const [news] = useState([
        { type: 'Release', news: 'Big movie coming out next week, preorder your tickets now for Spooderman 420!' },
        { type: 'Concession', news: 'Acmeplex is proud to announce that it will now be serving lunchly at all our locations!' }
    ]);

    useEffect(() => {
        // Redirect to login if the user is not logged in
        if (!isUserLoggedIn) {
            navigation.navigate('Login');
        }

        // Fetch notifications
        getEarlyAccessNotifications()
            .then((data) => {
                console.log("Fetched notifications:", data);
                setNotifications(data);
            })
            .catch((error) => {
                console.error("Error fetching notifications:", error);
            });
    }, [isUserLoggedIn, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>News</Text>
            {isUserLoggedIn && (
                <ScrollView style={styles.newsContainer}>
                    {/* Render Notifications */}
                    {notifications.length > 0 && (
                        <View style={styles.newsItem}>
                            <Text style={styles.newsType}>Early Access Notifications</Text>
                            {notifications.map((notification, index) => (
                                <Text key={index} style={styles.newsText}>{notification}</Text>
                            ))}
                        </View>
                    )}

                    {/* Render Mock News */}
                    {news.map((item, index) => (
                        <View key={index} style={styles.newsItem}>
                            <Text style={styles.newsType}>{item.type}</Text>
                            <Text style={styles.newsText}>{item.news}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default NewsScreen;
