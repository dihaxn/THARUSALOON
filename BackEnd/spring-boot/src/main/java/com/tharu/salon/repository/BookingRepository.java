package com.tharu.salon.repository;

import com.tharu.salon.domain.Booking;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findTop50ByOrderByEventDateAsc();

    List<Booking> findByEventDateBetweenOrderByEventDateAsc(LocalDate start, LocalDate end);
}
