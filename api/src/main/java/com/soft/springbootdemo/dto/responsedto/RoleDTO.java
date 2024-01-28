package com.soft.springbootdemo.dto.responsedto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO {
  private UUID id;
  private String name;
  private LocalDateTime created;
  private LocalDateTime updated;
}
