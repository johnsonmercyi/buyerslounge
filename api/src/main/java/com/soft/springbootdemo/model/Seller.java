package com.soft.springbootdemo.model;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@AllArgsConstructor
@Data
public class Seller {
    @Id
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false)
    private String gender;

    private Date dob;
    private String address;
    private String nationality;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime created;

    private LocalDateTime updated;

    public Seller(){
        this(UUID.randomUUID(), null, null, null, null, null, null, null, null, null);
    }
    
}
