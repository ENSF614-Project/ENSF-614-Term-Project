// UserDTO.java
package org.example.acmeplex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private Integer userId;
    private String email;
    private Boolean isRU;
}