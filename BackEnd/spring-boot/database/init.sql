CREATE DATABASE IF NOT EXISTS `tharu_salon`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `tharu_salon`;

CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference` VARCHAR(32) NOT NULL,
  `client_name` VARCHAR(120) NOT NULL,
  `service` VARCHAR(160) NOT NULL,
  `artist` VARCHAR(120) NOT NULL,
  `event_date` DATE NOT NULL,
  `status` ENUM('PENDING','CONFIRMED','IN_REVIEW','COMPLETED','CANCELLED') DEFAULT 'PENDING',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_bookings_reference` (`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `bookings` (`reference`, `client_name`, `service`, `artist`, `event_date`, `status`)
VALUES
  ('BK-1024', 'Dilani & Nuwan', 'Signature Bridal Makeup', 'Ishara', '2025-11-12', 'CONFIRMED')
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP;
