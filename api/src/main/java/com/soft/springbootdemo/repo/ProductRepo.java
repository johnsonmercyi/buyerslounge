package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.Product;

public interface ProductRepo extends JpaRepository<Product, UUID> {
  public Product findByRefNo(UUID refNo);
}
