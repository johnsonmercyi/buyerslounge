package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.Images;

public interface ImagesRepo extends JpaRepository<Images, UUID> {
  public Images findBySellerProduct();
}
