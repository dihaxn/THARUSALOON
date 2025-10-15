package com.tharu.salon.controller;

import com.tharu.salon.domain.Service;
import com.tharu.salon.dto.ServiceRequest;
import com.tharu.salon.dto.ServiceResponse;
import com.tharu.salon.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping
    public ResponseEntity<List<ServiceResponse>> getAllServices() {
        List<ServiceResponse> services = serviceService.getActiveServices();
        return ResponseEntity.ok(services);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ServiceResponse>> getAllServicesIncludingInactive() {
        List<ServiceResponse> services = serviceService.getAllServices();
        return ResponseEntity.ok(services);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse> getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id)
                .map(service -> ResponseEntity.ok(service))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ServiceResponse>> getServicesByCategory(@PathVariable Service.ServiceCategory category) {
        List<ServiceResponse> services = serviceService.getServicesByCategory(category);
        return ResponseEntity.ok(services);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ServiceResponse>> searchServices(@RequestParam String q) {
        List<ServiceResponse> services = serviceService.searchServices(q);
        return ResponseEntity.ok(services);
    }

    @GetMapping("/price-range")
    public ResponseEntity<List<ServiceResponse>> getServicesByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        List<ServiceResponse> services = serviceService.getServicesByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(services);
    }

    @GetMapping("/sorted")
    public ResponseEntity<List<ServiceResponse>> getServicesSortedByPrice(
            @RequestParam(defaultValue = "true") boolean ascending) {
        List<ServiceResponse> services = serviceService.getServicesOrderedByPrice(ascending);
        return ResponseEntity.ok(services);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Service.ServiceCategory>> getActiveCategories() {
        List<Service.ServiceCategory> categories = serviceService.getActiveCategories();
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<ServiceResponse> createService(@Valid @RequestBody ServiceRequest serviceRequest) {
        try {
            ServiceResponse service = serviceService.createService(serviceRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(service);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponse> updateService(@PathVariable Long id,
            @Valid @RequestBody ServiceRequest serviceRequest) {
        try {
            return serviceService.updateService(id, serviceRequest)
                    .map(service -> ResponseEntity.ok(service))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        boolean deleted = serviceService.deleteService(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateService(@PathVariable Long id) {
        boolean deactivated = serviceService.deactivateService(id);
        return deactivated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateService(@PathVariable Long id) {
        boolean activated = serviceService.activateService(id);
        return activated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
