package com.soft.springbootdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**") // You can specify the endpoints here
        .allowedOrigins("http://127.0.0.1:5500", "http://localhost:3000", "http://localhost:3001", "http://192.168.10.122:3000") // Replace with your frontend URL
        .allowedMethods("GET", "POST", "PUT", "DELETE"); // Add the HTTP methods you need
  }

  @Override
  public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
    configurer.mediaType("multipart/form-data", MediaType.MULTIPART_FORM_DATA);
  }
}
