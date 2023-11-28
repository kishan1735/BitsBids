package com.example.demo.request_models;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class UserRequest {

    @NotBlank(message = "You must provide a name")
    private String name;

    @NotBlank(message = "You must provide an email")
    @Email(message = "Provide a valid email")
    private String email;

    @Min(value = 1, message = "Phone number must be a positive integer")
    private int phoneNumber;

    @NotBlank(message = "You must provide a hostel")
    private String hostel;

    // Constructors, getters, and setters

    public UserRequest() {
        // Default constructor
    }

    // Add constructors, getters, and setters here
    public String getEmail() {
        return email;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for phoneNumber
    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // Getter and Setter for hostel
    public String getHostel() {
        return hostel;
    }

    public void setHostel(String hostel) {
        this.hostel = hostel;
    }
}
