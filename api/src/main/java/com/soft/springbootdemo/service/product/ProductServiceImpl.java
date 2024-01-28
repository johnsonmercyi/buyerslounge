package com.soft.springbootdemo.service.product;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.ProductDTO;
import com.soft.springbootdemo.model.Category;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.repo.CategoryRepo;
import com.soft.springbootdemo.repo.ProductRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class ProductServiceImpl implements ProductService {
  private final ProductRepo productRepo;
  private final CategoryRepo categoryRepo;

  @Override
  public Product save(Product product) {
    return productRepo.save(product);
  }

  @Override
  public Optional<Product> findById(UUID id) {
    return productRepo.findById(id);
  }

  @Override
  public Collection<Product> findAll() {
    return productRepo.findAll();
  }

  @Override
  public Product update(UUID uuid, Product product) {
    return productRepo.save(product);
  }

  @Override
  public Product update(UUID id, ProductDTO productDTO) {
    Optional<Product> product = productRepo.findById(id);
    Optional<Category> category = categoryRepo.findById(productDTO.getCategoryId());
    if (product.isPresent()) {

      Product oldProduct = product.get();

      if (category.isPresent()) {
        oldProduct.setCategory(category.get());
      }

      oldProduct.setName(productDTO.getName());
      oldProduct.setDescription(productDTO.getDescription());
      oldProduct.setCost(productDTO.getCost());
      oldProduct.setPrice(productDTO.getPrice());

      return productRepo.save(oldProduct);
    }

    return null;
  }

  @Override
  public Product findByRefNo(UUID refNo) {
    return productRepo.findByRefNo(refNo);
  }

  @Override
  public Collection<Product> findByCategoryName(String catName) {
    List<Product> products = productRepo.findAll();
    List<Product> holdProd = new ArrayList<>();
   
    for(Product p : products){
      if(p.getCategory().getName().equalsIgnoreCase(catName)){
        holdProd.add(p);
      }
    }
    return holdProd;
  }

  @Override
  public Collection<Product> findByCategoryId(UUID catId) {
    return productRepo.findAll().stream()
    .filter(product -> product.getCategory().getId().equals(catId))
    .toList();
  }  

}
