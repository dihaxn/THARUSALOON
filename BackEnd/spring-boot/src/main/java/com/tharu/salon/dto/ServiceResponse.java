package com.tharu.salon.dto;

import com.tharu.salon.domain.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ServiceResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer durationMinutes;
    private Service.ServiceCategory category;
    private Boolean isActive;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public ServiceResponse() {
    }

    public ServiceResponse(Long id, String name, String description, BigDecimal price,
            Integer durationMinutes, Service.ServiceCategory category,
            Boolean isActive, String imageUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.durationMinutes = durationMinutes;
        this.category = category;
        this.isActive = isActive;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Static factory method
    public static ServiceResponse fromService(Service service) {
        return new ServiceResponse(
                service.getId(),
                service.getName(),
                service.getDescription(),
                service.getPrice(),
                service.getDurationMinutes(),
                service.getCategory(),
                service.getIsActive(),
                service.getImageUrl(),
                service.getCreatedAt(),
                service.getUpdatedAt());
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Service.ServiceCategory getCategory() {
        return category;
    }

    public void setCategory(Service.ServiceCategory category) {
        this.category = category;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
}
