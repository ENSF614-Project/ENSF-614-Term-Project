package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "TRANSACTION")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "transaction_date", nullable = false)
    private Date transactionDate;

    @Column(name = "transaction_successful", nullable = false)
    private Boolean transactionSuccessful;
}