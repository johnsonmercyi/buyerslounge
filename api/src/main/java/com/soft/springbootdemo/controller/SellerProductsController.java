package com.soft.springbootdemo.controller;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soft.springbootdemo.dto.requestdto.SellerProductsRequestDTO;
import com.soft.springbootdemo.dto.responsedto.CategoryProductsDTO;
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

  // @PostMapping
  @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
  public ResponseEntity<SellerProductsResponseDTO> saveProduct(
      @RequestParam("sellerProducts") String sellerProductJson,
      @RequestParam("files") MultipartFile[] images) {

    try {
      ObjectMapper objectMapper = new ObjectMapper();
      SellerProductsRequestDTO sellerProductDto = 
      objectMapper.readValue(sellerProductJson, SellerProductsRequestDTO.class);

      return ResponseEntity.ok(service.save(sellerProductDto, images));
      
    } catch (Exception ex) {
      log.error("Error parsing JSON: ", ex);
      throw new RuntimeException("Unexpected error occured: " + ex.getMessage());
    }
  }

  @GetMapping
  public ResponseEntity<Collection<SellerProductsResponseDTO>> fetchAll() {
    return ResponseEntity.ok(service.findAllInventory());
  }


  @GetMapping("/{id}")
  public ResponseEntity<Optional<SellerProductsResponseDTO>> findSellerPoductById(@PathVariable UUID id) {
    return ResponseEntity.ok(service.findBySellerProductId(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteProduct(@PathVariable UUID id) {
    return ResponseEntity.ok(service.delete(id));
  }
  
}
