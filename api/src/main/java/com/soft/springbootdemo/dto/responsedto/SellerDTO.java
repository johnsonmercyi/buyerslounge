package com.soft.springbootdemo.dto.responsedto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerDTO {
    private UUID id;
    private UserDTO user;
    private String firstname;
    private String lastname;
    private String gender;
    private Date dob;
    private String address;
    private String nationality;
    private LocalDateTime created;
    private LocalDateTime updated; 
}
