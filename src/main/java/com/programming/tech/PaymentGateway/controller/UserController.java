package com.programming.tech.PaymentGateway.controller;

import com.programming.tech.PaymentGateway.service.UserService;
import com.programming.tech.PaymentGateway.view.UserDto.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String addUser(@RequestBody UserRequest userRequest) throws Exception {
        return userService.addUser(userRequest);
    }
}
