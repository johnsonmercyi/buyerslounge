package com.soft.springbootdemo.service.saleItem;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.requestdto.SaleItemRequestDTO;
import com.soft.springbootdemo.dto.requestdto.SaleItemRequestDTO.SaleItems;
import com.soft.springbootdemo.dto.requestdto.SaleRequestDTO;
import com.soft.springbootdemo.dto.responsedto.SaleItemResponseDTO;
import com.soft.springbootdemo.model.Customer;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.model.Sale;
import com.soft.springbootdemo.model.SaleItem;
import com.soft.springbootdemo.model.Seller;
import com.soft.springbootdemo.repo.CustomerRepo;
import com.soft.springbootdemo.repo.ProductRepo;
import com.soft.springbootdemo.repo.SaleItemRepo;
import com.soft.springbootdemo.repo.SaleRepo;
import com.soft.springbootdemo.repo.SellerRepo;
import com.soft.springbootdemo.util.Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleItemServiceImpl implements SaleItemService {

  private final SaleItemRepo saleItemRepo;
  private final SaleRepo saleRepo;
  private final CustomerRepo customerRepo;
  private final ProductRepo productRepo;
  private final SellerRepo sellerRepo;

  @Override
  public Collection<SaleItemResponseDTO> save(SaleItemRequestDTO saleItemRequestDTO) {

    List<SaleItemResponseDTO> saveItems = new ArrayList<>();

    // Save or Record firstly the Sale
    SaleRequestDTO saleRequestDTO = saleItemRequestDTO.getSale();
    Optional<Customer> customer = customerRepo.findById(saleRequestDTO.getCustomerId());
    Sale savedSale = null;

    if (customer.isPresent()) {
      Sale sale = new Sale();
      sale.setCustomer(customer.get());
      sale.setSaleTotal(saleRequestDTO.getSaleTotal());
      savedSale = saleRepo.save(sale);
    }

    if (savedSale != null) {
      List<SaleItemRequestDTO.SaleItems> saleItemsList = saleItemRequestDTO.getSaleItems();
      for (SaleItems saleItems : saleItemsList) {
        SaleItem saleItem = new SaleItem();
        Optional<Product> product = productRepo.findById(saleItems.getProductId());
        Optional<Seller> seller = sellerRepo.findById(saleItems.getSellerId());
        if (product.isPresent() && seller.isPresent()) {
          saleItem.setSale(savedSale);
          saleItem.setProduct(product.get());
          saleItem.setSeller(seller.get());
          saleItem.setQuantity(saleItems.getQty());
          saleItem.setTotal(saleItems.getTotal());

          saveItems.add(Util.convertSaleItemToResponseDTO(saleItemRepo.save(saleItem)));
          
        }
      }
    }

    return saveItems;
  }

  @Override
  public Collection<SaleItemResponseDTO> findBySaleId(UUID saleId) {
    return null;
  }

  @Override
  public Collection<SaleItemResponseDTO> findAll() {
   List<SaleItem> saleItems = saleItemRepo.findAll();
   List<SaleItemResponseDTO> slrd = new ArrayList<>();
    for(SaleItem sItem : saleItems){
      if(sItem != null){
        slrd.add(Util.convertSaleItemToResponseDTO(sItem));
      }
    }
   return slrd;
  }
}
