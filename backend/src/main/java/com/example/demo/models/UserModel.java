package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Document(collection = "users")
public class UserModel {

    @Id
    private String id;

    @NotBlank(message = "You must provide a name")
    private String name;

    @NotBlank(message = "You must provide an email")
    @Email(message = "Provide a valid email")
    private String email;

    @NotBlank(message = "You must provide an id")
    private String userId;

    @Min(value = 8, message = "Password must be at least 8 characters long")
    private String password;

    private String role;

    private int phoneNumber;

    private int bitscoins;

    private List<TransactionModel> transactionHistory;

    private String hostel;

    private Date createdAt;

    private Date passwordChangedAt;

    private String profilePicture;

    private Chat chats;

    // Constructors

    public UserModel() {
        // Default constructor
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getBitscoins() {
        return bitscoins;
    }

    public void setBitscoins(int bitscoins) {
        this.bitscoins = bitscoins;
    }

    public List<TransactionModel> getTransactionHistory() {
        return transactionHistory;
    }

    public void setTransactionHistory(List<TransactionModel> transactionHistory) {
        this.transactionHistory = transactionHistory;
    }

    public String getHostel() {
        return hostel;
    }

    public void setHostel(String hostel) {
        this.hostel = hostel;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getPasswordChangedAt() {
        return passwordChangedAt;
    }

    public void setPasswordChangedAt(Date passwordChangedAt) {
        this.passwordChangedAt = passwordChangedAt;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Chat getChats() {
        return chats;
    }

    public void setChats(Chat chats) {
        this.chats = chats;
    }
}
