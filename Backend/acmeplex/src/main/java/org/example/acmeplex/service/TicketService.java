package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CouponService couponService;

    public Ticket purchaseTicket(User user, Integer showtimeID, Integer seatID, Double price) {
        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setShowtimeID(showtimeID);
        ticket.setSeatID(seatID);
        ticket.setPurchasedDate(new Date());
        ticket.setCancellationDeadline(new Date(System.currentTimeMillis() + (72L * 60 * 60 * 1000))); // 72 hours
        ticket.setPrice(price);
        ticket.setRefund(0.0); // Default to no refund
        ticket.setStatus("BOOKED");
        ticket.setEmail(user.getEmail());
        return ticketRepository.save(ticket);
    }

    public void cancelTicket(Long ticketID) {
        Ticket ticket = ticketRepository.findById(ticketID)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        if (!"BOOKED".equals(ticket.getStatus())) {
            throw new IllegalStateException("Only booked tickets can be cancelled");
        }

        if (ticket.getCancellationDeadline().before(new Date())) {
            throw new IllegalStateException("Cancellation deadline has passed");
        }

        ticket.setStatus("CANCELLED");
        double refundAmount = calculateRefund(ticket.getPrice(), ticket.getUser());
        ticket.setRefund(refundAmount);
        ticketRepository.save(ticket);

        // Create coupon
        couponService.createCoupon(ticket.getUser(), ticket, refundAmount);
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

