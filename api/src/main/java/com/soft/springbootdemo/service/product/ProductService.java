package com.soft.springbootdemo.service.product;

import java.util.Collection;
import java.util.UUID;

import com.soft.springbootdemo.dto.PagedResponse;
import com.soft.springbootdemo.dto.requestdto.RequestProductDTO;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.service.Service;

public interface ProductService extends Service<Product> {
  public PagedResponse<Product> allProducts(int pageNo, int pageSize);
  public Collection<Product> findByCategoryName(String catName);
  public Collection<Product> findByCategoryId(UUID catId);
  public Product update(UUID id, RequestProductDTO dto);
  public PagedResponse<Product> findAll(int pageNo, int pageSize);
  PagedResponse<Product> findByNameContaining(String name, int pageNo, int pageSize);
}
