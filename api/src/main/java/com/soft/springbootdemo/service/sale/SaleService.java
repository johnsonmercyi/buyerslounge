package com.soft.springbootdemo.service.sale;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import com.soft.springbootdemo.dto.requestdto.SaleRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SaleResponseDTO;

public interface SaleService {
  public SaleResponseDTO save(SaleRequestDTO dto);
  public Optional<SaleResponseDTO> findById(UUID id);
  public Collection<SaleResponseDTO> findAll();
  public SaleResponseDTO update(UUID uuid, SaleRequestDTO t);
}
