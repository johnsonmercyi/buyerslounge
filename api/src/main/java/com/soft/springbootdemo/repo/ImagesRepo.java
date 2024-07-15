package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.Images;
import com.soft.springbootdemo.model.SellerProducts;

public interface ImagesRepo extends JpaRepository<Images, UUID> {
  public Images findBySellerProduct(SellerProducts sellerProduct);
  public void deleteBySellerProduct(SellerProducts sellerProduct);
}
