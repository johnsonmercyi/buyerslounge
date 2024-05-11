package com.soft.springbootdemo.service.category;

import com.soft.springbootdemo.dto.PagedResponse;
import com.soft.springbootdemo.model.Category;
import com.soft.springbootdemo.service.Service;

public interface CategoryService extends Service<Category>{
  public PagedResponse<Category> findAll(int pageNo, int pageSize);
  public Category findByName(String name);
  PagedResponse<Category> findByNameContaining(String name, int pageNo, int pageSize);
}
