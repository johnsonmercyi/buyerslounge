package com.soft.springbootdemo.errorhandlers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomErrorMessage {
  private boolean error = true;
  private String message;
  private String details;
}
