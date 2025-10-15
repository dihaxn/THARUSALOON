package com.tharu.salon.service;

import com.tharu.salon.domain.Booking;
import com.tharu.salon.domain.User;
import com.tharu.salon.dto.BookingDTO;
import com.tharu.salon.repository.BookingRepository;
import com.tharu.salon.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    public Booking createBooking(BookingDTO bookingDTO) {
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setReference(bookingDTO.getReference());
        booking.setClientName(bookingDTO.getClientName());
        booking.setService(bookingDTO.getService());
        booking.setArtist(bookingDTO.getArtist());
        booking.setEventDate(bookingDTO.getEventDate());
        booking.setStatus(bookingDTO.getStatus());
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public Booking updateBooking(Long id, BookingDTO bookingDTO) {
        Booking booking = getBookingById(id);
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        booking.setUser(user);
        booking.setReference(bookingDTO.getReference());
        booking.setClientName(bookingDTO.getClientName());
        booking.setService(bookingDTO.getService());
        booking.setArtist(bookingDTO.getArtist());
        booking.setEventDate(bookingDTO.getEventDate());
        booking.setStatus(bookingDTO.getStatus());
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}