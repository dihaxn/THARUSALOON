package com.tharu.salon.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.tharu.salon.domain.Service;
import com.tharu.salon.dto.ServiceRequest;
import com.tharu.salon.dto.ServiceResponse;
import com.tharu.salon.repository.ServiceRepository;

@Transactional
@org.springframework.stereotype.Service 
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<ServiceResponse> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(ServiceResponse::fromService)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> getActiveServices() {
        return serviceRepository.findByIsActiveTrue().stream()
                .map(ServiceResponse::fromService)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> getServicesByCategory(Service.ServiceCategory category) {
        return serviceRepository.findByIsActiveTrueAndCategory(category).stream()
                .map(ServiceResponse::fromService)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> searchServices(String searchTerm) {
        return serviceRepository.findActiveServicesBySearchTerm(searchTerm).stream()
                .map(ServiceResponse::fromService)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> getServicesByPriceRange(Double minPrice, Double maxPrice) {
        return serviceRepository.findActiveServicesByPriceRange(minPrice, maxPrice).stream()
                .map(ServiceResponse::fromService)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> getServicesOrderedByPrice(boolean ascending) {
        List<Service> services = ascending ? serviceRepository.findActiveServicesOrderByPriceAsc()
                : serviceRepository.findActiveServicesOrderByPriceDesc();

        return services.stream()
                .map(ServiceResponse::fromService)
                .collect(Collectors.toList());
    }

    

    public List<Service.ServiceCategory> getActiveCategories() {
        return serviceRepository.findDistinctActiveCategories();
    }

    public Optional<ServiceResponse> getServiceById(Long id) {
        return serviceRepository.findByIdAndIsActiveTrue(id)
                .map(ServiceResponse::fromService);
    }

    public ServiceResponse createService(ServiceRequest serviceRequest) {
        Service service = new Service(
                serviceRequest.getName(),
                serviceRequest.getDescription(),
                serviceRequest.getPrice(),
                serviceRequest.getDurationMinutes(),
                serviceRequest.getCategory());

        service.setImageUrl(serviceRequest.getImageUrl());
        service.setIsActive(serviceRequest.getIsActive());

        Service savedService = serviceRepository.save(service);
        return ServiceResponse.fromService(savedService);
    }

    public Optional<ServiceResponse> updateService(Long id, ServiceRequest serviceRequest) {
        return serviceRepository.findById(id).map(service -> {
            service.setName(serviceRequest.getName());
            service.setDescription(serviceRequest.getDescription());
            service.setPrice(serviceRequest.getPrice());
            service.setDurationMinutes(serviceRequest.getDurationMinutes());
            service.setCategory(serviceRequest.getCategory());
            service.setImageUrl(serviceRequest.getImageUrl());
            service.setIsActive(serviceRequest.getIsActive());

            Service savedService = serviceRepository.save(service);
            return ServiceResponse.fromService(savedService);
        });
    }

    public boolean deleteService(Long id) {
        if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean deactivateService(Long id) {
        return serviceRepository.findById(id).map(service -> {
            service.setIsActive(false);
            serviceRepository.save(service);
            return true;
        }).orElse(false);
    }

    public boolean activateService(Long id) {
        return serviceRepository.findById(id).map(service -> {
            service.setIsActive(true);
            serviceRepository.save(service);
            return true;
        }).orElse(false);
    }
}
