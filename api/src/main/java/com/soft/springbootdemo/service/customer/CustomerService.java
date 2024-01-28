package com.soft.springbootdemo.service.customer;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.soft.springbootdemo.dto.responsedto.CustomerDTO;
import com.soft.springbootdemo.model.Customer;
import com.soft.springbootdemo.model.User;

public interface CustomerService {
  public Customer saveCustomer(Customer customer, User user, List<String> roles);

  public Optional<CustomerDTO> findById(UUID id);

  public Collection<CustomerDTO> findAll();

  public CustomerDTO updateCustomer(UUID uuid, Customer customer, User user);
}
