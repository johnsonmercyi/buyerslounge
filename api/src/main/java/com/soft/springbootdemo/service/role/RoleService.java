package com.soft.springbootdemo.service.role;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import com.soft.springbootdemo.model.Role;

public interface RoleService {
  public Role saveRole(Role role);

  public Optional<Role> findById(UUID id);

  public Role findByName(String name);

  public Collection<Role> findAll();

  public Role updateRole(UUID uuid, Role user);
}
