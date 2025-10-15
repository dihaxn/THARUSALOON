package com.tharu.salon.dto;

import com.tharu.salon.domain.Appointment;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequest {
    @NotNull(message = "Customer ID is required")
    private Long customerId;

    private Long staffId;

    @NotNull(message = "Service ID is required")
    private Long serviceId;

    @NotNull(message = "Appointment date is required")
    private LocalDate appointmentDate;

    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;

    private Appointment.AppointmentStatus status = Appointment.AppointmentStatus.PENDING;

    private BigDecimal price;

    @Size(max = 1000, message = "Notes must not exceed 1000 characters")
    private String notes;

    @Size(max = 255, message = "Location must not exceed 255 characters")
    private String location;

    // Constructors
    public AppointmentRequest() {
    }

    public AppointmentRequest(Long customerId, Long staffId, Long serviceId, LocalDate appointmentDate,
            LocalTime appointmentTime) {
        this.customerId = customerId;
        this.staffId = staffId;
        this.serviceId = serviceId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
    }

    // Getters and Setters
    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
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
}
