// CouponDTO.java
package org.example.acmeplex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class CouponDTO {
    private Long couponID;
    private String email;
    private Double value;
    private Date expiryDate;
    private String status;
}