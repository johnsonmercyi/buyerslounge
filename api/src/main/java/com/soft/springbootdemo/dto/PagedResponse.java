package com.soft.springbootdemo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagedResponse<T> {
  private List<T> content;
  private int pageNo;
  private int numberOfElements;
  private int pageSize;
  private long totalElements;
  private int totalPages;
  private boolean last;
  private boolean first;
}
