package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.SaleItem;

public interface SaleItemRepo extends JpaRepository<SaleItem, UUID> {
  public SaleItem findBySaleId(UUID saleId);
}
