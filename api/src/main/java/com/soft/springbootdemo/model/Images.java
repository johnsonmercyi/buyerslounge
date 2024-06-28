package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.soft.springbootdemo.util.JSONConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity(name="images")
@Data
@AllArgsConstructor
public class Images {
  @Id
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "seller_product_id", referencedColumnName = "id", nullable = false, unique = false)
  private SellerProducts sellerProduct;

  @Column(columnDefinition = "json")
  @Convert(converter = JSONConverter.class)
  private List<String> images;

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;

  private LocalDateTime updated;

  public Images () {
    this(UUID.randomUUID(), null, new ArrayList<>(), null, null);
  }
}
