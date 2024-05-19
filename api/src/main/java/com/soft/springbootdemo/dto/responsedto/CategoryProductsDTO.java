package com.soft.springbootdemo.dto.responsedto;

import java.util.Collection;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryProductsDTO {
  private UUID id;
  private String name;
  private Collection<CustomProduct> products;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class CustomProduct {
    private UUID id;
    private String name;
  }
}
