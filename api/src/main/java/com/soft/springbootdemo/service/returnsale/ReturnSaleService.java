package com.soft.springbootdemo.service.returnsale;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import com.soft.springbootdemo.dto.requestdto.ReturnSaleRequestDTO;
import com.soft.springbootdemo.dto.responsedto.ReturnSaleResponseDTO;

public interface ReturnSaleService {
  public ReturnSaleResponseDTO save(ReturnSaleRequestDTO returnSaleRequestDTO);
  public Collection<ReturnSaleResponseDTO> findAll();
  public Optional<ReturnSaleResponseDTO> findById(UUID id);
  public ReturnSaleResponseDTO findBySaleId(UUID saleId);
}
