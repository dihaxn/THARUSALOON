package com.tharu.salon.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.tharu.salon.domain.Appointment;
import com.tharu.salon.domain.Service;
import com.tharu.salon.domain.User;
import com.tharu.salon.dto.AppointmentRequest;
import com.tharu.salon.dto.AppointmentResponse;
import com.tharu.salon.repository.AppointmentRepository;
import com.tharu.salon.repository.ServiceRepository;
import com.tharu.salon.repository.UserRepository;


@Transactional
@org.springframework.stereotype.Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByCustomer(Long customerId) {
        User customer = userRepository.findById(customerId).orElse(null);
        if (customer == null) {
            return List.of();
        }

        return appointmentRepository.findByCustomerOrderByAppointmentDateDescAppointmentTimeDesc(customer).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByStaff(Long staffId) {
        User staff = userRepository.findById(staffId).orElse(null);
        if (staff == null) {
            return List.of();
        }

        return appointmentRepository.findByStaffOrderByAppointmentDateDescAppointmentTimeDesc(staff).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDateOrderByAppointmentTime(date).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByDateAndStaff(LocalDate date, Long staffId) {
        User staff = userRepository.findById(staffId).orElse(null);
        if (staff == null) {
            return List.of();
        }

        return appointmentRepository.findByAppointmentDateAndStaffOrderByAppointmentTime(date, staff).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByStatus(Appointment.AppointmentStatus status) {
        return appointmentRepository.findByStatus(status).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getCustomerAppointmentsByStatus(Long customerId,
            Appointment.AppointmentStatus status) {
        User customer = userRepository.findById(customerId).orElse(null);
        if (customer == null) {
            return List.of();
        }

        return appointmentRepository
                .findByCustomerAndStatusOrderByAppointmentDateDescAppointmentTimeDesc(customer, status).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getStaffAppointmentsByStatus(Long staffId, Appointment.AppointmentStatus status) {
        User staff = userRepository.findById(staffId).orElse(null);
        if (staff == null) {
            return List.of();
        }

        return appointmentRepository.findByStaffAndStatusOrderByAppointmentDateDescAppointmentTimeDesc(staff, status)
                .stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsBetweenDates(LocalDate startDate, LocalDate endDate) {
        return appointmentRepository.findAppointmentsBetweenDates(startDate, endDate).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getCompletedAppointmentsBetweenDates(LocalDate startDate, LocalDate endDate) {
        return appointmentRepository.findCompletedAppointmentsBetweenDates(startDate, endDate).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    public Optional<AppointmentResponse> getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .map(AppointmentResponse::fromAppointment);
    }

    public Optional<AppointmentResponse> getCustomerAppointmentById(Long id, Long customerId) {
        User customer = userRepository.findById(customerId).orElse(null);
        if (customer == null) {
            return Optional.empty();
        }

        return appointmentRepository.findByIdAndCustomer(id, customer)
                .map(AppointmentResponse::fromAppointment);
    }

    public Optional<AppointmentResponse> getStaffAppointmentById(Long id, Long staffId) {
        User staff = userRepository.findById(staffId).orElse(null);
        if (staff == null) {
            return Optional.empty();
        }

        return appointmentRepository.findByIdAndStaff(id, staff)
                .map(AppointmentResponse::fromAppointment);
    }

    public AppointmentResponse createAppointment(AppointmentRequest appointmentRequest) {
        User customer = userRepository.findById(appointmentRequest.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        User staff = null;
        if (appointmentRequest.getStaffId() != null) {
            staff = userRepository.findById(appointmentRequest.getStaffId())
                    .orElseThrow(() -> new RuntimeException("Staff not found"));
        }

        Service service = serviceRepository.findById(appointmentRequest.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        // Check for conflicts if staff is specified
        if (staff != null) {
            Optional<Appointment> conflict = appointmentRepository.findConflictingAppointment(
                    appointmentRequest.getAppointmentDate(),
                    appointmentRequest.getAppointmentTime().toString(),
                    staff);
            if (conflict.isPresent()) {
                throw new RuntimeException("Time slot is already booked");
            }
        }

        Appointment appointment = new Appointment(
                customer,
                staff,
                service,
                appointmentRequest.getAppointmentDate(),
                appointmentRequest.getAppointmentTime(),
                appointmentRequest.getStatus(),
                appointmentRequest.getPrice() != null ? appointmentRequest.getPrice() : service.getPrice());

        appointment.setNotes(appointmentRequest.getNotes());
        appointment.setLocation(appointmentRequest.getLocation());

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return AppointmentResponse.fromAppointment(savedAppointment);
    }

    public Optional<AppointmentResponse> updateAppointment(Long id, AppointmentRequest appointmentRequest) {
        return appointmentRepository.findById(id).map(appointment -> {
            if (appointmentRequest.getStaffId() != null) {
                User staff = userRepository.findById(appointmentRequest.getStaffId())
                        .orElseThrow(() -> new RuntimeException("Staff not found"));
                appointment.setStaff(staff);
            }

            if (appointmentRequest.getServiceId() != null) {
                Service service = serviceRepository.findById(appointmentRequest.getServiceId())
                        .orElseThrow(() -> new RuntimeException("Service not found"));
                appointment.setService(service);
            }

            if (appointmentRequest.getAppointmentDate() != null) {
                appointment.setAppointmentDate(appointmentRequest.getAppointmentDate());
            }

            if (appointmentRequest.getAppointmentTime() != null) {
                appointment.setAppointmentTime(appointmentRequest.getAppointmentTime());
            }

            if (appointmentRequest.getStatus() != null) {
                appointment.setStatus(appointmentRequest.getStatus());
            }

            if (appointmentRequest.getPrice() != null) {
                appointment.setPrice(appointmentRequest.getPrice());
            }

            if (appointmentRequest.getNotes() != null) {
                appointment.setNotes(appointmentRequest.getNotes());
            }

            if (appointmentRequest.getLocation() != null) {
                appointment.setLocation(appointmentRequest.getLocation());
            }

            Appointment savedAppointment = appointmentRepository.save(appointment);
            return AppointmentResponse.fromAppointment(savedAppointment);
        });
    }

    public Optional<AppointmentResponse> updateAppointmentStatus(Long id, Appointment.AppointmentStatus status) {
        return appointmentRepository.findById(id).map(appointment -> {
            appointment.setStatus(status);
            Appointment savedAppointment = appointmentRepository.save(appointment);
            return AppointmentResponse.fromAppointment(savedAppointment);
        });
    }

    public boolean deleteAppointment(Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean cancelAppointment(Long id) {
        return updateAppointmentStatus(id, Appointment.AppointmentStatus.CANCELLED).isPresent();
    }

    public Long getCompletedAppointmentsCountByStaff(Long staffId, LocalDate startDate, LocalDate endDate) {
        User staff = userRepository.findById(staffId).orElse(null);
        if (staff == null) {
            return 0L;
        }

        return appointmentRepository.countCompletedAppointmentsByStaffBetweenDates(staff, startDate, endDate);
    }

    public Long getCompletedAppointmentsCount(LocalDate startDate, LocalDate endDate) {
        return appointmentRepository.countCompletedAppointmentsBetweenDates(startDate, endDate);
    }
}
