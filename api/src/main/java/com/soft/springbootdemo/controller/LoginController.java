package com.soft.springbootdemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.LoginDTO;
import com.soft.springbootdemo.dto.responsedto.UserDTO;
import com.soft.springbootdemo.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {
  private final UserService userService;

  @PostMapping
  public ResponseEntity<UserDTO> login(@RequestBody LoginDTO loginDTO) {
    return ResponseEntity.ok(userService.login(loginDTO));
  }
}
