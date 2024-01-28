package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
// @NoArgsConstructor
@AllArgsConstructor
public class User {

  public enum Status {
    ZERO("0"),
    ONE("1");

    private String value;

    private Status(String value) {
      this.value = value;
    }

    /**
     * @return the value
     */
    public String getValue() {
      return value;
    }

  } 

  @Id
  private UUID id;

  @Column(unique = true, nullable = false)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(
    name = "status",
    nullable = false, 
    columnDefinition = "ENUM('0', '1') DEFAULT '1'")
  private String status = Status.ONE.getValue();

  @CreationTimestamp
  @Column(nullable = false)
  private LocalDateTime created;
  
  private LocalDateTime updated;

  @OneToMany(mappedBy = "user", orphanRemoval=true)
  private Collection<UserRole> userRoles;

  public User() {
    this(UUID.randomUUID(), null, null, null, Status.ONE.getValue(), null, null, new ArrayList<>());
  }

  @Override
  public String toString() {
    return "User [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email + ", status="
        + status + ", created=" + created + ", updated=" + updated + ", userRoles=" + userRoles + "]";
  }
  
}
