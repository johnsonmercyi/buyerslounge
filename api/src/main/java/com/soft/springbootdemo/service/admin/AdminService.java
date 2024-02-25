package com.soft.springbootdemo.service.admin;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.soft.springbootdemo.dto.responsedto.AdminDTO;
import com.soft.springbootdemo.model.Admin;
import com.soft.springbootdemo.model.User;

public interface AdminService {
  public Admin saveAdmin(Admin admin, User user, List<String> roles);

    public Optional<AdminDTO> findById(UUID id);

    public Collection<AdminDTO> findAll();

    public AdminDTO updateAdmin(UUID uuid, Admin admin, User user);
}