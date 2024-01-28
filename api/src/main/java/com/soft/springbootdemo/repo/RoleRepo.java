package com.soft.springbootdemo.repo;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.soft.springbootdemo.model.Role;

public interface RoleRepo extends JpaRepository<Role, UUID> {
  public Role findByName(String role);
}
