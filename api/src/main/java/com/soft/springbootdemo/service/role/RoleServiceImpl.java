package com.soft.springbootdemo.service.role;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.model.Role;
import com.soft.springbootdemo.repo.RoleRepo;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {

  private final RoleRepo roleRepo;

  @Override
  public Role saveRole(Role role) {
    return roleRepo.save(role);
  }

  @Override
  public Optional<Role> findById(UUID id) {
    return roleRepo.findById(id);
  }

  @Override
  public Role findByName(String name) {
    return roleRepo.findByName(name);
  }

  @Override
  public Collection<Role> findAll() {
    return roleRepo.findAll();
  }

  @Override
  public Role updateRole(UUID uuid, Role user) {
    return null;
  }
  
}
