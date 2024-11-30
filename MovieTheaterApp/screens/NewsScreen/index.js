import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { getEarlyAccessNotifications } from "../../services/api.js";

const NewsScreen = ({ }) => {
    const [notifications, setNotifications] = useState([]); // State for notifications

    useEffect(() => {

        getEarlyAccessNotifications()
            .then((data) => {
                console.log("Fetched notifications:", data);
                setNotifications(data);
            })
            .catch((error) => {
                console.error("Error fetching notifications:", error);
            });
    }, []);
 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>News</Text>
            {(
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
                </ScrollView>
            )}
        </View>
    );
};

export default NewsScreen;
