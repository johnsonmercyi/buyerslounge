package com.soft.springbootdemo.controller;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soft.springbootdemo.dto.UserRegistrationDTO;
import com.soft.springbootdemo.dto.responsedto.CustomerDTO;
import com.soft.springbootdemo.dto.responsedto.UserDTO;
import com.soft.springbootdemo.model.Customer;
import com.soft.springbootdemo.model.Role;
import com.soft.springbootdemo.model.User;
import com.soft.springbootdemo.service.customer.CustomerService;
import com.soft.springbootdemo.service.role.RoleService;
import com.soft.springbootdemo.service.user.UserService;
import com.soft.springbootdemo.util.Util;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
  private final CustomerService customerService;
  private final RoleService roleService;
  private final UserService userService;

  @GetMapping
  public ResponseEntity<Collection<CustomerDTO>> findAllCustomers() {
    return ResponseEntity.ok(customerService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<CustomerDTO>> findCustomerById(@PathVariable UUID id) {
    return ResponseEntity.ok(customerService.findById(id));
  }

  @PostMapping
  public ResponseEntity<Customer> saveCustomer(@RequestBody UserRegistrationDTO userRegDTO) {
    // Prepare user
    User user = new User();
    user.setUsername(userRegDTO.getUsername());
    user.setPassword(userRegDTO.getPassword());
    user.setEmail(userRegDTO.getEmail());
    
    // Prepare user roles
    List<String> roles = List.of(Util.CUSTOMER_ROLE);

    // Prepare customer
    Customer customer = new Customer();
    customer.setUser(user);
    customer.setFirstname(userRegDTO.getFirstname());
    customer.setLastname(userRegDTO.getLastname());
    customer.setGender(userRegDTO.getGender());
    customer.setAddress(userRegDTO.getAddress());
    customer.setNationality(userRegDTO.getNationality());
    customer.setDob(userRegDTO.getDob());

    // Save customer
    return ResponseEntity.ok(
      customerService.saveCustomer(customer, user, roles)
    );
    
  }

  @PostMapping("/{id}")
  public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable UUID id, @RequestBody UserRegistrationDTO userRegDTO) {
    UserDTO userDTO  = userService.findByUsername(userRegDTO.getUsername());

    // Initialize user
    User user = new User();
    user.setId(userDTO.getId());
    user.setEmail(userRegDTO.getEmail());
    user.setPassword(userRegDTO.getPassword());
    user.setUsername(userRegDTO.getUsername());

    // Initialize customer
    Customer customer = new Customer();
    customer.setFirstname(userRegDTO.getFirstname());
    customer.setLastname(userRegDTO.getLastname());
    customer.setAddress(userRegDTO.getAddress());
    customer.setNationality(userRegDTO.getNationality());
    customer.setDob(userRegDTO.getDob());
    customer.setGender(userRegDTO.getGender());

    return ResponseEntity.ok(customerService.updateCustomer(id, customer, user));
  }
  
}
