package com.soft.springbootdemo.service.product;

import java.util.Collection;
import java.util.UUID;

import com.soft.springbootdemo.dto.ProductDTO;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.service.Service;

public interface ProductService extends Service<Product> {
  public Product findByRefNo(UUID id);
  public Collection<Product> findByCategoryName(String catName);
  public Collection<Product> findByCategoryId(UUID catId);
  public Product update(UUID id, ProductDTO productDTO);
}
