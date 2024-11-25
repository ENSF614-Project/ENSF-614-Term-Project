package org.example.acmeplex.repository;

import org.example.acmeplex.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {}
