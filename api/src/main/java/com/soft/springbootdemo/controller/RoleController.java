package com.soft.springbootdemo.controller;

import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.responsedto.RoleDTO;
import com.soft.springbootdemo.model.Role;
import com.soft.springbootdemo.service.role.RoleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {
  
  private final RoleService roleService;

  @GetMapping
  public ResponseEntity<Collection<Role>> getRoles() {
    return ResponseEntity.ok(roleService.findAll());
  }

  @PostMapping
  public ResponseEntity<Role> saveRole(@RequestBody RoleDTO role) {
    Role demoRole = new Role();
    demoRole.setName(role.getName());
    
    Role savedRole = roleService.saveRole(demoRole);
    return ResponseEntity.ok(savedRole);
  }
 
}
