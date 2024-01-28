package com.soft.springbootdemo.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnSaleDTO {
    private UUID id;
    private UUID saleId;
    private LocalDateTime created;
    private LocalDateTime updated;
}
