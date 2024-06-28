package com.soft.springbootdemo.errorhandlers;

import java.util.NoSuchElementException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;

@RestControllerAdvice
@Log4j2
public class GlobalErrorHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<CustomErrorMessage> handleEntityNotFoundException(EntityNotFoundException ex) {
    return new ResponseEntity<>(new CustomErrorMessage(
        true, "Entity not found!", ex.getMessage()), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(NullPointerException.class)
  public ResponseEntity<CustomErrorMessage> handleNullPointerException(NullPointerException ex) {
    return new ResponseEntity<>(new CustomErrorMessage(
        true, ex.getMessage(), "The requested data couldn't be fetched!"), HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(NoResourceFoundException.class)
  public ResponseEntity<CustomErrorMessage> handleNoResourceFoundException(NoResourceFoundException ex) {
    return new ResponseEntity<>(new CustomErrorMessage(
        true, ex.getMessage(), "Sorry! The resource you request for was not found."), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<CustomErrorMessage> handleNoSuchElementException(NoSuchElementException ex) {
    return new ResponseEntity<>(new CustomErrorMessage(
        true, ex.getMessage(), "You possibly have requested for data using the wrong parameter value!"),
        HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<CustomErrorMessage> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    return new ResponseEntity<>(new CustomErrorMessage(
        true, ex.getMessage(), "Please login with your email if you're already a user."), HttpStatus.CONFLICT);
  }

  @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
  public ResponseEntity<CustomErrorMessage> handleHttpMediaTypeNotSupportedException(
      HttpMediaTypeNotSupportedException ex) {
    return new ResponseEntity<>(new CustomErrorMessage(
        true, ex.getMessage(), "Unsupported Media Type."), HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<CustomErrorMessage> handleGeneralException(Exception ex) {
    return new ResponseEntity<>(new CustomErrorMessage(
        true, ex.getMessage(), ""), HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
