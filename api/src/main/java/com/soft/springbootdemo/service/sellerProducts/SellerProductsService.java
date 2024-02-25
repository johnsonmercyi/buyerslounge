package com.soft.springbootdemo.service.sellerProducts;

import java.util.Collection;
import java.util.UUID;

import com.soft.springbootdemo.dto.requestdto.SellerProductsRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SellerProductsResponseDTO;
import com.soft.springbootdemo.model.SellerProducts;

public interface SellerProductsService {
  public SellerProductsResponseDTO save(SellerProducts sellerProducts);

  public Collection<SellerProductsResponseDTO> findAllInventory();

  public Collection<SellerProductsResponseDTO> findByProductId(UUID productId);

  public Collection<SellerProductsResponseDTO> findBySellerId(UUID sellerId);

  public SellerProductsResponseDTO update(UUID sellerProductId, SellerProductsRequestDTO sellerProductsRequestDTO);

  public void updateProductQty(UUID sellerProductsId, int quantity, boolean productAdded);
}
