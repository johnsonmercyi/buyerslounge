package com.soft.springbootdemo.service.seller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.soft.springbootdemo.dto.responsedto.SellerDTO;
import com.soft.springbootdemo.model.Role;
import com.soft.springbootdemo.model.Seller;
import com.soft.springbootdemo.model.User;
import com.soft.springbootdemo.repo.SellerRepo;
import com.soft.springbootdemo.repo.UserRepo;
import com.soft.springbootdemo.service.user.UserService;
import com.soft.springbootdemo.util.Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

  private final SellerRepo sellerRepo;
  private final UserService userService;
  private final UserRepo userRepo;

  // Save seller
  @Override
  public Seller saveSeller(Seller seller, User user, List<String> roles) {

    // save user first
    userService.saveUserWithRoles(user, roles);
    // Then save the seller
    return sellerRepo.save(seller);
  }

  @Override
  public Optional<SellerDTO> findById(UUID id) {
    Optional<Seller> optionalSeller = sellerRepo.findById(id);
    if (optionalSeller.isPresent()) {
      Seller seller = optionalSeller.get();
      return Optional.ofNullable(Util.mapSellerToDTO(seller, true));
    }
    return Optional.empty();
  }

  @Override
  public Collection<SellerDTO> findAll() {
    List<Seller> sellers = sellerRepo.findAll();
    List<SellerDTO> sellerDTOs = new ArrayList<>();

    for (Seller seller : sellers) {
      sellerDTOs.add(Util.mapSellerToDTO(seller, false));
    }
    return sellerDTOs; // returns all sellers
  }

  @Override
  public SellerDTO updateSeller(UUID uuid, Seller seller, User user) {
    Optional<Seller> opSeller = sellerRepo.findById(uuid);
    if (opSeller.isPresent()) {
      Seller oldSeller = opSeller.get();
      // update user
      userService.updateUser(user.getId(), user);

      // update Seller
      oldSeller.setFirstname(seller.getFirstname());
      oldSeller.setLastname(seller.getLastname());
      oldSeller.setGender(seller.getGender());
      oldSeller.setAddress(seller.getAddress());
      oldSeller.setNationality(seller.getNationality());
      oldSeller.setDob(seller.getDob());

      return Util.mapSellerToDTO(sellerRepo.save(oldSeller), true);
    }
    return null;
  }

}
