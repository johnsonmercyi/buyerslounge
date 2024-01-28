package com.soft.springbootdemo.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
  private String firstname;
  private String lastname;
  private String username;
  private String password;
  private String passwordConfirmation;
  private String email;
  private String gender;
  private Date dob;
  private String address;
  private String nationality;
}
