package com.soft.springbootdemo.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.PagedResponse;
import com.soft.springbootdemo.dto.ProductDTO;
import com.soft.springbootdemo.dto.requestdto.RequestProductDTO;
import com.soft.springbootdemo.model.Category;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.service.category.CategoryService;
import com.soft.springbootdemo.service.product.ProductService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Log4j2
public class ProductController {
  private final ProductService productService;
  private final CategoryService categoryService;

  @GetMapping
  public ResponseEntity<Object> findAllProducts(
    @RequestHeader(value = "paginate", defaultValue = "true", required = false) boolean paginate,
    @RequestHeader(value = "pageNo", defaultValue = "0", required = false) int pageNo,
    @RequestHeader(value = "pageSize", defaultValue = "10", required = false) int pageSize){

      if (paginate){
        return ResponseEntity.ok(productService.findAll(pageNo, pageSize));
      } else {
        return ResponseEntity.ok(productService.findAll());
      }

  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> findProductById(@PathVariable UUID id) {
    return ResponseEntity.ok(productService.findById(id).get());
  }
  //Get products by Category Name
  @GetMapping("/catname/{catName}")
  public ResponseEntity<Collection<Product>> findProductByCatName(@PathVariable String catName) {
    return ResponseEntity.ok(productService.findByCategoryName(catName));
  }

  @GetMapping("/cat_id/{catId}")
  public ResponseEntity<Collection<Product>> findProductByCatId(@PathVariable UUID catId) {
    log.info("Cat ID: {}", catId);
    return ResponseEntity.ok(productService.findByCategoryId(catId));
  }

  @PostMapping
  public ResponseEntity<Object> saveProduct(@RequestBody ProductDTO productDTO) {
    Optional<Category> optCategory = categoryService.findById(productDTO.getCategoryId());
    if (optCategory.isPresent()) {
      Category category = optCategory.get();

      Product product = new Product();
      product.setCategory(category);
      product.setName(productDTO.getName());

      return ResponseEntity.ok(productService.save(product));
    }

    Map<String, Object> error = new HashMap<>();
    error.put("error code", HttpStatus.FAILED_DEPENDENCY);
    error.put("error", true);
    error.put("message", "Couldn't find category");

    return ResponseEntity.badRequest().body(error);

    // return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).build();
  }

  //Update Product
  @PostMapping("/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable UUID id, @RequestBody RequestProductDTO dto){
    return ResponseEntity.ok(productService.update(id, dto));
  }

  @PostMapping("/search")
  public PagedResponse<Product> searchProducts(
    @RequestHeader(value = "pageNo", defaultValue = "0", required = false) int pageNo,
    @RequestHeader(value = "pageSize", defaultValue = "10", required = false) int pageSize,
    @RequestHeader(value = "name", defaultValue = "", required = true) String name){

    return productService.findByNameContaining(name, pageNo, pageSize);
  }
}

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// class SearchString{
//   private String searchText;
// }
