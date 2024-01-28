package com.soft.springbootdemo.dto.responsedto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnSaleResponseDTO {
  private UUID id;
  private SaleResponseDTO sale;
  private LocalDateTime created;
  private LocalDateTime updated;
}
