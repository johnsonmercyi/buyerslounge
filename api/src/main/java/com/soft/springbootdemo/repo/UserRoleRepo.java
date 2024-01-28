package com.soft.springbootdemo.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soft.springbootdemo.model.UserRole;

public interface UserRoleRepo extends JpaRepository<UserRole, UUID> {
  public UserRole findByUserId(UUID id);
}
