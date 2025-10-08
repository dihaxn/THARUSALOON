package com.tharu.salon.dto;

import com.tharu.salon.domain.Booking;
import java.time.LocalDate;
import java.time.OffsetDateTime;

public record BookingResponse(
        Long id,
        String reference,
        String clientName,
        String service,
        String artist,
        LocalDate eventDate,
        String status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {

    public static BookingResponse fromEntity(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getReference(),
                booking.getClientName(),
                booking.getService(),
                booking.getArtist(),
                booking.getEventDate(),
                booking.getStatus().name(),
                booking.getCreatedAt(),
                booking.getUpdatedAt()
        );
    }
}
