package org.example.acmeplex.service;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket getTicketById(Integer ticketID) {
        return ticketRepository.findById(ticketID).orElse(null);
    }
    
    public void cancelTicket(Integer ticketID) {
        Ticket ticket = getTicketById(ticketID);
        if (ticket != null && isCancelable(ticket)) {
            ticket.setStatus("Canceled");
            ticketRepository.save(ticket);
        }
    }

    private boolean isCancelable(Ticket ticket) {
        return ticket.getCancellationDeadline().after(new Date());
    }
}
