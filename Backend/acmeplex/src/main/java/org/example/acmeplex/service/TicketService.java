//TicketService.java
package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.example.acmeplex.model.*;
import org.example.acmeplex.repository.TicketRepository;
import org.example.acmeplex.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CouponService couponService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private ShowtimeService showtimeService;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(long id) {
        return ticketRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Transactional
    public List<Ticket> purchaseTicket(User user, Integer showtimeID, List<Integer> seatIDs, Double price,
            Long couponId, String email) {
        Transaction transaction = transactionService.createTransaction(user, price * seatIDs.size(), couponId);

        List<Ticket> tickets = new ArrayList<>();
        for (Integer seatID : seatIDs) {
            Seat seat = seatRepository.findById(seatID)
                    .orElseThrow(() -> new EntityNotFoundException("Seat not found: " + seatID));

            if (!seat.getIsAvailable()) {
                throw new IllegalStateException("Seat " + seatID + " is already occupied");
            }

            seat.setIsAvailable(false);
            seatRepository.save(seat);

            Ticket ticket = new Ticket();
            if (user != null) {
                ticket.setUser(user);
                ticket.setEmail(user.getEmail());
            } else if (email != null && !email.isEmpty()) {
                ticket.setEmail(email);
            } else {
                throw new IllegalArgumentException("Email is required for anonymous purchases");
            }

            ticket.setShowtimeID(showtimeID);
            ticket.setSeatID(seatID);
            ticket.setPurchasedDate(new Date());
            ticket.setCancellationDeadline(Date.from(
                    showtimeService.getStartTimeByShowtimeId(ticket.getShowtimeID())
                            .minusDays(3)
                            .atZone(ZoneId.systemDefault())
                            .toInstant()));
            ticket.setPrice(price);
            ticket.setRefund(0.0);
            ticket.setStatus("BOOKED");
            ticket.setTransaction(transaction);
            tickets.add(ticketRepository.save(ticket));
        }

        return tickets;
    }

    @Transactional
    public void cancelTicket(Long ticketID) {
        Ticket ticket = ticketRepository.findById(ticketID)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        if (!"BOOKED".equals(ticket.getStatus())) {
            throw new IllegalStateException("Only booked tickets can be cancelled");
        }

        if (ticket.getCancellationDeadline().before(new Date())) {
            throw new IllegalStateException("Cancellation deadline has passed");
        }

        Seat seat = seatRepository.findById(ticket.getSeatID())
                .orElseThrow(() -> new EntityNotFoundException("Seat not found"));
        seat.setIsAvailable(true);
        seatRepository.save(seat);

        ticket.setStatus("CANCELLED");
        double refundAmount = calculateRefund(ticket.getPrice(), ticket.getUser());
        ticket.setRefund(refundAmount);
        ticketRepository.save(ticket);

        if (ticket.getUser() != null) {
            couponService.createCoupon(ticket.getUser(), ticket, refundAmount);
        }
    }

    private Double calculateRefund(Double price, User user) {
        if (user instanceof RegisteredUser) {
            return price; // Full refund for Registered Users
        } else {
            return price * 0.85; // 15% fee for Ordinary Users
        }
    }

    public List<Ticket> getTicketsByUser(User user) {
        return ticketRepository.findByUser(user);
    }
}