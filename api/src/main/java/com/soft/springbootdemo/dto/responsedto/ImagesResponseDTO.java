package com.soft.springbootdemo.dto.responsedto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImagesResponseDTO {
  private UUID id;
  private List<String> images;
  private LocalDateTime created;
  private LocalDateTime updated;
}
