package com.tharu.salon.config;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Value("${app.cors-origins:http://localhost:5173}")
    private String corsOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                List<String> allowedOrigins = Arrays.stream(corsOrigins.split(","))
                        .map(String::trim)
                        .filter(origin -> !origin.isEmpty())
                        .collect(Collectors.toList());

                registry.addMapping("/**")
                        .allowedOrigins(allowedOrigins.toArray(String[]::new))
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}
