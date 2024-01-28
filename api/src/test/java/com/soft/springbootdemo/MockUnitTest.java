package com.soft.springbootdemo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.soft.springbootdemo.controller.UserController;
import com.soft.springbootdemo.dto.UserRegistrationDTO;
import com.soft.springbootdemo.dto.responsedto.UserDTO;
import com.soft.springbootdemo.model.Role;
import com.soft.springbootdemo.model.User;
import com.soft.springbootdemo.service.user.UserService;
import com.soft.springbootdemo.util.Util;

@ExtendWith(SpringExtension.class)
public class MockUnitTest {

  @Mock
  private UserService userService;

  @InjectMocks
  private UserController userController;

  @Test
  public void testRetrieveAllUsers() {
    UUID softId = UUID.randomUUID();
    UUID iykeId = UUID.randomUUID();

    List<UserDTO> users = List.of(
        new UserDTO(
            softId, "soft", "letmein", "soft@mail.com", "1", null, null, null),
        new UserDTO(iykeId, "iyke", "letmein", "iyke@mail.com", "1", null, null, null));

    Mockito.when(userService.findAll()).thenReturn(users);

    ResponseEntity<Collection<UserDTO>> retrievedUsers = userController.findAll();

    List<UserDTO> userDTOs = (List<UserDTO>) retrievedUsers.getBody();

    assertEquals(HttpStatus.OK, retrievedUsers.getStatusCode());

    assertEquals(
        users.size(),
        userDTOs.size());

    assertEquals(
        users.get(0).getId(),
        userDTOs.get(0).getId());

  }

  @Test
  public void testSaveUserWhenOk() {
    UserRegistrationDTO mockUserRegDTO = new UserRegistrationDTO("John", "Doe", "john", "noway", "noway",
        "johndoe@email.com", "Male", Date.valueOf(LocalDate.now()), "", "");

    Mockito.when(userService.saveUserWithRoles(Mockito.any(User.class), Mockito.anyList()))
        .thenAnswer(invocation -> {
          // Simulate the behavior of userRepo.save(user)
          User userArgument = invocation.getArgument(0);
          // Assuming the save operation was successful, return the same user object
          System.out.println("BODY: " + userArgument);
          return userArgument;
        });

    ResponseEntity<User> savedUserResponse = userController.saveUser(mockUserRegDTO);

    assertEquals(HttpStatus.OK, savedUserResponse.getStatusCode());

    assertEquals(
      mockUserRegDTO.getUsername(), 
      savedUserResponse.getBody().getUsername());

  }

}
