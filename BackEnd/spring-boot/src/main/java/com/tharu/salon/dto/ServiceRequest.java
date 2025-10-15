package com.tharu.salon.dto;

import com.tharu.salon.domain.Service;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class ServiceRequest {
    @NotBlank(message = "Service name is required")
    @Size(max = 255, message = "Service name must not exceed 255 characters")
    private String name;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Duration is required")
    @Min(value = 15, message = "Duration must be at least 15 minutes")
    @Max(value = 480, message = "Duration must not exceed 480 minutes")
    private Integer durationMinutes;

    @NotNull(message = "Category is required")
    private Service.ServiceCategory category;

    private String imageUrl;

    private Boolean isActive = true;

    // Constructors
    public ServiceRequest() {
    }

    public ServiceRequest(String name, String description, BigDecimal price, Integer durationMinutes,
            Service.ServiceCategory category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.durationMinutes = durationMinutes;
        this.category = category;
    }

    // Getters and Setters
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
