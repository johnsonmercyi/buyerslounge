package com.soft.springbootdemo.service.returnsale;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.requestdto.ReturnSaleRequestDTO;
import com.soft.springbootdemo.dto.responsedto.ReturnSaleResponseDTO;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.model.ProductInventory;
import com.soft.springbootdemo.model.ReturnSale;
import com.soft.springbootdemo.model.Sale;
import com.soft.springbootdemo.repo.ProductInventoryRepo;
import com.soft.springbootdemo.repo.ReturnSaleRepo;
import com.soft.springbootdemo.repo.SaleRepo;
import com.soft.springbootdemo.service.ProductInventory.ProductInventoryService;
import com.soft.springbootdemo.util.Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReturnSaleServiceImpl implements ReturnSaleService {

  private final ReturnSaleRepo returnSaleRepo;
  private final SaleRepo saleRepo;
  private final ProductInventoryRepo productInventoryRepo;
  private final ProductInventoryService pis;
  @Override
  public ReturnSaleResponseDTO save(ReturnSaleRequestDTO returnSaleRequestDTO) {
    Optional<Sale> sale = saleRepo.findById(returnSaleRequestDTO.getSaleId());

    if (sale.isPresent()) {
      Sale oldSale = sale.get();
      ReturnSale returnSale = new ReturnSale();
      returnSale.setSale(oldSale);

      ReturnSaleResponseDTO responseDTO = Util.convertReturnSaleToResponseDTO(returnSaleRepo.save(returnSale), true);

      // Update product inventory here...
      returnSale.getSale().getSaleItems().stream()
      .forEach(saleItem -> {
        Product p = saleItem.getProduct();
        int qty = saleItem.getQuantity();
        // Update inventory
        pis.updateInventoryQty(p.getId(), qty, true);

      });
      return responseDTO;      
    }
    return null;
  }

  @Override
  public Collection<ReturnSaleResponseDTO> findAll() {
    Collection<ReturnSale> returnSales = returnSaleRepo.findAll();
    List<ReturnSaleResponseDTO> returnSalesList = new ArrayList<>();

    for (ReturnSale returnSale : returnSales) {
      returnSalesList.add(Util.convertReturnSaleToResponseDTO(returnSale, false));
    }

    return returnSalesList;
  }

  @Override
  public Optional<ReturnSaleResponseDTO> findById(UUID id) {
    Optional<ReturnSale> returnSale = returnSaleRepo.findById(id);
    if (returnSale.isPresent()) {
      return Optional.ofNullable(Util.convertReturnSaleToResponseDTO(returnSale.get(), true));
    }
    return Optional.empty();
  }

  @Override
  public ReturnSaleResponseDTO findBySaleId(UUID saleId) {
    ReturnSale returnSale = returnSaleRepo.findBySaleId(saleId);
    return Util.convertReturnSaleToResponseDTO(returnSale, true);
  }


}
