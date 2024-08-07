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
import com.soft.springbootdemo.model.Images;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.model.Seller;
import com.soft.springbootdemo.model.SellerProducts;
import com.soft.springbootdemo.repo.ImagesRepo;
import com.soft.springbootdemo.repo.ProductRepo;
import com.soft.springbootdemo.repo.SellerProductsRepo;
import com.soft.springbootdemo.repo.SellerRepo;
import com.soft.springbootdemo.service.images.ImagesService;
import com.soft.springbootdemo.util.Util;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class SellerProductsServiceImpl implements SellerProductsService {

  private final SellerProductsRepo sellerProductsRepo;
  private final ProductRepo productRepo;
  private final SellerRepo sellerRepo;
  private final ImagesRepo imagesRepo;
  private final ImagesService imagesService;

  @Override
  public SellerProductsResponseDTO save(SellerProductsRequestDTO sellerProductsDto, MultipartFile[] images) {

    SellerProducts sp = new SellerProducts();
    Optional<Seller> sellerOptional = sellerRepo.findById(sellerProductsDto.getSellerId());
    Optional<Product> productOptional = productRepo.findById(sellerProductsDto.getProductId());

    if (!sellerOptional.isPresent() || !productOptional.isPresent())
      throw new NullPointerException("Invalid seller or product!");

    Seller seller = sellerOptional.get();
    Product product = productOptional.get();

    sp.setSeller(seller);
    sp.setProduct(product);
    sp.setCost(sellerProductsDto.getCost());
    sp.setPrice(sellerProductsDto.getPrice());
    sp.setQuantity(sellerProductsDto.getQuantity());
    sp.setDescription(sellerProductsDto.getDescription());

    SellerProducts savedSellerProducts = sellerProductsRepo.save(sp);
    Images im = imagesService.saveImages(savedSellerProducts, images, sellerProductsDto.getImagesAngles());

    if (im == null) {
      throw new NullPointerException("Image couldn't be saved in storage directory.");
    }

    // conversion here...
    return Util.convertSellerProductsToResponseDTO(
        sellerProductsRepo.save(savedSellerProducts), im, false);

  }

  @Override
  public Collection<SellerProductsResponseDTO> findAllInventory() {
    List<SellerProductsResponseDTO> sellerProducts = new ArrayList<>();
    List<SellerProducts> allSellerProducts = sellerProductsRepo.findAll();

    log.info("[GETTING ALL IMAGES...]");
    List<Images> allImages = imagesRepo.findAll();

    log.info("[ALL IMAGES FETCHED]: ", allImages.get(0).getImagesAngles());


    for (SellerProducts sellerProduct : allSellerProducts) {

      Optional<Images> imagesOptional = allImages.stream()
          .filter(image -> image.getSellerProduct().getId().equals(sellerProduct.getId())).findFirst();
      
      sellerProducts.add(Util.convertSellerProductsToResponseDTO(sellerProduct,imagesOptional.get(), false));
    }
    return sellerProducts;
  }

  @Override
  public Collection<SellerProductsResponseDTO> findByProductId(UUID productId) {
    List<SellerProducts> sellerProducts = sellerProductsRepo.findByProductId(productId);
    List<SellerProductsResponseDTO> sellerProductsResponseList = new ArrayList<>();

    for (SellerProducts sellerProduct : sellerProducts) {
      sellerProductsResponseList.add(Util.convertSellerProductsToResponseDTO(sellerProduct, null, false));
    }
    return sellerProductsResponseList;
  }

  @Override
  public Optional<SellerProductsResponseDTO> findBySellerProductId(UUID sellerProductId) {
    Optional<SellerProducts> sellerProducts = sellerProductsRepo.findById(sellerProductId);
    List<SellerProductsResponseDTO> sellerProductsResponseList = new ArrayList<>();

    if (sellerProducts.isPresent()) {
      Images images = imagesRepo.findBySellerProduct(sellerProducts.get());
      sellerProductsResponseList.add(Util.convertSellerProductsToResponseDTO(sellerProducts.get(), images, false));

      return sellerProductsResponseList.stream().findFirst();
    }

    return Optional.empty();
    
  }

  @Override
  public Collection<SellerProductsResponseDTO> findBySellerId(UUID sellerId) {
    List<SellerProducts> sellerProducts = sellerProductsRepo.findBySellerId(sellerId);
    List<SellerProductsResponseDTO> sellerProductsResponseList = new ArrayList<>();

    for (SellerProducts sellerProduct : sellerProducts) {
      sellerProductsResponseList.add(Util.convertSellerProductsToResponseDTO(sellerProduct, null, false));
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
        return Util.convertSellerProductsToResponseDTO(sellerProductsRepo.save(oldSellerProduct), null, false);
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

  @Override
  public boolean delete(UUID sellerProductId) {
    Optional<SellerProducts> spOptional = sellerProductsRepo.findById(sellerProductId);

    if (spOptional.isPresent()) {
      SellerProducts sp = spOptional.get();
      imagesService.delete(sp);
      sellerProductsRepo.deleteById(sp.getId());
      return true;
    }

    throw new EntityNotFoundException("Seller product not found");
  }

}
