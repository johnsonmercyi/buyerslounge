package com.soft.springbootdemo.service.category;

import java.util.UUID;

import com.soft.springbootdemo.dto.PagedResponse;
import com.soft.springbootdemo.dto.responsedto.CategoryProductsDTO;
import com.soft.springbootdemo.model.Category;
import com.soft.springbootdemo.service.Service;

public interface CategoryService extends Service<Category>{
  public PagedResponse<Category> findAll(int pageNo, int pageSize);
  public Category findByName(String name);
  public CategoryProductsDTO findCategoryProductsById(UUID id);
  PagedResponse<Category> findByNameContaining(String name, int pageNo, int pageSize);
}
