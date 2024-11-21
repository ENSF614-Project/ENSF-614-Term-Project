package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "PAYMENT")

public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentId", nullable = false)
    private Integer paymentId;

    @Column(name = "holderName", nullable = false)
    private String holderName;

    @Column(name = "cardNumber", nullable = false)
    private String cardNumber;

    @Column(name = "expiry", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date expiry;
}