package com.tharu.salon.repository;

import com.tharu.salon.domain.Appointment;
import com.tharu.salon.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByCustomerOrderByAppointmentDateDescAppointmentTimeDesc(User customer);

    List<Appointment> findByStaffOrderByAppointmentDateDescAppointmentTimeDesc(User staff);

    List<Appointment> findByAppointmentDateOrderByAppointmentTime(LocalDate date);

    List<Appointment> findByAppointmentDateAndStaffOrderByAppointmentTime(LocalDate date, User staff);

    List<Appointment> findByCustomerAndAppointmentDateBetweenOrderByAppointmentDateDescAppointmentTimeDesc(
            User customer, LocalDate startDate, LocalDate endDate);

    List<Appointment> findByStaffAndAppointmentDateBetweenOrderByAppointmentDateDescAppointmentTimeDesc(
            User staff, LocalDate startDate, LocalDate endDate);

    List<Appointment> findByStatus(Appointment.AppointmentStatus status);

    List<Appointment> findByCustomerAndStatusOrderByAppointmentDateDescAppointmentTimeDesc(
            User customer, Appointment.AppointmentStatus status);

    List<Appointment> findByStaffAndStatusOrderByAppointmentDateDescAppointmentTimeDesc(
            User staff, Appointment.AppointmentStatus status);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate = :date AND a.staff = :staff AND a.status IN ('CONFIRMED', 'IN_PROGRESS') ORDER BY a.appointmentTime")
    List<Appointment> findConfirmedAppointmentsByDateAndStaff(@Param("date") LocalDate date,
            @Param("staff") User staff);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate >= :startDate AND a.appointmentDate <= :endDate AND a.status = 'COMPLETED'")
    List<Appointment> findCompletedAppointmentsBetweenDates(@Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate >= :startDate AND a.appointmentDate <= :endDate")
    List<Appointment> findAppointmentsBetweenDates(@Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.staff = :staff AND a.appointmentDate >= :startDate AND a.appointmentDate <= :endDate AND a.status = 'COMPLETED'")
    Long countCompletedAppointmentsByStaffBetweenDates(@Param("staff") User staff,
            @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.appointmentDate >= :startDate AND a.appointmentDate <= :endDate AND a.status = 'COMPLETED'")
    Long countCompletedAppointmentsBetweenDates(@Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    Optional<Appointment> findByIdAndCustomer(Long id, User customer);

    Optional<Appointment> findByIdAndStaff(Long id, User staff);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate = :date AND a.appointmentTime = :time AND a.staff = :staff AND a.status != 'CANCELLED'")
    Optional<Appointment> findConflictingAppointment(@Param("date") LocalDate date, @Param("time") String time,
            @Param("staff") User staff);
}
