package com.programming.tech.PaymentGateway.jpa;

import com.programming.tech.PaymentGateway.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
