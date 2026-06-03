package com.yasasri.placementpilot.service;

import com.yasasri.placementpilot.dto.LoginRequest;
import com.yasasri.placementpilot.dto.LoginResponse;
import com.yasasri.placementpilot.dto.RegisterRequest;
import com.yasasri.placementpilot.dto.RegisterResponse;
import com.yasasri.placementpilot.model.User;
import com.yasasri.placementpilot.repository.UserRepository;
import com.yasasri.placementpilot.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.yasasri.placementpilot.dto.UserResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(
                        request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        boolean matched =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!matched) {
            throw new RuntimeException("Invalid password");
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail());

        return new LoginResponse(token);
    }
    public UserResponse getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        return new UserResponse(
                user.getName(),
                user.getEmail()
        );
    }
}