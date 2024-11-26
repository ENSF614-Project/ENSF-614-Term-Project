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

    @Column(name = "seatID", nullable = false, length = 10)
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
    private Double refund;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "transactionID")
    private Transaction transaction;
}
