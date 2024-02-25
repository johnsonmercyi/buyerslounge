package com.soft.springbootdemo.dto.responsedto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.soft.springbootdemo.dto.ProductDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerProductsResponseDTO {
  private UUID id;
  private SellerDTO seller;
  private ProductResponseDTO product;
  private int quantity;
  private double cost;
  private double price;
  private String description;
  private UUID refNo;
  private LocalDateTime created;
  private LocalDateTime updated;
}
