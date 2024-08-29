package com.soft.springbootdemo.service.images;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.soft.springbootdemo.dto.requestdto.UpdatedImageInfoDTO;
import com.soft.springbootdemo.model.Images;
import com.soft.springbootdemo.model.SellerProducts;

public interface ImagesService {
  public Images saveImages(SellerProducts sellerProduct, MultipartFile[] images, List<String> imagesAngles);
  public Images updateImages(SellerProducts sellerProduct, MultipartFile[] images, UpdatedImageInfoDTO updatedImageInfoDto);
  public Images findBySellerProduct(SellerProducts sellerProduct);
  public boolean delete(SellerProducts sp);
}
