package org.example.acmeplex.repository;

import org.example.acmeplex.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByTransactionTransactionID(Integer transactionID);
    List<Ticket> findByShowtimeIDAndStatus(Integer showtimeID, String status);
}