package com.soft.springbootdemo.config;

import java.io.IOException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;

// Adjust this package name as needed

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ContentTypeLoggingFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    // logger.info("Before processing: Content-Type = " + request.getContentType());
    // logger.info("Request method: " + request.getMethod());
    // logger.info("Request URI: " + request.getRequestURI());
    // logger.info("Request parameters: " + request.getParameterMap());

    // Log all headers
    Collections.list(request.getHeaderNames())
        .forEach(headerName -> logger.info(headerName + ": " + request.getHeader(headerName)));

    filterChain.doFilter(request, response);
    // logger.info("After processing: Content-Type = " + request.getContentType());
  }
}
