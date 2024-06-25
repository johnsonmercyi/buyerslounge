package com.soft.springbootdemo.service.images;

import java.util.UUID;

import com.soft.springbootdemo.model.Images;

public interface ImagesService {
  public Images saveImages(Images image);
  public Images updateImages(UUID id, Images image);
}
