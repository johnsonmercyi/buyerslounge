package com.soft.springbootdemo.dto.requestdto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
// @NoArgsConstructor
@AllArgsConstructor
public class SaleRequestDTO {
  private UUID id;
  private UUID customerId;
  private double saleTotal;
  private List<SaleItems> saleItems;
  private LocalDateTime created;
  private LocalDateTime updated;

  public SaleRequestDTO() {
    this(UUID.randomUUID(), null, 0d, new ArrayList<>(), null, null);
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class SaleItems {
    private UUID productId;
    private UUID sellerId;
    private int qty;
    private int total;
  }
}
