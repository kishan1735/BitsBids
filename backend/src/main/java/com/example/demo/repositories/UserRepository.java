package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.models.UserModel;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserModel, String> {

    Optional<UserModel> findByEmail(String email);

}
