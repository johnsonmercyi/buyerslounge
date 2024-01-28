package com.soft.springbootdemo.dto.requestdto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnSaleRequestDTO {
  private UUID saleId;
}
