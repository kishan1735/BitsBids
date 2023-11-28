package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;
import com.example.demo.request_models.UserRequest;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/")
    public Map<String, ResponseEntity<String>> findUserByEmail(@RequestBody UserRequest request) {
        try {
            Optional<UserModel> userOptional = userRepository.findByEmail(request.getEmail());
            if (userOptional.isEmpty()) {
                throw new RuntimeException("User not found");
            }
            return Collections.singletonMap("user", ResponseEntity.ok().body(userOptional.get().getName()));
        } catch (Exception e) {
            return Collections.singletonMap("error", ResponseEntity.badRequest().body("Failed: " + e.getMessage()));
        }
    }

    @PatchMapping("/")
    public ResponseEntity<?> updateUserDetails(@RequestBody UserRequest request) {
        try {
            Optional<UserModel> userOptional = userRepository.findByEmail(request.getEmail());
            if (userOptional.isEmpty()) {
                throw new RuntimeException("User not found");
            }

            UserModel user = userOptional.get();
            user.setName(request.getName());
            user.setPhoneNumber(request.getPhoneNumber());
            user.setHostel(request.getHostel());

            userRepository.save(user);

            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed: " + e.getMessage());
        }
    }
}
