package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
// import lombok.NoArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Data
// @NoArgsConstructor
@AllArgsConstructor
public class Role {
  @Id
  private UUID id;

  @Column(unique = true, nullable = false)
  private String name;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  @OneToMany(mappedBy = "role", orphanRemoval=true)
  private Collection<UserRole> userRoles;

  public Role() {
    this(UUID.randomUUID(), null, null, null, new ArrayList<>());
  }
}
