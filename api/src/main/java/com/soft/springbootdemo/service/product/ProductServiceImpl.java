package com.soft.springbootdemo.service.product;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.PagedResponse;
import com.soft.springbootdemo.dto.requestdto.RequestProductDTO;
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
  public PagedResponse<Product> findAll(int pageNo, int pageSize){
    Pageable pageable = PageRequest.of(pageNo, pageSize);
    Page<Product> page = productRepo.findAll(pageable);

    PagedResponse<Product> response = new PagedResponse<>();
    response.setContent(page.getContent());
    response.setLast(page.isLast());
    response.setPageNo(page.getNumber());
    response.setNumberOfElements(page.getNumberOfElements());
    response.setPageSize(page.getSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());

    return response;
  }

  @Override
  public PagedResponse<Product> allProducts(int pageNo, int pageSize) {
    Pageable pageable = PageRequest.of(pageNo, pageSize);
    Page<Product> page = productRepo.findAll(pageable);
    return new PagedResponse<>(
      page.getContent(), 
      page.getNumber(), 
      page.getNumberOfElements(), 
      page.getSize(), 
      page.getTotalElements(), 
      page.getTotalPages(), 
      page.isLast(),
      page.isFirst()
    );
  }

  @Override
  public Product update(UUID uuid, Product product) {
    return productRepo.save(product);
  }

  @Override
  public Product update(UUID id, RequestProductDTO dto) {
    Optional<Product> product = productRepo.findById(id);
    Optional<Category> category = categoryRepo.findById(dto.getCategoryId());
    if (product.isPresent()) {

      Product oldProduct = product.get();

      if (category.isPresent()) {
        oldProduct.setCategory(category.get());
      }

      oldProduct.setName(dto.getName());

      return productRepo.save(oldProduct);
    }

    return null;
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

  @Override
  public PagedResponse<Product> findByNameContaining(String name, int pageNo, int pageSize){

    Pageable pageable = PageRequest.of(pageNo, pageSize);
    Page<Product> page = productRepo.findByNameContaining(name, pageable);

    PagedResponse<Product> response = new PagedResponse<>();
    response.setContent(page.getContent());
    response.setLast(page.isLast());
    response.setPageNo(page.getNumber());
    response.setNumberOfElements(page.getNumberOfElements());
    response.setPageSize(page.getSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());

    return response;
  }

}
