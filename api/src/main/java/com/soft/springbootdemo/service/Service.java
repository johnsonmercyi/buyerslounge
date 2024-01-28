package com.soft.springbootdemo.service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface Service<T> {
  public T save(T t);
  public Optional<T> findById(UUID id);
  public Collection<T> findAll();
  public T update(UUID uuid, T t);
}
