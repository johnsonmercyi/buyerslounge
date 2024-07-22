package com.soft.springbootdemo.service.images;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
        fileName = fileName.replaceAll(" ", "_");

        File dest = new File(uploadDir.getAbsoluteFile(), fileName);
        log.info("Attempting to save file to: {}", dest.getAbsolutePath());

        try {
          file.transferTo(dest);
          // log.info("IMAGE FILE: {}", "/" + IMAGE_DIR + fileName);
          imageUrls.add("/" + IMAGE_DIR + fileName);
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
  public Images findBySellerProduct(SellerProducts sellerProduct) {

    Images image = repo.findBySellerProduct(sellerProduct);
    return image;
  }

  @Override
  public Images updateImages(UUID id, MultipartFile[] images) {
    return null;
  }

  @Override
  public boolean delete(SellerProducts sp) {
    try {

      // Ensure the upload directory exists
      File uploadDir = new File(IMAGE_DIR);// uploads/images
      String uploadAbsolutePath = uploadDir.getAbsolutePath() + File.separator;

      Images image = findBySellerProduct(sp);

      List<String> images = image.getImages();

      for (String imageString : images) {
        String [] splittedString = imageString.split("/");
        String filename = splittedString[splittedString.length - 1];

        File imageFile = new File(uploadAbsolutePath + filename);
        boolean isDeleted = Files.deleteIfExists(Path.of(imageFile.getAbsolutePath()));

        if (!isDeleted) {
          log.error("CANNOT DELETE IMAGE: {}", imageFile.getAbsolutePath());
          throw new RuntimeException("Error occurred while deleting image: " + imageFile.getAbsolutePath());
        }
      }

      repo.deleteBySellerProduct(sp);
      return true;
    } catch (Exception e) {
      // TODO: handle exception
      log.error("IMAGES DELETE ERROR: {}", e.getMessage());
      throw new RuntimeException("Error occurred while deleting images: " + e.getMessage());
    }

  }
}
