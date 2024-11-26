package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "TICKET")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ticketID;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    @Column(name = "showtime_id", nullable = false)
    private Integer showtimeID;

    @Column(name = "seat_id", nullable = false, length = 10)
    private String seatID;

    @Temporal(TemporalType.DATE)
    @Column(name = "ticket_date", nullable = false)
    private Date ticketDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "cancellation_deadline", nullable = false)
    private Date cancellationDeadline;

    @Column(nullable = false)
    private Double price;

    @Column(name = "refund_amount", nullable = false)
    private Double refundAmount;

    @Column(nullable = false, length = 50)
    private String status;
}
