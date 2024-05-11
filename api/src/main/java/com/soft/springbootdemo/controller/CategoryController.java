package com.soft.springbootdemo.controller;

import java.util.Collection;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.PagedResponse;
import com.soft.springbootdemo.model.Category;
import com.soft.springbootdemo.service.category.CategoryService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("api/categories")
@RequiredArgsConstructor
@Log4j2
public class CategoryController {

  private final CategoryService categoryService;

  @GetMapping
  public PagedResponse<Category> findAllCategories(
      @RequestHeader(value = "pageNo", defaultValue = "0", required = false) int pageNo,
      @RequestHeader(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
    return categoryService.findAll(pageNo, pageSize);
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

  @PostMapping("/{id}")
  public ResponseEntity<Category> saveCategory(@RequestBody Category category, @PathVariable UUID id) {
    return ResponseEntity.ok(categoryService.update(id, category));
  }

  @PostMapping("/search")
  public PagedResponse<Category> searchCategories(
      @RequestHeader(value = "pageNo", defaultValue = "0", required = false) int pageNo,
      @RequestHeader(value = "pageSize", defaultValue = "10", required = false) int pageSize,
      @RequestHeader(value = "name", defaultValue = "", required = true) String name) {
    return categoryService.findByNameContaining(name, pageNo, pageSize);
  }

}

@Data
@AllArgsConstructor
@NoArgsConstructor
class SearchString {
  private String searchText;
}