package com.soft.springbootdemo.repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.ProductInventory;

public interface ProductInventoryRepo extends JpaRepository<ProductInventory, UUID>{
    public Optional<ProductInventory> findByProductId(UUID id);    
} 
