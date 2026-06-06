package com.yasasri.placementpilot.controller;

import com.yasasri.placementpilot.dto.LoginRequest;
import com.yasasri.placementpilot.dto.LoginResponse;
import com.yasasri.placementpilot.dto.RegisterRequest;
import com.yasasri.placementpilot.dto.RegisterResponse;
import com.yasasri.placementpilot.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.yasasri.placementpilot.dto.UserResponse;
import com.yasasri.placementpilot.dto.ChangePasswordRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public RegisterResponse register(
            @RequestBody RegisterRequest request) {

        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return userService.login(request);
    }
    @GetMapping("/me")
    public UserResponse getCurrentUser() {

        return userService.getCurrentUser();
    }
    @PutMapping("/change-password")
    public String changePassword(
            @RequestBody
            ChangePasswordRequest request) {

        return userService
                .changePassword(request);
    }
}