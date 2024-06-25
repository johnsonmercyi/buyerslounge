package com.soft.springbootdemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.soft.springbootdemo.dto.requestdto.SellerProductsRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SellerProductsResponseDTO;
import com.soft.springbootdemo.service.sellerProducts.SellerProductsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/seller_products")
@RequiredArgsConstructor
@Log4j2
public class SellerProductsController {

  private final SellerProductsService service;

  @GetMapping
  public ResponseEntity<SellerProductsResponseDTO> saveProduct(
      @RequestParam("sellerProducts") SellerProductsRequestDTO sellerProductDto,
      @RequestParam("files") MultipartFile images) {
        return ResponseEntity.ok(service.save(sellerProductDto, images));
  }
}
