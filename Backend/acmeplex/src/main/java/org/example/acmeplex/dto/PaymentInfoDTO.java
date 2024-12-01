package org.example.acmeplex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentInfoDTO {
    private Integer paymentInfoID;
    private String cardType;
    private String cardHolderName;
    private String billingAddress;
    private Integer expiryMonth;
    private Integer expiryYear;
}
