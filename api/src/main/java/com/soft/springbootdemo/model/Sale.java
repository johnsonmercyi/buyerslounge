package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Sale {
  @Id
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
  private Customer customer;

  @Column(nullable = false)
  private double saleTotal;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  @OneToMany(mappedBy = "sale")
  private Collection<SaleItem> saleItems;

  public Sale() {
    this(UUID.randomUUID(), null, 0, null, null, new ArrayList<>());
  }
}
