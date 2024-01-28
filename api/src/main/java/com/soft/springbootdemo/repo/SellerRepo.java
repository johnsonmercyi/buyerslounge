package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.Seller;

public interface SellerRepo extends JpaRepository<Seller, UUID> {
  
}