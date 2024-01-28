package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class ReturnSale {
  @Id
  private UUID id;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "sale_id", referencedColumnName = "id", nullable = false)
  private Sale sale;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  public ReturnSale() {
    this(UUID.randomUUID(), null, null, null);
  }
}
