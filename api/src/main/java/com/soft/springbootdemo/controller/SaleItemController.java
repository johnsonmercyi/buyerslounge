package com.soft.springbootdemo.controller;

import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.requestdto.SaleItemRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SaleItemResponseDTO;
import com.soft.springbootdemo.service.saleItem.SaleItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/saleitems")
@RequiredArgsConstructor
public class SaleItemController {

  private final SaleItemService saleItemService;

  @PostMapping
  public ResponseEntity<Collection<SaleItemResponseDTO>> saveSaleItems(@RequestBody SaleItemRequestDTO saleItemRequestDTO) {

    return ResponseEntity.ok(saleItemService.save(saleItemRequestDTO));
  }

  @GetMapping
  public ResponseEntity<Collection<SaleItemResponseDTO>> findAllSalesItem(){
    return ResponseEntity.ok(saleItemService.findAll());
  }
}
