package com.soft.springbootdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**") // You can specify the endpoints here
        .allowedOrigins("http://127.0.0.1:5500") // Replace with your frontend URL
        .allowedMethods("GET", "POST", "PUT", "DELETE"); // Add the HTTP methods you need
  }
}
