package com.soft.springbootdemo.service.images;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.soft.springbootdemo.dto.requestdto.UpdatedImageInfoDTO;
import com.soft.springbootdemo.model.Images;
import com.soft.springbootdemo.model.SellerProducts;
import com.soft.springbootdemo.repo.ImagesRepo;
import com.soft.springbootdemo.util.Util;

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
  public Images saveImages(SellerProducts sellerProduct, MultipartFile[] images, List<String> imagesAngles) {
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
      image.setImagesAngles(imagesAngles);

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
  public Images updateImages(SellerProducts sellerProduct, MultipartFile[] images,
      UpdatedImageInfoDTO updatedImageInfoDto) {

    try {
      // List<String> imageUrls = new ArrayList<>();
      Images currentImages = repo.findBySellerProduct(sellerProduct);
      List<String> imagesAngles = currentImages.getImagesAngles();
      List<String> imagesUrl = currentImages.getImages();

      boolean isDeleteImages = Util.isListNotEmpty(updatedImageInfoDto.getDeletedImages());
      boolean isUpdateImages = Util.isListNotEmpty(updatedImageInfoDto.getUpdatedImages());
      boolean isNewImages = Util.isListNotEmpty(updatedImageInfoDto.getNewImages());

      // Ensure the upload directory exists
      File uploadDir = new File(IMAGE_DIR);// uploads/images
      String uploadAbsolutePath = uploadDir.getAbsolutePath() + File.separator;

      // Checks if the upload directory exists
      if (!Files.exists(Path.of(uploadAbsolutePath))) {
        Path dir = Files.createDirectory(Path.of(uploadAbsolutePath));
        if (dir.toAbsolutePath() != null) {
          log.warn("{} did not exist. Created a new directory.", IMAGE_DIR);
        } else {
          throw new RuntimeException("Failed to create upload directory: " + IMAGE_DIR);
        }
      }

      // log.info("IMAGE LENGTH FOR TEST: {}", images.length);

      // CASE 1: DELETED IMAGES
      if (isDeleteImages) {
        log.info("[UPDATED IMAGES INFO]: {}", updatedImageInfoDto);

        IntStream.range(0, updatedImageInfoDto.getDeletedImages().size())
            .forEach(index -> {
              try {

                String deletedImage = updatedImageInfoDto.getDeletedImages().get(index);

                for (int i = 0; i < imagesAngles.size(); i++) {
                  if (imagesAngles.get(i).equals(deletedImage)) {

                    String url = imagesUrl.get(i);
                    log.info("URL: {}", url);

                    // Delete the image file
                    String[] splittedString = url.split("/");
                    String filename = splittedString[splittedString.length - 1];

                    File imageFile = new File(uploadAbsolutePath + filename);
                    boolean isDeleted = Files.deleteIfExists(Path.of(imageFile.getAbsolutePath()));

                    if (!isDeleted) {
                      log.error("CANNOT DELETE IMAGE: {}", imageFile.getAbsolutePath());
                      throw new RuntimeException("Error occurred while deleting image: " + imageFile.getAbsolutePath());
                    }

                    // Delete the url
                    currentImages.getImages().remove(i);

                    // Delete the image angle
                    currentImages.getImagesAngles().remove(i);

                    repo.save(currentImages);

                  }
                }
              } catch (Exception e) {
                // TODO: handle exception
                e.printStackTrace();
              }
            });
      }

      return currentImages;

    } catch (Exception e) {
      // TODO: handle exception
      log.error("ERROR: {}", e.getMessage());
      throw new RuntimeException("Error occurred while saving image: " + e.getMessage());
    }
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
        String[] splittedString = imageString.split("/");
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
