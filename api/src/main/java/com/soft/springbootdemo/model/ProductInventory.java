package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class ProductInventory {
  
  @Id
  private UUID id;

  @OneToOne
  @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
  private Product product;
  
  @Column(nullable = false)
  private int quantity;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  public ProductInventory() {
    this(UUID.randomUUID(), null, 0, null, null);
  }
}
