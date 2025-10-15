package com.tharu.salon.controller;

import com.tharu.salon.dto.BookingResponse;
import com.tharu.salon.service.BookingService;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> listBookings(
            @RequestParam(name = "limit", defaultValue = "10") int limit,
            @RequestParam(name = "start", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(name = "end", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        List<BookingResponse> bookings;

        if (start != null && end != null) {
            bookings = bookingService.listBetween(start, end)
                    .stream()
                    .map(BookingResponse::fromEntity)
                    .collect(Collectors.toList());
        } else {
            bookings = bookingService.listUpcoming(limit)
                    .stream()
                    .map(BookingResponse::fromEntity)
                    .collect(Collectors.toList());
        }

        return ResponseEntity.ok(Map.of(
                "count", bookings.size(),
                "data", bookings
        ));
    }
}
