//TicketController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.model.User;
import org.example.acmeplex.service.TicketService;
import org.example.acmeplex.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketService ticketService;
    @Autowired
    private UserService userService;

    @PostMapping("/purchase")
    public ResponseEntity<List<Ticket>> purchaseTicket(
            @RequestParam(required = false) Integer userId,
            @RequestParam Integer showtimeID,
            @RequestParam List<Integer> seatIDs,
            @RequestParam Double price, // This will now be the per-ticket price after discount, to ensure the correct
                                        // value for ticket cancellations
            @RequestParam(required = false) Long couponId,
            @RequestParam(required = false) String email,
            @RequestParam Double totalAmount) {

        User user = null;
        if (userId != null) {
            user = userService.getUserById(userId);
            if (user != null) {
                email = user.getEmail();
            }
        }

        List<Ticket> tickets = ticketService.purchaseTicket(
                user,
                showtimeID,
                seatIDs,
                price, // Uses the provided discounted price per ticket
                couponId,
                email);

        return ResponseEntity.status(HttpStatus.CREATED).body(tickets);
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllTickets();
        return ResponseEntity.status(HttpStatus.OK).body(tickets);
    }

    // Cancel a ticket and generate a coupon
    @PutMapping("/{ticketId}/cancel")
    public ResponseEntity<Map<String, String>> cancelTicket(@PathVariable Long ticketId) {
        ticketService   .cancelTicket(ticketId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Ticket " + ticketId + " canceled successfully");
        return ResponseEntity.ok(response);
    }

    // Get tickets by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getTicketsByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId);
        List<Ticket> tickets = ticketService.getTicketsByUser(user);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("{ticketId}")
    public ResponseEntity<Ticket> getTicketByTicketId(@PathVariable Integer ticketId) {
        return ResponseEntity.ok(ticketService.getTicketById(ticketId));
    }

}