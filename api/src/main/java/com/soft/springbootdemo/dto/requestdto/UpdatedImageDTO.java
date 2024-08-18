package com.soft.springbootdemo.dto.requestdto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatedImageDTO {
  private List<String> newImages;
  private List<String> updatedImages;
  private List<String> deletedImages;
  private List<String> allAddedImages;
}
