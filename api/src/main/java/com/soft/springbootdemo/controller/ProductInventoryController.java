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

import com.soft.springbootdemo.dto.requestdto.ProductInventoryRequestDTO;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.model.ProductInventory;
import com.soft.springbootdemo.repo.ProductRepo;
import com.soft.springbootdemo.service.ProductInventory.ProductInventoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/inventories")
@RequiredArgsConstructor
public class ProductInventoryController {

  private final ProductInventoryService pis;
  private final ProductRepo productRepo;

  @GetMapping
  public ResponseEntity<Collection<ProductInventory>> findAllInventory() {
    return ResponseEntity.ok(pis.findAllInventory());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<ProductInventory>> findInventoryByProductId(@PathVariable UUID id) {
    return ResponseEntity.ok(pis.findByProductId(id));
  }

  @PostMapping
  public ResponseEntity<ProductInventory> saveInventory(
      @RequestBody ProductInventoryRequestDTO productInventoryRequestDTO) {
    Optional<Product> optProduct = productRepo.findById(productInventoryRequestDTO.getProductId());
    if (optProduct.isPresent()) {
      ProductInventory productInventory = new ProductInventory();
      productInventory.setProduct(optProduct.get());
      productInventory.setQuantity(productInventoryRequestDTO.getQuantity());
      return ResponseEntity.ok(pis.save(productInventory));
    }
    return null;
  }

  @PostMapping("/{inventoryId}")
  public ResponseEntity<ProductInventory> updateInventory(@PathVariable UUID inventoryId,
      @RequestBody ProductInventoryRequestDTO productInventoryRequestDTO) {
    return ResponseEntity.ok(pis.update(inventoryId, productInventoryRequestDTO));
  }

}
