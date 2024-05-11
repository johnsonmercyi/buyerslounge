package com.soft.springbootdemo.service.category;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.PagedResponse;
import com.soft.springbootdemo.model.Category;
import com.soft.springbootdemo.repo.CategoryRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepo categoryRepo;

  @Override
  public Category save(Category category) {
    return categoryRepo.save(category);
  }

  @Override
  public Optional<Category> findById(UUID id) {
    return categoryRepo.findById(id);
  }

  @Override
  public Category findByName(String name) {
    return categoryRepo.findByName(name);
  }

  @Override
  public Collection<Category> findAll() {
    return null;
  }

  @Override
  public PagedResponse<Category> findAll(int pageNo, int pageSize) {
    Pageable pageable = PageRequest.of(pageNo, pageSize);
    Page<Category> page = categoryRepo.findAll(pageable);
    
    PagedResponse<Category> response = new PagedResponse<>();
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
  public Category update(UUID uuid, Category cat) {
    Optional<Category> optCategory = findById(uuid);
    if (optCategory.isPresent()) {
      Category category = optCategory.get();
      category.setName(cat.getName());
      return categoryRepo.save(category);
    }
    return null;
  }

  @Override
  public PagedResponse<Category> findByNameContaining(String name, int pageNo, int pageSize) {

    Pageable pageable = PageRequest.of(pageNo, pageSize);
    Page<Category> page = categoryRepo.findByNameContaining(name, pageable);

    PagedResponse<Category> response = new PagedResponse<>();
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
