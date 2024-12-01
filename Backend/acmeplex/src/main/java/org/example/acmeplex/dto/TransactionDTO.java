// TransactionDTO.java
package org.example.acmeplex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class TransactionDTO {
    private Long transactionID;
    private Double total;
    private String paymentMethod;
    private Date transactionDate;
    private Boolean transactionSuccessful;
}
