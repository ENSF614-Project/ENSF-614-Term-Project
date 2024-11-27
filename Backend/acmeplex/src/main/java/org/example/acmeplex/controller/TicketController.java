package org.example.acmeplex.controller;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.model.User;
import org.example.acmeplex.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/purchase")
    public ResponseEntity<Ticket> purchaseTicket(
            @RequestParam Integer userId,
            @RequestParam Integer showtimeID,
            @RequestParam Integer seatID,
            @RequestParam Double price) {
        User user = new User();
        user.setUserId(userId); // Assuming a minimal User object for the service
        Ticket ticket = ticketService.purchaseTicket(user, showtimeID, seatID, price);
        return ResponseEntity.status(HttpStatus.CREATED).body(ticket);
    }

    @PutMapping("/{ticketId}/cancel")
    public ResponseEntity<String> cancelTicket(@PathVariable Long ticketId) {
        ticketService.cancelTicket(ticketId);
        return ResponseEntity.ok("Ticket cancelled successfully and coupon issued.");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getTicketsByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId); // Assuming a minimal User object for lookup
        List<Ticket> tickets = ticketService.getTicketsByUser(user);
        return ResponseEntity.ok(tickets);
    }
}

