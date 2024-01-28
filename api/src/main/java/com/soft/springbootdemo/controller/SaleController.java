package com.soft.springbootdemo.controller;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.requestdto.SaleRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SaleResponseDTO;
import com.soft.springbootdemo.model.Sale;
import com.soft.springbootdemo.service.sale.SaleService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@Log4j2
public class SaleController {

  private final SaleService saleService;

  @GetMapping
  public ResponseEntity<Collection<SaleResponseDTO>> findAllSales() {
    return ResponseEntity.ok(saleService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<SaleResponseDTO>> findSaleById(@PathVariable UUID id) {
    return ResponseEntity.ofNullable(saleService.findById(id));
  }

  @PostMapping
  public ResponseEntity<SaleResponseDTO> saveSale(@RequestBody SaleRequestDTO saleDTO) {
    return ResponseEntity.ok(saleService.save(saleDTO));
  }

}
