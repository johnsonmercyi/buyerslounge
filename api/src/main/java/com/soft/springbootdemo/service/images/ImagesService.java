package com.soft.springbootdemo.service.images;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.soft.springbootdemo.model.Images;
import com.soft.springbootdemo.model.SellerProducts;

public interface ImagesService {
  public Images saveImages(SellerProducts sellerProduct, MultipartFile[] images);
  public Images updateImages(UUID id, MultipartFile[] images);
  public Images findBySellerProduct(SellerProducts sellerProduct);
  public boolean delete(SellerProducts sp);
}
