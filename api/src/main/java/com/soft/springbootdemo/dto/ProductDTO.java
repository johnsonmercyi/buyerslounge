package com.soft.springbootdemo.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
  private UUID id;
  private UUID categoryId;
  private String name;
  private String description;
  private double cost;
  private double price;
  private UUID refNo;
  private LocalDateTime created;
  private LocalDateTime updated;
}
