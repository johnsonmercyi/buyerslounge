package com.soft.springbootdemo.service.admin;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.responsedto.AdminDTO;
import com.soft.springbootdemo.model.Admin;
import com.soft.springbootdemo.model.User;
import com.soft.springbootdemo.repo.AdminRepo;
import com.soft.springbootdemo.repo.UserRepo;
import com.soft.springbootdemo.service.user.UserService;
import com.soft.springbootdemo.util.Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServicImpl implements AdminService {
  private final AdminRepo adminRepo;
  private final UserService userService;
  private final UserRepo userRepo;

  // Save admin
  @Override
  public Admin saveAdmin(Admin admin, User user, List<String> roles) {
    if (admin == null) {
      return null;
    }

    // save user first
    userService.saveUserWithRoles(user, roles);
    // Then save the admin
    return adminRepo.save(admin);
  }

  @Override
  public Optional<AdminDTO> findById(UUID id) {
    Optional<Admin> optionalAdmin = adminRepo.findById(id);
    if (optionalAdmin.isPresent()) {
      Admin admin = optionalAdmin.get();
      return Optional.ofNullable(Util.mapAdminToDTO(admin, true));
    }
    return Optional.empty();
  }

  @Override
  public Collection<AdminDTO> findAll() {
    List<Admin> admins = adminRepo.findAll();
    List<AdminDTO> adminDTOs = new ArrayList<>();

    for (Admin admin : admins) {
      adminDTOs.add(Util.mapAdminToDTO(admin, false));
    }
    return adminDTOs; // returns all admins
  }

  @Override
  public AdminDTO updateAdmin(UUID uuid, Admin admin, User user) {
    Optional<Admin> opAdmin = adminRepo.findById(uuid);
    if (opAdmin.isPresent()) {
      Admin oldAdmin = opAdmin.get();
      // update user
      userService.updateUser(user.getId(), user);

      // update Admin
      oldAdmin.setFirstname(admin.getFirstname());
      oldAdmin.setLastname(admin.getLastname());
      oldAdmin.setGender(admin.getGender());
      oldAdmin.setAddress(admin.getAddress());
      oldAdmin.setNationality(admin.getNationality());
      oldAdmin.setDob(admin.getDob());
      oldAdmin.setUpdated(LocalDateTime.now());

      return Util.mapAdminToDTO(adminRepo.save(oldAdmin), true);
    }
    return null;
  }
}
