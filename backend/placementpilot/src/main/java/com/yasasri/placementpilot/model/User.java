package com.yasasri.placementpilot.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "user")
    private List<Resume> resumes;
}