package com.soft.springbootdemo.repo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.SellerProducts;

public interface SellerProductsRepo extends JpaRepository<SellerProducts, UUID> {
  public List<SellerProducts> findBySellerId(UUID seller_id);

  public List<SellerProducts> findByProductId(UUID product_id);

  public Optional<SellerProducts> findById(UUID id); //findBy(UUID seller_product_id);

  public void deleteById(UUID id);
}
