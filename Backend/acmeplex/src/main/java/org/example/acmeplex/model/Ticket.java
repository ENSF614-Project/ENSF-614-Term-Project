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

    @Column(name = "seatIDList", nullable = false, columnDefinition = "TEXT")
    private String seatIDList;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ticketDate", nullable = false)
    private Date ticketDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "cancellationDeadline", nullable = false)
    private Date cancellationDeadline;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "refund", nullable = false)
    private Double refund = 0.0;

    @Column(name = "userID", nullable = false)
    private Integer userID;

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
    @JoinColumn(name = "transactionID", nullable = false)
    private Transaction transaction;
}
