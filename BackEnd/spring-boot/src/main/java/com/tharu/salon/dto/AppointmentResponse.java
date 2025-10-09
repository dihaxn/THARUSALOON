package com.tharu.salon.dto;

import com.tharu.salon.domain.Appointment;
import com.tharu.salon.domain.User;
import com.tharu.salon.domain.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class AppointmentResponse {
    private Long id;
    private UserSummary customer;
    private UserSummary staff;
    private ServiceResponse service;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private Integer durationMinutes;
    private Appointment.AppointmentStatus status;
    private BigDecimal price;
    private String notes;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public AppointmentResponse() {
    }

    public AppointmentResponse(Long id, UserSummary customer, UserSummary staff, ServiceResponse service,
            LocalDate appointmentDate, LocalTime appointmentTime, Integer durationMinutes,
            Appointment.AppointmentStatus status, BigDecimal price, String notes,
            String location, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.customer = customer;
        this.staff = staff;
        this.service = service;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.durationMinutes = durationMinutes;
        this.status = status;
        this.price = price;
        this.notes = notes;
        this.location = location;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Static factory method
    public static AppointmentResponse fromAppointment(Appointment appointment) {
        UserSummary customerSummary = appointment.getCustomer() != null
                ? UserSummary.fromUser(appointment.getCustomer())
                : null;
        UserSummary staffSummary = appointment.getStaff() != null ? UserSummary.fromUser(appointment.getStaff()) : null;
        ServiceResponse serviceResponse = appointment.getService() != null
                ? ServiceResponse.fromService(appointment.getService())
                : null;

        return new AppointmentResponse(
                appointment.getId(),
                customerSummary,
                staffSummary,
                serviceResponse,
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime(),
                appointment.getDurationMinutes(),
                appointment.getStatus(),
                appointment.getPrice(),
                appointment.getNotes(),
                appointment.getLocation(),
                appointment.getCreatedAt(),
                appointment.getUpdatedAt());
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserSummary getCustomer() {
        return customer;
    }

    public void setCustomer(UserSummary customer) {
        this.customer = customer;
    }

    public UserSummary getStaff() {
        return staff;
    }

    public void setStaff(UserSummary staff) {
        this.staff = staff;
    }

    public ServiceResponse getService() {
        return service;
    }

    public void setService(ServiceResponse service) {
        this.service = service;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Appointment.AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(Appointment.AppointmentStatus status) {
        this.status = status;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Inner class for user summary
    public static class UserSummary {
        private Long id;
        private String name;
        private String email;
        private String role;

        public UserSummary() {
        }

        public UserSummary(Long id, String name, String email, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }

        public static UserSummary fromUser(User user) {
            return new UserSummary(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole().toString());
        }

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
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

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
