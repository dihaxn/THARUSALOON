package com.tharu.salon.repository;

import com.tharu.salon.domain.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findByIsActiveTrue();

    List<Service> findByCategory(Service.ServiceCategory category);

    List<Service> findByIsActiveTrueAndCategory(Service.ServiceCategory category);

    @Query("SELECT s FROM Service s WHERE s.isActive = true AND (LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(s.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Service> findActiveServicesBySearchTerm(@Param("searchTerm") String searchTerm);

    @Query("SELECT s FROM Service s WHERE s.isActive = true ORDER BY s.price ASC")
    List<Service> findActiveServicesOrderByPriceAsc();

    @Query("SELECT s FROM Service s WHERE s.isActive = true ORDER BY s.price DESC")
    List<Service> findActiveServicesOrderByPriceDesc();

    Optional<Service> findByIdAndIsActiveTrue(Long id);

    @Query("SELECT s FROM Service s WHERE s.isActive = true AND s.price BETWEEN :minPrice AND :maxPrice")
    List<Service> findActiveServicesByPriceRange(@Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice);

    @Query("SELECT DISTINCT s.category FROM Service s WHERE s.isActive = true")
    List<Service.ServiceCategory> findDistinctActiveCategories();
}
