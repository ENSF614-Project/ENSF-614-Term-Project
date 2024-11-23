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
    @Column(name = "paymentID", nullable = false)
    private Integer paymentID;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "paymentMethod", nullable = false, length = 50)
    private String paymentMethod;

    @Column(name = "transactionDate", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date transactionDate;

}
