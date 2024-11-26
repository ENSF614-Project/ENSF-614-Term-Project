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
    @Column(name = "transactionID", nullable = false)
    private Integer transactionID;

    @ManyToOne
    @JoinColumn(name = "couponId")
    private Coupon coupon;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "paymentMethod", nullable = false)
    private String paymentMethod;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "transactionDate", nullable = false)
    private Date transactionDate;

    @Column(name = "transactionSuccessful", nullable = false)
    private Boolean successful;
}
