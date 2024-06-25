package com.soft.springbootdemo.util;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;

public class JSONConverter implements AttributeConverter<List<String>, String> {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public String convertToDatabaseColumn(List<String> attribute) {
    try {
      return objectMapper.writeValueAsString(attribute);
    } catch (IOException e) {
      throw new IllegalArgumentException("Error converting list to JSON", e);
    }
  }

  @Override
  public List<String> convertToEntityAttribute(String dbData) {
    try {
      return objectMapper.readValue(dbData, new TypeReference<List<String>>() {
      });
    } catch (IOException e) {
      throw new IllegalArgumentException("Error converting JSON to list", e);
    }
  }
}
