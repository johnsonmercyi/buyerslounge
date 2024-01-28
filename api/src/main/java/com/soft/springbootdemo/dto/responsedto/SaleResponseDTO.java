package com.soft.springbootdemo.dto.responsedto;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

import com.soft.springbootdemo.model.SaleItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleResponseDTO {
  private UUID id;
  private CustomCustomer customer;
  private double saleTotal;
  private Collection<SaleItemResponseDTO> saleItems;
  private LocalDateTime created;
  private LocalDateTime updated;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class CustomCustomer {
    private UUID customerId;
    private String customerName;
    private String customerEmail;
  }
}


