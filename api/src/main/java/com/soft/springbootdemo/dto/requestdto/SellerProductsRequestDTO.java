package com.soft.springbootdemo.dto.requestdto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerProductsRequestDTO {
  private UUID id;
  private UUID sellerId;
  private UUID productId;
  private int quantity;
  private double cost;
  private double price;
  private String description;
  private UUID refNo;
  private List<String> imagesAngles;
}
