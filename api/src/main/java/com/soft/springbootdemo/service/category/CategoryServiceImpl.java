package com.soft.springbootdemo.service.category;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

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
    return categoryRepo.findAll();
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
  
}
