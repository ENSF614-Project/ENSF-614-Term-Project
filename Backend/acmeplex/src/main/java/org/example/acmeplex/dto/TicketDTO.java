// TicketDTO.java
package org.example.acmeplex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class TicketDTO {
    private Long ticketID;
    private Integer showtimeID;
    private Integer seatID;
    private Date purchasedDate;
    private Date cancellationDeadline;
    private Double price;
    private String status;
    private String email;
}