package com.soft.springbootdemo.controller;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.UserRegistrationDTO;
import com.soft.springbootdemo.dto.responsedto.AdminDTO;
import com.soft.springbootdemo.dto.responsedto.UserDTO;
import com.soft.springbootdemo.model.Admin;
import com.soft.springbootdemo.model.User;
import com.soft.springbootdemo.service.role.RoleService;
import com.soft.springbootdemo.service.admin.AdminService;
import com.soft.springbootdemo.service.user.UserService;
import com.soft.springbootdemo.util.Util;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@Log4j2
public class AdminController {
  private final AdminService adminService;
  private final RoleService roleService;
  private final UserService userService;

  // Get all admins
  @GetMapping
  public ResponseEntity<Collection<AdminDTO>> findAllAdmins() {
    return ResponseEntity.ok(adminService.findAll());
  }

  // Get Admin by id
  @GetMapping("/{id}")
  public ResponseEntity<Optional<AdminDTO>> findAdminById(@PathVariable UUID id) {
    return ResponseEntity.ok(adminService.findById(id));
  }

  // Save Admin
  @PostMapping
  public ResponseEntity<Admin> saveAdmin(@RequestBody UserRegistrationDTO userRegDTO) {
    // Prepare user
    User user = new User();
    user.setUsername(userRegDTO.getUsername());
    user.setPassword(userRegDTO.getPassword());
    user.setEmail(userRegDTO.getEmail());

    // Prepare user roles
    List<String> roles = List.of(Util.ADMIN_ROLE);

    // Prepare Admin
    Admin admin = new Admin();
    admin.setUser(user);
    admin.setFirstname(userRegDTO.getFirstname());
    admin.setLastname(userRegDTO.getLastname());
    admin.setGender(userRegDTO.getGender());
    admin.setAddress(userRegDTO.getAddress());
    admin.setNationality(userRegDTO.getNationality());
    admin.setDob(userRegDTO.getDob());

    // save admin
    return ResponseEntity.ok(adminService.saveAdmin(admin, user, roles));

  }

  // Update Admin
  @PostMapping("/{id}")
  public ResponseEntity<AdminDTO> updateAdmin(@PathVariable UUID id, @RequestBody UserRegistrationDTO userRegDTO) {
    UserDTO userDTO = userService.findByUsername(userRegDTO.getUsername());

    // Initialize user
    User user = new User();
    user.setId(userDTO.getId());
    user.setEmail(userRegDTO.getEmail());
    user.setPassword(userRegDTO.getPassword());
    user.setUsername(userRegDTO.getUsername());

    log.info("EMAIL: {}", userDTO.getEmail());

    // Initialize admin
    Admin admin = new Admin();
    admin.setFirstname(userRegDTO.getFirstname());
    admin.setLastname(userRegDTO.getLastname());
    admin.setAddress(userRegDTO.getAddress());
    admin.setNationality(userRegDTO.getNationality());
    admin.setDob(userRegDTO.getDob());
    admin.setGender(userRegDTO.getGender());

    return ResponseEntity.ok(adminService.updateAdmin(id, admin, user));

  }
}
