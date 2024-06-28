package com.soft.springbootdemo.service.images;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.soft.springbootdemo.model.Images;
import com.soft.springbootdemo.model.SellerProducts;
import com.soft.springbootdemo.repo.ImagesRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class ImagesServiceImpl implements ImagesService {

  @Value("${storage.image-dir}")
  private String IMAGE_DIR;

  private final ImagesRepo repo;

  @Override
  public Images saveImages(SellerProducts sellerProduct, MultipartFile[] images) {
    try {
      List<String> imageUrls = new ArrayList<>();
  
      // Ensure the upload directory exists
      File uploadDir = new File(IMAGE_DIR);
      if (!uploadDir.exists()) {
        uploadDir.mkdirs();
        log.warn("{} does not exist. Creating a new directory...", IMAGE_DIR);
      }
  
      for (MultipartFile file : images) {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File dest = new File(IMAGE_DIR + fileName);
        file.transferTo(dest);
        imageUrls.add(dest.getAbsolutePath());
      }

      Images image = new Images();
      image.setSellerProduct(sellerProduct);
      image.setImages(imageUrls);

      return repo.save(image);
      
    } catch (Exception e) {
      // TODO: handle exception
      log.error("ERROR: {}", e.getMessage());
      throw new RuntimeException("Error occurred while saving image: " + e.getMessage());
    }
  }

  @Override
  public Images updateImages(UUID id, MultipartFile[] images) {
    return null;
  }
}
