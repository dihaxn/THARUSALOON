package com.tharu.salon.service;

import com.tharu.salon.domain.Role;
import com.tharu.salon.domain.User;
import com.tharu.salon.dto.RegisterRequest;
import com.tharu.salon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public User createUser(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists: " + registerRequest.getEmail());
        }

        User user = new User();
        // FIX: Use firstName and lastName
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPhone(registerRequest.getPhone());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        // FIX: Use Role enum directly and provide a default
        user.setRole(registerRequest.getRole() != null ? registerRequest.getRole() : Role.CUSTOMER);
        user.setEnabled(true);

        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(Role role) {
        // FIX: Use Role enum directly
        return userRepository.findByRole(role);
    }

    public List<User> getAllStaff() {
        // FIX: Use Role enum directly
        return userRepository.findByRoleIn(List.of(Role.OWNER, Role.STAFF));
    }

    public List<User> getAllCustomers() {
        // FIX: Use Role enum directly
        return userRepository.findByRole(Role.CUSTOMER);
    }

    public Optional<User> updateUser(Long id, RegisterRequest registerRequest) {
        return userRepository.findById(id).map(user -> {
            // FIX: Use firstName and lastName
            user.setFirstName(registerRequest.getFirstName());
            user.setLastName(registerRequest.getLastName());
            user.setEmail(registerRequest.getEmail());
            user.setPhone(registerRequest.getPhone());

            if (registerRequest.getPassword() != null && !registerRequest.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            }

            user.setRole(registerRequest.getRole());
            // This line will work once User.java is fixed
            user.setUpdatedAt(LocalDateTime.now());

            return userRepository.save(user);
        });
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User activateUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(true);
        return userRepository.save(user);
    }

    public User deactivateUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(false);
        return userRepository.save(user);
    }
}