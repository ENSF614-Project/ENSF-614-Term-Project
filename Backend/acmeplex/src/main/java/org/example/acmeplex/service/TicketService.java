package org.example.acmeplex.service;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAvailableSeats(Integer showtimeID) {
        return ticketRepository.findByShowtimeShowtimeIdAndStatus(showtimeID, "AVAILABLE");
    }

    public void cancelTicket(Integer ticketID, boolean isRegisteredUser) {
        Ticket ticket = ticketRepository.findById(ticketID).orElse(null);
        if (ticket != null && isCancelable(ticket)) {
            ticket.setRefund(isRegisteredUser ? ticket.getPrice() : ticket.getPrice() * 0.85);
            ticket.setStatus("Canceled");
            ticketRepository.save(ticket);
        }
    }

    private boolean isCancelable(Ticket ticket) {
        return ticket.getCancellationDeadline().after(new Date());
    }
}
