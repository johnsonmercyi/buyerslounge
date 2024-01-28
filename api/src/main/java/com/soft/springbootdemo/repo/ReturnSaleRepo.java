package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.ReturnSale;

public interface ReturnSaleRepo extends JpaRepository<ReturnSale, UUID> {
    public ReturnSale findBySaleId(UUID id);
}
