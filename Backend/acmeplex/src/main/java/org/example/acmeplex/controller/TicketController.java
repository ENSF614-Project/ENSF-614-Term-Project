package org.example.acmeplex.controller;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping("/{ticketID}")
    public Ticket getTicket(@PathVariable Integer ticketID) {
        return ticketService.getTicketById(ticketID);
    }

    @PutMapping("/cancel/{ticketID}")
    public String cancelTicket(@PathVariable Integer ticketID) {
        ticketService.cancelTicket(ticketID);
        return "Ticket canceled successfully";
    }
}
