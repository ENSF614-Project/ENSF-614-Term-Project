//TicketService.java
package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.example.acmeplex.dto.TicketDTO;
import org.example.acmeplex.dto.UserDTO;
import org.example.acmeplex.model.*;
import org.example.acmeplex.repository.TicketRepository;
import org.example.acmeplex.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    // Convert Ticket entity to DTO
    private TicketDTO convertToDTO(Ticket ticket) {
        return new TicketDTO(
                ticket.getTicketID(),
                ticket.getShowtimeID(),
                ticket.getSeatID(),
                ticket.getPurchasedDate(),
                ticket.getCancellationDeadline(),
                ticket.getPrice(),
                ticket.getStatus(),
                ticket.getEmail()
        );
    }

    public List<TicketDTO> getTicketsByEmail(String email) {
        return ticketRepository.findByEmail(email).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TicketDTO> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TicketDTO getTicketById(long id) {
        return ticketRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));
    }

    @Transactional
    public List<TicketDTO> purchaseTicket(UserDTO userDTO, Integer showtimeID, List<Integer> seatIDs, Double price, Long couponId, String email) {
        User user = null;
        if (userDTO != null) {
            user = new User();
            user.setUserId(userDTO.getUserId());
            user.setEmail(userDTO.getEmail());
            user.setIsRU(userDTO.getIsRU());
        }

        Transaction transaction = transactionService.createTransactionEntity(user, price * seatIDs.size(), couponId);

        List<TicketDTO> tickets = new ArrayList<>();
        for(Integer seatID: seatIDs) {
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
            ticket.setCancellationDeadline(new Date(System.currentTimeMillis() + (72L * 60 * 60 * 1000)));
            ticket.setPrice(price);
            ticket.setRefund(0.0);
            ticket.setStatus("BOOKED");
            ticket.setTransaction(transaction);
            tickets.add(convertToDTO(ticketRepository.save(ticket)));
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

    public List<TicketDTO> getTicketsByUser(User user) {
        return ticketRepository.findByUser(user).stream()
                .map(this::convertToDTO) // Convert each Ticket to TicketDTO
                .collect(Collectors.toList());
    }}
