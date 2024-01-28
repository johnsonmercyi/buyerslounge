package com.soft.springbootdemo.controller;

import java.util.Collection;
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
import com.soft.springbootdemo.dto.responsedto.ReturnSaleResponseDTO;
import com.soft.springbootdemo.service.returnsale.ReturnSaleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/returnsales")
@RequiredArgsConstructor
public class ReturnSaleController {

  private final ReturnSaleService returnSaleService;

  @GetMapping
  public ResponseEntity<Collection<ReturnSaleResponseDTO>> findAllReturnSales() {
    return ResponseEntity.ok(returnSaleService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<ReturnSaleResponseDTO>> findReturnById(@PathVariable UUID id) {
    return ResponseEntity.ofNullable(returnSaleService.findById(id));
  }

  @GetMapping("/sales/{id}")
  public ResponseEntity<ReturnSaleResponseDTO> findReturnSaleById(@PathVariable UUID id) {
    return ResponseEntity.ofNullable(returnSaleService.findBySaleId(id));
  }

  @PostMapping
  public ResponseEntity<ReturnSaleResponseDTO> saveReturnSale(@RequestBody ReturnSaleRequestDTO returnSaleRequestDTO) {
    return ResponseEntity.ok(returnSaleService.save(returnSaleRequestDTO));
  }
}
