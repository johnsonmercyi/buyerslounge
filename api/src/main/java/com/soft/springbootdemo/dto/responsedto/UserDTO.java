package com.soft.springbootdemo.dto.responsedto;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

import com.soft.springbootdemo.model.User.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
  private UUID id;
  private String username;
  private String password;
  private String email;
  private String status;
  private LocalDateTime created;
  private LocalDateTime updated;
  private Collection<RoleDTO> userRoles;
}
