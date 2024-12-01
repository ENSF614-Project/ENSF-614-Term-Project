package org.example.acmeplex.repository;

import org.example.acmeplex.model.Showtime;
import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUser(User user);

    List<Ticket> findByShowtimeID(Integer showtimeID);
}