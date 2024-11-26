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
    @Column(name = "ticketID", nullable = false)
    private Integer ticketID;

    @Column(name = "showtimeID", nullable = false)
    private Integer showtimeID;

    @Column(name = "movieID", nullable = false)
    private Integer movieID;

    @Column(name = "theatreID", nullable = false)
    private Integer theatreID;

    @Column(name = "seatID", nullable = false, length = 10) // Single seat ID
    private String seatID;

    @Column(name = "ticketDate", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date ticketDate;

    @Column(name = "cancellationDeadline", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date cancellationDeadline;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "refund", nullable = false)
    private Double refund = 0.0;

    @Column(name = "userID", nullable = false)
    private Integer userID;

    @Column(name = "transactionID", nullable = false) // New column to reference the transaction
    private Integer transactionID;

    @ManyToOne
    @JoinColumn(name = "userID", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "showtimeID", insertable = false, updatable = false)
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "movieID", insertable = false, updatable = false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "theatreID", insertable = false, updatable = false)
    private Theatre theatre;

    @ManyToOne
    @JoinColumn(name = "transactionID", insertable = false, updatable = false) // New relationship to Transaction
    private Transaction transaction;
}