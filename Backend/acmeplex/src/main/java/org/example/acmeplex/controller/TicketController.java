package org.example.acmeplex.controller;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/create")
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping("/user/{userID}")
    public List<Ticket> getTicketsByUser(@PathVariable Integer userID) {
        return ticketService.getTicketsByUser(userID);
    }

    @PostMapping("/cancel/{ticketID}")
    public void cancelTicket(@PathVariable Integer ticketID) {
        ticketService.cancelTicket(ticketID);
    }
}
