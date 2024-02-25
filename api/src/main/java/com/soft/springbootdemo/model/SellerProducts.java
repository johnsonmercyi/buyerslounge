package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class SellerProducts {
  @Id
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
  private Seller seller;

  @ManyToOne
  @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
  private Product product;

  @Column(nullable = false)
  private int quantity;

  @Column(nullable = false, columnDefinition = "DOUBLE DEFAULT 0.0")
  private double cost;

  @Column(nullable = false, columnDefinition = "DOUBLE DEFAULT 0.0")
  private double price;

  private String description;

  @Column(name = "ref_no", nullable = false, unique = false)
  private UUID refNo;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  public SellerProducts() {
    this(UUID.randomUUID(), null, null, 0, 0, 0, null, UUID.randomUUID(), null, null);
  }
}
