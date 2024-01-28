package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Product {
  @Id
  private UUID id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false, unique = false)
  private Category category;

  @Column(nullable = false)
  private String name; 

  private String description;

  @Column(nullable = false, columnDefinition = "DOUBLE DEFAULT 0.0")
  private double cost;

  @Column(nullable = false, columnDefinition = "DOUBLE DEFAULT 0.0")
  private double price;

  @Column(name = "ref_no", nullable = false, unique = false)
  private UUID refNo;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  public Product() {
    this(UUID.randomUUID(), null, null, null, 0d, 0d, UUID.randomUUID(), null, null);
  }
}
