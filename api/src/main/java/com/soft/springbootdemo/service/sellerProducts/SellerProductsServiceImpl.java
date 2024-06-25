package com.soft.springbootdemo.service.sellerProducts;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.soft.springbootdemo.dto.requestdto.SellerProductsRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SellerProductsResponseDTO;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.model.SellerProducts;
import com.soft.springbootdemo.repo.ProductRepo;
import com.soft.springbootdemo.repo.SellerProductsRepo;
import com.soft.springbootdemo.util.Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SellerProductsServiceImpl implements SellerProductsService {

  private final SellerProductsRepo sellerProductsRepo;
  private final ProductRepo productRepo;

  @Override
  public SellerProductsResponseDTO save(SellerProductsRequestDTO sellerProductsDto, MultipartFile images) {
    // return Util.convertSellerProductsToResponseDTO(
    //   sellerProductsRepo.save(sellerProducts), false);
    SellerProducts sp = new SellerProducts();
    
    return null;
  }

  @Override
  public Collection<SellerProductsResponseDTO> findAllInventory() {
    List<SellerProductsResponseDTO> sellerProducts = new ArrayList<>();
    List<SellerProducts> allSellerProducts = sellerProductsRepo.findAll();
    for (SellerProducts sellerProduct : allSellerProducts) {
      sellerProducts.add(Util.convertSellerProductsToResponseDTO(sellerProduct, false));
    }
    return sellerProducts;
  }

  @Override
  public Collection<SellerProductsResponseDTO> findByProductId(UUID productId) {
    List<SellerProducts> sellerProducts = sellerProductsRepo.findByProductId(productId);
    List<SellerProductsResponseDTO> sellerProductsResponseList = new ArrayList<>();

    for (SellerProducts sellerProduct : sellerProducts) {
      sellerProductsResponseList.add(Util.convertSellerProductsToResponseDTO(sellerProduct, false));
    }
    return sellerProductsResponseList;
  }

  @Override
  public Collection<SellerProductsResponseDTO> findBySellerId(UUID sellerId) {
    List<SellerProducts> sellerProducts = sellerProductsRepo.findBySellerId(sellerId);
    List<SellerProductsResponseDTO> sellerProductsResponseList = new ArrayList<>();

    for (SellerProducts sellerProduct : sellerProducts) {
      sellerProductsResponseList.add(Util.convertSellerProductsToResponseDTO(sellerProduct, false));
    }
    return sellerProductsResponseList;
  }

  @Override
  public SellerProductsResponseDTO update(UUID sellerProductId, SellerProductsRequestDTO sellerProductsRequestDTO) {
    Optional<Product> optProduct = productRepo.findById(sellerProductsRequestDTO.getProductId());
    if (optProduct.isPresent()) {
      Optional<SellerProducts> optSellerProducts = sellerProductsRepo.findById(sellerProductId);
      if (optSellerProducts.isPresent()) {
        SellerProducts oldSellerProduct = optSellerProducts.get();
        oldSellerProduct.setProduct(optProduct.get());
        oldSellerProduct.setQuantity(sellerProductsRequestDTO.getQuantity());
        // save
        return Util.convertSellerProductsToResponseDTO(sellerProductsRepo.save(oldSellerProduct), false);
      }
    }
    return null;
  }

  @Override
  public void updateProductQty(UUID sellerProductsId, int quantity, boolean productAdded) {
    Optional<SellerProducts> optSellerProducts = sellerProductsRepo.findById(sellerProductsId);
    if (optSellerProducts.isPresent()) {
      SellerProducts sp = optSellerProducts.get();
      if (productAdded) {
        sp.setQuantity(sp.getQuantity() + quantity);
      } else {
        if (sp.getQuantity() >= quantity) {
          sp.setQuantity(sp.getQuantity() - quantity);
        }
      }
      sellerProductsRepo.save(sp);
    }
  }
  
}
