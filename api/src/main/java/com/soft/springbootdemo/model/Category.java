package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Category {
  @Id
  private UUID id;

  @Column(unique = true, nullable = false)
  private String name;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  public Category() {
    this(UUID.randomUUID(), null, null, null);
  }
}
