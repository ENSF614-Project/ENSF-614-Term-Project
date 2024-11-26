package org.example.acmeplex.service;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketsByUser(Integer userID) {
        return ticketRepository.findByUserID(userID);
    }

    public List<Ticket> getTicketsByShowtime(Integer showtimeID) {
        return ticketRepository.findByShowtimeID(showtimeID);
    }

    public Ticket getTicketById(Integer ticketID) {
        return ticketRepository.findById(ticketID).orElse(null);
    }

    public void cancelTicket(Integer ticketID) {
        Ticket ticket = ticketRepository.findById(ticketID).orElse(null);
        if (ticket != null) {
            Date now = new Date();
            if (ticket.getCancellationDeadline().after(now)) {
                ticket.setStatus("Cancelled");
                ticket.setRefund(ticket.getPrice() * 0.85); // 15% admin fee
                ticketRepository.save(ticket);
            } else {
                throw new IllegalArgumentException("Cancellation deadline passed");
            }
        }
    }
}
