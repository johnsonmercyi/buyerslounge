package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.Category;

public interface CategoryRepo extends JpaRepository<Category, UUID> {
  public Category findByName(String name);
  public Page<Category> findByNameContaining(String name, Pageable pageable);
}
