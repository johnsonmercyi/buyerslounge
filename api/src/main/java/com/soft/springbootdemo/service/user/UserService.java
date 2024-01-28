package com.soft.springbootdemo.service.user;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.soft.springbootdemo.dto.LoginDTO;
import com.soft.springbootdemo.dto.responsedto.UserDTO;
import com.soft.springbootdemo.model.User;

public interface UserService {
  public User saveUser(User user);
  public User saveUserWithRoles(User user, List<String> roles);
  public Optional<UserDTO> findById(UUID id);
  public UserDTO findByUsername(String username);
  public UserDTO findByEmail(String email);
  public Collection<UserDTO> findAll();
  public UserDTO updateUser(UUID uuid, User user);
  public UserDTO login(LoginDTO loginDTO);
}
