package org.example.acmeplex.controller;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/availability/{showtimeID}")
    public List<Ticket> getAvailableSeats(@PathVariable Integer showtimeID) {
        return ticketService.getAvailableSeats(showtimeID);
    }

    @PutMapping("/cancel/{ticketID}")
    public String cancelTicket(@PathVariable Integer ticketID, @RequestParam boolean isRegisteredUser) {
        ticketService.cancelTicket(ticketID, isRegisteredUser);
        return "Ticket canceled successfully";
    }
}
