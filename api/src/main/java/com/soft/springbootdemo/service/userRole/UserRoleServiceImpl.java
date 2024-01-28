package com.soft.springbootdemo.service.userRole;

import java.util.Collection;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.model.User;
import com.soft.springbootdemo.model.UserRole;
import com.soft.springbootdemo.repo.UserRoleRepo;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class UserRoleServiceImpl implements UserRoleService {

  private final UserRoleRepo userRoleRepo;

  @Override
  public UserRole saveUserRole(UserRole userRole) {
    return userRoleRepo.save(userRole);
  }

  @Override
  public UserRole findByUser(User user) {
    return userRoleRepo.findByUserId(user.getId());
  }

  @Override
  public Collection<UserRole> findAll() {
    return userRoleRepo.findAll();
  }
   
}
