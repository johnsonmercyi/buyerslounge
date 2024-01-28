package com.soft.springbootdemo.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.requestdto.ReturnSaleRequestDTO;
import com.soft.springbootdemo.dto.requestdto.SaleRequestDTO;
import com.soft.springbootdemo.dto.responsedto.ReturnSaleResponseDTO;
import com.soft.springbootdemo.dto.responsedto.SaleResponseDTO;
import com.soft.springbootdemo.service.returnsale.ReturnSaleService;
import com.soft.springbootdemo.service.sale.SaleService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class MarketActivitiesController {
  
  private final SaleService saleService;
  private final ReturnSaleService returnSaleService;

  @GetMapping("/sales/{saleId}")
  public ResponseEntity<Optional<SaleResponseDTO>> salesById(@PathVariable UUID saleId) {
    return ResponseEntity.ofNullable(saleService.findById(saleId));
  }

  @PostMapping("/sales")
  public ResponseEntity<SaleResponseDTO> makeSale(@RequestBody SaleRequestDTO saleRequestDTO) {
    return ResponseEntity.ok(saleService.save(saleRequestDTO));
  }

  @GetMapping("/return-sales/{saleId}")
  public ResponseEntity<ReturnSaleResponseDTO> returnSaleById(@PathVariable UUID saleId) {
    return ResponseEntity.ok(returnSaleService.findBySaleId(saleId));
  }

  @PostMapping("/return-sales")
  public ResponseEntity<ReturnSaleResponseDTO> returnSales(@RequestBody ReturnSaleRequestDTO returnSaleRequestDTO) {
      return ResponseEntity.ok(returnSaleService.save(returnSaleRequestDTO));
  }
  
}
