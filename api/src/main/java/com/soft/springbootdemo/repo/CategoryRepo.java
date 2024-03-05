package com.soft.springbootdemo.repo;

import java.util.Collection;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.Category;

public interface CategoryRepo extends JpaRepository<Category, UUID> {
  public Category findByName(String name);
  public Collection<Category> findByNameContaining(String searchString);
}
