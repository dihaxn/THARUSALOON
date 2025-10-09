package com.tharu.salon.controller;

import com.tharu.salon.domain.Appointment;
import com.tharu.salon.dto.AppointmentRequest;
import com.tharu.salon.dto.AppointmentResponse;
import com.tharu.salon.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        List<AppointmentResponse> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
                .map(appointment -> ResponseEntity.ok(appointment))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByCustomer(@PathVariable Long customerId) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByCustomer(customerId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByStaff(@PathVariable Long staffId) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByStaff(staffId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/customer/{customerId}/appointment/{id}")
    public ResponseEntity<AppointmentResponse> getCustomerAppointmentById(
            @PathVariable Long id,
            @PathVariable Long customerId) {
        return appointmentService.getCustomerAppointmentById(id, customerId)
                .map(appointment -> ResponseEntity.ok(appointment))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/staff/{staffId}/appointment/{id}")
    public ResponseEntity<AppointmentResponse> getStaffAppointmentById(
            @PathVariable Long id,
            @PathVariable Long staffId) {
        return appointmentService.getStaffAppointmentById(id, staffId)
                .map(appointment -> ResponseEntity.ok(appointment))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByDate(date);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/date/{date}/staff/{staffId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByDateAndStaff(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @PathVariable Long staffId) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByDateAndStaff(date, staffId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByStatus(
            @PathVariable Appointment.AppointmentStatus status) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByStatus(status);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/customer/{customerId}/status/{status}")
    public ResponseEntity<List<AppointmentResponse>> getCustomerAppointmentsByStatus(
            @PathVariable Long customerId,
            @PathVariable Appointment.AppointmentStatus status) {
        List<AppointmentResponse> appointments = appointmentService.getCustomerAppointmentsByStatus(customerId, status);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/staff/{staffId}/status/{status}")
    public ResponseEntity<List<AppointmentResponse>> getStaffAppointmentsByStatus(
            @PathVariable Long staffId,
            @PathVariable Appointment.AppointmentStatus status) {
        List<AppointmentResponse> appointments = appointmentService.getStaffAppointmentsByStatus(staffId, status);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsBetweenDates(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsBetweenDates(startDate, endDate);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/completed/date-range")
    public ResponseEntity<List<AppointmentResponse>> getCompletedAppointmentsBetweenDates(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<AppointmentResponse> appointments = appointmentService.getCompletedAppointmentsBetweenDates(startDate,
                endDate);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> createAppointment(
            @Valid @RequestBody AppointmentRequest appointmentRequest) {
        try {
            AppointmentResponse appointment = appointmentService.createAppointment(appointmentRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponse> updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequest appointmentRequest) {
        try {
            return appointmentService.updateAppointment(id, appointmentRequest)
                    .map(appointment -> ResponseEntity.ok(appointment))
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam Appointment.AppointmentStatus status) {
        return appointmentService.updateAppointmentStatus(id, status)
                .map(appointment -> ResponseEntity.ok(appointment))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<AppointmentResponse> cancelAppointment(@PathVariable Long id) {
        return appointmentService.updateAppointmentStatus(id, Appointment.AppointmentStatus.CANCELLED)
                .map(appointment -> ResponseEntity.ok(appointment))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        boolean deleted = appointmentService.deleteAppointment(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/stats/staff/{staffId}/completed")
    public ResponseEntity<Long> getCompletedAppointmentsCountByStaff(
            @PathVariable Long staffId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Long count = appointmentService.getCompletedAppointmentsCountByStaff(staffId, startDate, endDate);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/stats/completed")
    public ResponseEntity<Long> getCompletedAppointmentsCount(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Long count = appointmentService.getCompletedAppointmentsCount(startDate, endDate);
        return ResponseEntity.ok(count);
    }
}
