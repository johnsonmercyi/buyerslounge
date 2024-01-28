package com.soft.springbootdemo.service.customer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.responsedto.CustomerDTO;
import com.soft.springbootdemo.dto.responsedto.UserDTO;
import com.soft.springbootdemo.model.Customer;
import com.soft.springbootdemo.model.Role;
import com.soft.springbootdemo.model.User;
import com.soft.springbootdemo.repo.CustomerRepo;
import com.soft.springbootdemo.repo.UserRepo;
import com.soft.springbootdemo.service.user.UserService;
import com.soft.springbootdemo.util.Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

  private final CustomerRepo customerRepo;
  private final UserService userService;
  private final UserRepo userRepo;

  @Override
  public Customer saveCustomer(Customer customer, User user, List<String> roles) {
    // Save user first
    userService.saveUserWithRoles(user, roles);

    // Then save the customer lastly
    return customerRepo.save(customer);
  }

  @Override
  public Optional<CustomerDTO> findById(UUID id) {
    Optional<Customer> optionalCustomer = customerRepo.findById(id);
    if (optionalCustomer.isPresent()) {
      Customer customer = optionalCustomer.get();
      return Optional.ofNullable(Util.mapCustomerToDTO(customer, true));
    }
    return Optional.empty();
  }

  @Override
  public Collection<CustomerDTO> findAll() {
    List<Customer> customers = customerRepo.findAll();
    List<CustomerDTO> customerDTOs = new ArrayList<>();

    for (Customer customer : customers) {
      customerDTOs.add(Util.mapCustomerToDTO(customer, false));
    }
    return customerDTOs;// Return all customers
  }

  // UpdateCustomer
  @Override
  public CustomerDTO updateCustomer(UUID uuid, Customer customer, User user) {
    Optional<Customer> optionalCust = customerRepo.findById(uuid);
    if (optionalCust.isPresent()) {
      // update user
      userService.updateUser(user.getId(), user);
      
      // update Customer
      Customer oldCustomer = optionalCust.get();
      // oldCustomer.setUser(newUser);
      oldCustomer.setFirstname(customer.getFirstname());
      oldCustomer.setLastname(customer.getLastname());
      oldCustomer.setGender(customer.getGender());
      oldCustomer.setAddress(customer.getAddress());
      oldCustomer.setNationality(customer.getNationality());
      oldCustomer.setDob(customer.getDob());

      return Util.mapCustomerToDTO(customerRepo.save(oldCustomer), true);

    }
    return null;
  }

}
