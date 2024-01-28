package com.soft.springbootdemo.service.saleItem;

import java.util.Collection;
import java.util.UUID;

import com.soft.springbootdemo.dto.requestdto.SaleItemRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SaleItemResponseDTO;

public interface SaleItemService {
  public Collection<SaleItemResponseDTO> save(SaleItemRequestDTO saleItemDTO);
  public Collection<SaleItemResponseDTO> findBySaleId(UUID saleId);
  public Collection<SaleItemResponseDTO> findAll();
}
