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
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;
    @Autowired
    private UserService userService;

    // Purchase a ticket
    @PostMapping("/purchase")
    public ResponseEntity<List<Ticket>> purchaseTicket(
            @RequestParam(required = false) Integer userId,
            @RequestParam Integer showtimeID,
            @RequestParam List<Integer> seatIDs,
            @RequestParam Double price,
            @RequestParam(required = false) Long couponId) {
        User user = null;
        if (userId != null) {
            user = new User();
            user.setUserId(userId);
        }
        List<Ticket> tickets = ticketService.purchaseTicket(user, showtimeID, seatIDs, price, couponId);
        return ResponseEntity.status(HttpStatus.CREATED).body(tickets);
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllTickets();
        return ResponseEntity.status(HttpStatus.OK).body(tickets);
    }

    // Cancel a ticket and generate a coupon
    @PutMapping("/{ticketId}/cancel")
    public ResponseEntity<String> cancelTicket(@PathVariable Long ticketId) {
        ticketService.cancelTicket(ticketId);
        return ResponseEntity.ok("Ticket cancelled successfully, and a coupon was issued.");
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
