package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.Product;

public interface ProductRepo extends JpaRepository<Product, UUID> {
    public Product findByName(String name);
    public Page<Product> findByNameContaining(String name, Pageable pageable);
}
