package com.soft.springbootdemo.controller;

import java.util.Collection;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.model.Category;
import com.soft.springbootdemo.service.category.CategoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("api/categories")
@RequiredArgsConstructor
public class CategoryController {

  private final CategoryService categoryService;

  @GetMapping
  public ResponseEntity<Collection<Category>> findAllCategories() {
    return ResponseEntity.ok(categoryService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Category> findById(@PathVariable UUID id) {
    return ResponseEntity.ok(categoryService.findById(id).get());
  }

  @GetMapping("/name/{category}")
  public ResponseEntity<Category> findByName(@PathVariable String category) {
    return ResponseEntity.ok(categoryService.findByName(category));
  }

  @PostMapping
  public ResponseEntity<Category> saveCategory(@RequestBody Category category) {
    return ResponseEntity.ok(categoryService.save(category));
  }

  @PostMapping("{id}")
  public ResponseEntity<Category> saveCategory(@RequestBody Category category, @PathVariable UUID id) {
    return ResponseEntity.ok(categoryService.update(id, category));
  }

}
