package org.example.acmeplex.repository;

import org.example.acmeplex.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByShowtimeShowtimeIdAndStatus(Integer showtimeId, String status);
    List<Ticket> findByUserUserId(Integer userId);
    List<Ticket> findByTransactionTransactionID(Integer transactionID);
}
