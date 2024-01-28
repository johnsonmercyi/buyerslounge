package com.soft.springbootdemo.service.sale;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.requestdto.SaleRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SaleResponseDTO;
import com.soft.springbootdemo.model.Customer;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.model.ProductInventory;
import com.soft.springbootdemo.model.Sale;
import com.soft.springbootdemo.model.SaleItem;
import com.soft.springbootdemo.model.Seller;
import com.soft.springbootdemo.repo.CustomerRepo;
import com.soft.springbootdemo.repo.ProductInventoryRepo;
import com.soft.springbootdemo.repo.ProductRepo;
import com.soft.springbootdemo.repo.SaleItemRepo;
import com.soft.springbootdemo.repo.SaleRepo;
import com.soft.springbootdemo.repo.SellerRepo;
import com.soft.springbootdemo.service.ProductInventory.ProductInventoryService;
import com.soft.springbootdemo.util.Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class SaleServiceImpl implements SaleService {

  private final SaleRepo saleRepo;
  private final CustomerRepo customerRepo;
  private final ProductRepo productRepo;
  private final SellerRepo sellerRepo;
  private final SaleItemRepo saleItemRepo;
  private final ProductInventoryService pis;

  @Override
  public SaleResponseDTO save(SaleRequestDTO saleRequestDTO) {

    // Save or Record firstly the Sale
    Optional<Customer> customer = customerRepo.findById(saleRequestDTO.getCustomerId());
    Sale savedSale = null;
    
    if (customer.isPresent()) {
      Sale sale = new Sale();
      sale.setCustomer(customer.get());
      sale.setSaleTotal(saleRequestDTO.getSaleTotal());
      savedSale = saleRepo.save(sale);
    }

    // Secondly save the sale items to SaleItems
    if (savedSale != null) {
      List<SaleRequestDTO.SaleItems> saleItemsList = saleRequestDTO.getSaleItems();
      for (SaleRequestDTO.SaleItems saleItems : saleItemsList) {
        SaleItem saleItem = new SaleItem();
        Optional<Product> product = productRepo.findById(saleItems.getProductId());
        Optional<Seller> seller = sellerRepo.findById(saleItems.getSellerId());
        if (product.isPresent() && seller.isPresent()) {
          saleItem.setSale(savedSale);
          saleItem.setProduct(product.get());
          saleItem.setSeller(seller.get());
          saleItem.setQuantity(saleItems.getQty());
          saleItem.setTotal(saleItems.getTotal());

          SaleItem savedSaleItem = saleItemRepo.save(saleItem);
          savedSale.getSaleItems().add(savedSaleItem);
          // Update product inventory here...
          pis.updateInventoryQty(product.get().getId(), saleItems.getQty(), false);
        }
      }
      return Util.convertSaleToResponseDTO(savedSale, true);

    }
    return null;
  }

  @Override
  public Optional<SaleResponseDTO> findById(UUID id) {
    return Optional.ofNullable(Util.convertSaleToResponseDTO(saleRepo.findById(id).get(), true));
  }

  @Override
  public Collection<SaleResponseDTO> findAll() {
    Collection<Sale> sales = saleRepo.findAll();
    Collection<SaleResponseDTO> salesResponseList = new ArrayList<>();
    for (Sale sale : sales) {
      salesResponseList.add(Util.convertSaleToResponseDTO(sale, false));
    }
    return salesResponseList;
  }

  @Override
  public SaleResponseDTO update(UUID uuid, SaleRequestDTO t) {
    return null;
  }
  
}
