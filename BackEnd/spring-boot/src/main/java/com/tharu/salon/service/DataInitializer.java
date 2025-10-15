package com.tharu.salon.service;

import com.tharu.salon.domain.Role;
import com.tharu.salon.domain.User;
import com.tharu.salon.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Create owner
            User owner = new User();
            owner.setFirstName("Owner");
            owner.setLastName("User");
            owner.setEmail("owner@example.com");
            owner.setPassword(passwordEncoder.encode("password"));
            owner.setPhone("1234567890");
            owner.setRole(Role.OWNER);
            userRepository.save(owner);

            // Create staff
            User staff = new User();
            staff.setFirstName("Staff");
            staff.setLastName("User");
            staff.setEmail("staff@example.com");
            staff.setPassword(passwordEncoder.encode("password"));
            staff.setPhone("0987654321");
            staff.setRole(Role.STAFF);
            userRepository.save(staff);

            // Create customer
            User customer = new User();
            customer.setFirstName("Customer");
            customer.setLastName("User");
            customer.setEmail("customer@example.com");
            customer.setPassword(passwordEncoder.encode("password"));
            customer.setPhone("1122334455");
            customer.setRole(Role.CUSTOMER);
            userRepository.save(customer);
        }
    }
}