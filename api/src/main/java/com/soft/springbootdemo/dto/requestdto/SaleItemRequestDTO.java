package com.soft.springbootdemo.dto.requestdto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleItemRequestDTO {
  private SaleRequestDTO sale;
  private List<SaleItems> saleItems;

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
