package com.soft.springbootdemo.service.category;

import com.soft.springbootdemo.model.Category;
import com.soft.springbootdemo.service.Service;

public interface CategoryService extends Service<Category>{
  public Category findByName(String name);
}
