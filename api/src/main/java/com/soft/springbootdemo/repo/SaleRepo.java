package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.Sale;

public interface SaleRepo extends JpaRepository<Sale, UUID> {
  
}
