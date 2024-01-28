package com.soft.springbootdemo.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.soft.springbootdemo.dto.responsedto.CategoryResponseDTO;
import com.soft.springbootdemo.dto.responsedto.CustomerDTO;
import com.soft.springbootdemo.dto.responsedto.ReturnSaleResponseDTO;
import com.soft.springbootdemo.dto.responsedto.RoleDTO;
import com.soft.springbootdemo.dto.responsedto.SaleItemResponseDTO;
import com.soft.springbootdemo.dto.responsedto.SaleItemResponseDTO.CustomProduct;
import com.soft.springbootdemo.dto.responsedto.SaleItemResponseDTO.CustomSeller;
import com.soft.springbootdemo.dto.responsedto.SaleResponseDTO;
import com.soft.springbootdemo.dto.responsedto.SaleResponseDTO.CustomCustomer;
import com.soft.springbootdemo.dto.responsedto.SellerDTO;
import com.soft.springbootdemo.dto.responsedto.UserDTO;
import com.soft.springbootdemo.model.Customer;
import com.soft.springbootdemo.model.Product;
import com.soft.springbootdemo.model.ProductInventory;
import com.soft.springbootdemo.model.ReturnSale;
import com.soft.springbootdemo.model.Sale;
import com.soft.springbootdemo.model.SaleItem;
import com.soft.springbootdemo.model.Seller;
import com.soft.springbootdemo.model.User;
import com.soft.springbootdemo.repo.ProductInventoryRepo;




public class Util {

  public static final String CUSTOMER_ROLE = "customer";
  public static final String SELLER_ROLE = "seller";
  
  public static UserDTO mapUserToDTO(User user, boolean fetchRoles) {
    // Map user to UserDTO object
    UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getStatus(), user.getCreated(), user.getUpdated(), new ArrayList<>());

    // Fetch and add roles to user if allowed
    if (fetchRoles) {
      // Map UserRoles data to a RoleDTO object
      List<RoleDTO> userRoles = user.getUserRoles() // fetch UserRoles
          .stream() // Convert to stream
          .map(userRole -> {
            // Map UserRoles to RoleDTO object
            RoleDTO roleDTO = new RoleDTO(userRole.getId(), userRole.getRole().getName(), userRole.getCreated(), userRole.getUpdated());

            return roleDTO;
          }).toList();

      // Set the user role in the UserDTO
      userDTO.setUserRoles(userRoles);
    }

    return userDTO;
  }

  public static CustomerDTO mapCustomerToDTO(Customer customer, boolean fetchRoles) {
    UserDTO userDTO = mapUserToDTO(customer.getUser(), fetchRoles);
    return new CustomerDTO(customer.getId(), userDTO, customer.getFirstname(), customer.getLastname(), customer.getGender(), customer.getDob(), customer.getAddress(), customer.getNationality(), customer.getCreated(), customer.getUpdated());
  }

  public static SellerDTO mapSellerToDTO(Seller seller, boolean fetchRoles){
    UserDTO userDTO = mapUserToDTO(seller.getUser(), fetchRoles);
    return new SellerDTO(seller.getId(), userDTO, seller.getFirstname(), seller.getLastname(), seller.getGender(), seller.getDob(), seller.getAddress(), seller.getNationality(), seller.getCreated(), seller.getUpdated());
  }

  public static SaleItemResponseDTO convertSaleItemToResponseDTO(SaleItem saleItem) {
    
    CustomProduct cstProduct = new SaleItemResponseDTO.CustomProduct();
    Product mainProduct = saleItem.getProduct();
    cstProduct.setId(mainProduct.getId());
    cstProduct.setName(mainProduct.getName());
    cstProduct.setRefNo(mainProduct.getRefNo());
    cstProduct.setPrice(mainProduct.getPrice());
    cstProduct.setCost(mainProduct.getCost());
    cstProduct.setCategory(
      new CategoryResponseDTO(
        mainProduct.getCategory().getId(), 
        mainProduct.getCategory().getName()));

    
    Seller mainSeller = saleItem.getSeller();
    String sellerName = String.format(
      "%s %s", 
      mainSeller.getFirstname(), 
      mainSeller.getLastname()
    );

    CustomSeller cstSeller = new SaleItemResponseDTO.CustomSeller(mainSeller.getId(), sellerName, mainSeller.getUser().getEmail());

    return new SaleItemResponseDTO(
      saleItem.getId(),
      cstProduct, 
      cstSeller, 
      saleItem.getQuantity(), 
      saleItem.getTotal(), 
      saleItem.getCreated(), 
      saleItem.getUpdated()
    );
  }

  public static SaleResponseDTO convertSaleToResponseDTO(Sale sale, boolean fetchSaleItems) {

    // Fetch the customer
    Customer customer = sale.getCustomer();

    // Initialized the sale customer
    CustomCustomer cstCustomer = new SaleResponseDTO.CustomCustomer();
    cstCustomer.setCustomerName(String.format(
      "%s %s", 
        customer.getFirstname(),
        customer.getLastname()
        
    ));
    cstCustomer.setCustomerEmail(customer.getUser().getEmail());
    cstCustomer.setCustomerId(customer.getId());

    List<SaleItemResponseDTO> saleItems = new ArrayList<>();

    if (fetchSaleItems) {
      // Prepare the sale items in a response DTO
      saleItems = sale.getSaleItems().stream()
      .map(saleItem -> {
        SaleItemResponseDTO saleItemDTO = new SaleItemResponseDTO();
        saleItemDTO.setId(saleItem.getId());
  
        Product product = saleItem.getProduct();
        saleItemDTO.setProduct(new CustomProduct(
          product.getId(), 
          new CategoryResponseDTO(product.getCategory().getId(), product.getCategory().getName()), 
          product.getName(), 
          product.getCost(), 
          product.getPrice(), 
          product.getRefNo())
        );
        saleItemDTO.setQuantity(saleItem.getQuantity());
        saleItemDTO.setTotal(saleItem.getTotal());
  
        Seller seller = saleItem.getSeller();
        saleItemDTO.setSeller(new CustomSeller(
          seller.getId(),
          String.format("%s %s", seller.getFirstname(), seller.getLastname()),
          seller.getUser().getEmail()      
        ));
        
        saleItemDTO.setCreated(saleItem.getCreated());
        saleItemDTO.setUpdated(saleItem.getUpdated());
  
        return saleItemDTO;
      }).toList();
    }

    // Return the SaleResponseDTO
    return new SaleResponseDTO(
      sale.getId(), 
      cstCustomer, 
      sale.getSaleTotal(), 
      saleItems, 
      sale.getCreated(), 
      sale.getUpdated()
    );
  } 

  public static ReturnSaleResponseDTO convertReturnSaleToResponseDTO(ReturnSale returnSale, boolean fetchSaleItems) {
    SaleResponseDTO saleResponseDTO = convertSaleToResponseDTO(returnSale.getSale(), fetchSaleItems);
    return new ReturnSaleResponseDTO(
      returnSale.getId(), 
      saleResponseDTO, 
      returnSale.getCreated(), 
      returnSale.getUpdated()
    );
  }

  
}
