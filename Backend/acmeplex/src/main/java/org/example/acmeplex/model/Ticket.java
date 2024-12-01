//Ticket.java
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
    private Long ticketID;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    @Column(name = "showtime_id", nullable = false)
    private Integer showtimeID;

    @Column(name = "seat_id", nullable = false, length = 10)
    private Integer seatID;

    @Temporal(TemporalType.DATE)
    @Column(name = "purchased_date", nullable = false)
    private Date purchasedDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "cancellation_deadline", nullable = false)
    private Date cancellationDeadline;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "refund", nullable = false)
    private Double refund;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "email", nullable = true)
    private String email;
}
