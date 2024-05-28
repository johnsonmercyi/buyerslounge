package com.soft.springbootdemo.dto.requestdto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestProductDTO {
  private UUID id;
  private UUID categoryId;
  private String name;
}
