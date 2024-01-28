package com.soft.springbootdemo.service.ProductInventory;

import java.util.UUID;
import java.util.Collection;
import java.util.Optional;

import com.soft.springbootdemo.dto.requestdto.ProductInventoryRequestDTO;
import com.soft.springbootdemo.model.ProductInventory;

public interface ProductInventoryService {
    public ProductInventory save(ProductInventory pi);
    public Collection<ProductInventory> findAllInventory();
    public Optional<ProductInventory> findByProductId(UUID id);
    public Optional<ProductInventory> findByInventoryId(UUID id);
    public ProductInventory update(UUID inventoryId, ProductInventoryRequestDTO productInventoryRequestDTO);
    public void updateInventoryQty(UUID productId, int quantity, boolean productAdded);
}
