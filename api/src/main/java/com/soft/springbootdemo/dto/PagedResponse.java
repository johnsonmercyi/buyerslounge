package com.soft.springbootdemo.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PagedResponse<T> {
  private List<T> content;
  private int pageNo;
  private int numberOfElements;
  private int pageSize;
  private long totalElements;
  private int totalPages;
  private boolean last;
}
