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
@AllArgsConstructor
@Data
public class SaleItem {
  @Id
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "sale_id", referencedColumnName = "id", nullable = false)
  private Sale sale;

  @ManyToOne
  @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
  private Product product;

  @ManyToOne
  @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
  private Seller seller;

  @Column(nullable = false)
  private int quantity;

  @Column(nullable = false)
  private double total;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  public SaleItem() {
    this(UUID.randomUUID(), null, null, null, 0, 0d, null, null);
  }
}
