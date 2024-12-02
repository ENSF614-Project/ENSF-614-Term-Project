// screens/TicketScreen/index.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Ticket, AlertCircle } from 'lucide-react-native';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketService'
import { showtimeService } from '../../services/showtimeService'
import { seatService } from '../../services/seatService'

const TicketScreen = () => {
    const { user } = useAuth();
    const [ticketNumber, setTicketNumber] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [userTickets, setUserTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [emailNoLogin, setEmailNoLogin] = useState('');

    useEffect(() => {
        if (user) {
            fetchUserTickets();
        }
    }, [user]);

    const fetchUserTickets = async () => {
        setLoading(true);
        try {
            const tickets = await ticketService.getUserTickets(user.userId);
            console.log(tickets);
            // Fetch additional details for each ticket
            const detailedTickets = await Promise.all(
                tickets.map(async (ticket) => {
                    try {
                        const showtime = await showtimeService.getShowtimeById(ticket.showtimeID);
                        const seat = await seatService.getSeatById(ticket.seatID);
    
                        return {
                            ...ticket,
                            showtimeDetails: showtime,
                            seatDetails: seat,
                        };
                    } catch (error) {
                        console.error(`Error fetching details for ticket ID ${ticket.ticketID}:`, error);
                        return { ...ticket, showtimeDetails: null, seatDetails: null };
                    }
                })
            );
    
            // Filter out tickets with status "cancelled"
            //const activeTickets = detailedTickets.filter(ticket => ticket.status !== "CANCELLED");
    
            setUserTickets(detailedTickets);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tickets. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleTicketSearch = async () => {
        if (!ticketNumber.trim()) {
            setError('Please enter a ticket number');
            return;
        }

        setLoading(true);
        try {
            const ticket = await ticketService.getTicketById(ticketNumber);

            if (ticket) {
                try{
                    const showtime = await showtimeService.getShowtimeById(ticket.showtimeID);
                    const seat = await seatService.getSeatById(ticket.seatID);
                    console.log("USERS:", ticket)
                    setEmailNoLogin(ticket.email);
                    setSearchedTicket({
                        ...ticket,
                        showtimeDetails: showtime,
                        seatDetails: seat,
                    });
                    setError(null);
                }catch (error) {
                    console.error('Error enriching ticket details:', error);
                    setSearchedTicket(ticket); // Use the ticket as is if enrichment fails
                }
            } else {
                setError('Ticket not found');
                setSearchedTicket(null);
            }
        } catch (err) {
            setError('Failed to search ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    const handleCancelTicket = async (ticketId) => {
        setLoading(true);
        try {
            await ticketService.cancelTicketById(ticketId);
            setUserTickets((prev) =>
                prev.filter((ticket) => ticket.ticketID !== ticketId)
            );
            console.log('Ticket canceled successfully.');

            const emailData = {
                templateParams: {
                    user_email: user?.email || emailNoLogin,
                    ticketStuff: `Ticket ID: ${ticketId}`  
                },
            };

            // Send email
            const emailResponse = await fetch('http://localhost:5000/send-email-cancel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (!emailResponse.ok) {
                console.error('Failed to send confirmation email');
                // Don't throw error here - we still want to complete the transaction
            }
        } catch (err) {
            console.error('Failed to cancel ticket. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderTicketCard = (ticket) => {
        const isActive = ticket.status === 'BOOKED';
        const canCancel = new Date(ticket.cancellationDeadline) > new Date();

        return (
            <View key={ticket.ticketID} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                    <Text style={styles.movieTitle}>{ticket.showtimeDetails.movie.title}</Text>
                    <View style={[
                        styles.statusBadge,
                        ticket.status ==='BOOKED' ? styles.activeBadge : styles.pastBadge
                    ]}>
                        <Text style={styles.statusText}>
                            {ticket.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.ticketInfo}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Theatre:</Text>
                        <Text style={styles.infoValue}>{ticket.showtimeDetails.theatre.theatreName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Seat:</Text>
                        <Text style={styles.infoValue}>
                            {[ticket.seatDetails.seatRow, ticket.seatDetails.seatNum].join(' ')}
                        
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Showtime:</Text>
                        <Text style={styles.infoValue}>{formatDate(ticket.showtimeDetails.startTime)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Price:</Text>
                        <Text style={styles.infoValue}>${ticket.price.toFixed(2)}</Text>
                    </View>
                    {canCancel && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Cancel By:</Text>
                            <Text style={styles.infoValue}>
                                {formatDate(ticket.cancellationDeadline)}
                            </Text>
                        </View>
                    )}
                </View>

                {canCancel && isActive && (
                    <TouchableOpacity
                        style={[styles.cancelButton, !isActive && styles.disabledButton]}
                        onPress={isActive ? () => handleCancelTicket(ticket.ticketID) : null}
                        disabled = {!isActive}
                    >
                        <Text style={[styles.cancelButtonText,
                            !isActive && styles.disabledButtonText
                        ]}>Cancel Ticket</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={styles.spinner.color} />
                <Text style={styles.loadingText}>Loading tickets...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchHeader}>
                    <Ticket color={styles.searchHeader.iconColor} size={24} />
                    <Text style={styles.searchTitle}>Find Ticket by ID</Text>
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <AlertCircle color={styles.errorContainer.iconColor} size={20} />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={ticketNumber}
                        onChangeText={setTicketNumber}
                        placeholder="Enter ticket number"
                        placeholderTextColor={styles.input.placeholderTextColor}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={handleTicketSearch}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                {searchedTicket && renderTicketCard(searchedTicket)}
            </View>

            {user && (
                <View style={styles.ticketsContainer}>
                    <Text style={styles.sectionTitle}>Your Tickets</Text>
                    {userTickets.length > 0 ? (
                        userTickets.map(renderTicketCard)
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ticket size={48} color={styles.emptyContainer.iconColor} />
                            <Text style={styles.emptyText}>No tickets found</Text>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

export default TicketScreen;