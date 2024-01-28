package com.soft.springbootdemo.dto.responsedto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleItemResponseDTO {
  private UUID id;
  // private SaleResponseDTO sale;
  private CustomProduct product;
  private CustomSeller seller;
  private int quantity;
  private double total;
  private LocalDateTime created;
  private LocalDateTime updated;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class CustomProduct {
    private UUID id;
    private CategoryResponseDTO category;
    private String name;
    private double cost;
    private double price;
    private UUID refNo;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class CustomSeller {
    private UUID id;
    private String name;
    private String email;
  }
}
