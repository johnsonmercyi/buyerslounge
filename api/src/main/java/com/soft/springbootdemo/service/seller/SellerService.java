package com.soft.springbootdemo.service.seller;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.soft.springbootdemo.dto.responsedto.SellerDTO;
import com.soft.springbootdemo.model.Seller;
import com.soft.springbootdemo.model.User;

public interface SellerService {
    public Seller saveSeller(Seller seller, User user, List<String> roles);

    public Optional<SellerDTO> findById(UUID id);

    public Collection<SellerDTO> findAll();

    public SellerDTO updateSeller(UUID uuid, Seller seller, User user);
}
