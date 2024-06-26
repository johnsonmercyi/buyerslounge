package com.soft.springbootdemo.service.images;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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
      File uploadDir = new File(IMAGE_DIR);// uploads/images
      String absolutePath = uploadDir.getAbsolutePath() + File.separator;

      if (!Files.exists(Path.of(absolutePath))) {
        Path dir = Files.createDirectory(Path.of(absolutePath));
        if (dir.toAbsolutePath() != null) {
          log.warn("{} did not exist. Created a new directory.", IMAGE_DIR);
        } else {
          throw new RuntimeException("Failed to create upload directory: " + IMAGE_DIR);
        }
      }
  
      for (MultipartFile file : images) {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File dest = new File(uploadDir.getAbsoluteFile(), fileName.replaceAll(" ", "_"));
        log.info("Attempting to save file to: {}", dest.getAbsolutePath());

        try {
          file.transferTo(dest);
          imageUrls.add(dest.getAbsolutePath());
          log.info("File saved to: {}", dest.getAbsolutePath());
        } catch (IOException e) {
          log.error("Failed to save file: {}", dest.getAbsolutePath(), e);
          throw new RuntimeException("Error occurred while saving image: " + e.getMessage(), e);
        }
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
