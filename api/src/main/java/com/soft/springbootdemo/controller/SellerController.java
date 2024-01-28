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

import com.soft.springbootdemo.service.role.RoleService;
import com.soft.springbootdemo.service.seller.SellerService;
import com.soft.springbootdemo.service.user.UserService;
import com.soft.springbootdemo.util.Util;
import com.soft.springbootdemo.dto.UserRegistrationDTO;
import com.soft.springbootdemo.dto.responsedto.SellerDTO;
import com.soft.springbootdemo.dto.responsedto.UserDTO;
import com.soft.springbootdemo.model.Role;
import com.soft.springbootdemo.model.Seller;
import com.soft.springbootdemo.model.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/sellers")
@RequiredArgsConstructor
@Log4j2
public class SellerController {
    private final SellerService sellerService;
    private final RoleService roleService;
    private final UserService userService;

    //Get all sellers
    @GetMapping
    public ResponseEntity<Collection<SellerDTO>> findAllSellers(){
        return ResponseEntity.ok(sellerService.findAll());
    }

    //Get Seller by id
    @GetMapping("/{id}")
    public ResponseEntity<Optional<SellerDTO>> findSellerById(@PathVariable UUID id){
        return ResponseEntity.ok(sellerService.findById(id));
    }

    //Save Seller
    @PostMapping
    public ResponseEntity<Seller> saveSeller(@RequestBody UserRegistrationDTO userRegDTO){
        //Prepare user
        User user = new User();
        user.setUsername(userRegDTO.getUsername());
        user.setPassword(userRegDTO.getPassword());
        user.setEmail(userRegDTO.getEmail());

        //Prepare user roles
        List<String> roles = List.of(Util.SELLER_ROLE);

        //Prepare Seller
        Seller seller = new Seller();
        seller.setUser(user);
        seller.setFirstname(userRegDTO.getFirstname());
        seller.setLastname(userRegDTO.getLastname());
        seller.setGender(userRegDTO.getGender());
        seller.setAddress(userRegDTO.getAddress());
        seller.setNationality(userRegDTO.getNationality());
        seller.setDob(userRegDTO.getDob());

        //save seller
        return ResponseEntity.ok(sellerService.saveSeller(seller, user, roles));

    }
    //Update Seller
    @PostMapping("/{id}")
    public ResponseEntity<SellerDTO> updateSeller(@PathVariable UUID id, @RequestBody UserRegistrationDTO userRegDTO){
        UserDTO userDTO = userService.findByUsername(userRegDTO.getUsername());

        //Initialize user
        User user = new User();
        user.setId(userDTO.getId());
        user.setEmail(userRegDTO.getEmail());
        user.setPassword(userRegDTO.getPassword());
        user.setUsername(userRegDTO.getUsername());

        log.info("EMAIL: {}", userDTO.getEmail());

        //Initialize seller
        Seller seller = new Seller();
        seller.setFirstname(userRegDTO.getFirstname());
        seller.setLastname(userRegDTO.getLastname());
        seller.setAddress(userRegDTO.getAddress());
        seller.setNationality(userRegDTO.getNationality());
        seller.setDob(userRegDTO.getDob());
        seller.setGender(userRegDTO.getGender());

        return ResponseEntity.ok(sellerService.updateSeller(id, seller, user));
        
    }
}
