package com.programming.tech.PaymentGateway.service;

import com.programming.tech.PaymentGateway.entity.User;
import com.programming.tech.PaymentGateway.jpa.UserRepository;
import com.programming.tech.PaymentGateway.view.UserDto.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.json.JSONObject;
import com.razorpay.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public String addUser(UserRequest userRequest) throws Exception {
        User user = User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .donateMoney(userRequest.getDonateMoney())
                .build();

        var client = new RazorpayClient("rzp_test_Xn4HB4uGySyEym", "mFIKp700E5FPS6OtY3hjXv8t");

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount",userRequest.getDonateMoney()*100);
        orderRequest.put("currency","INR");
        orderRequest.put("receipt", "receipt#1");
        JSONObject notes = new JSONObject();
        notes.put("notes_key_1","Tea, Earl Grey, Hot");
        orderRequest.put("notes",notes);

        Order order = client.orders.create(orderRequest);
        System.out.println(order.toString());
        userRepository.save(user);

        return order.toString();
    }
}
