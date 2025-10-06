package com.tharu.salon.service;

import com.tharu.salon.domain.Booking;
import com.tharu.salon.repository.BookingRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> listUpcoming(int limit) {
        List<Booking> bookings = bookingRepository.findTop50ByOrderByEventDateAsc();
        if (bookings.size() <= limit) {
            return bookings;
        }
        return bookings.subList(0, limit);
    }

    public List<Booking> listBetween(LocalDate start, LocalDate end) {
        return bookingRepository.findByEventDateBetweenOrderByEventDateAsc(start, end);
    }
}
