-- ==========================================================
-- Aura Booking — Database Schema (MySQL 8.4 LTS)
-- Domain: Luxury Multi-Step Appointment & Wellness Booking
-- ==========================================================

DROP TABLE IF EXISTS customer_reviews;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS working_hours;
DROP TABLE IF EXISTS professionals;
DROP TABLE IF EXISTS services;

-- 1. Services Table
CREATE TABLE services (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category ENUM('massage', 'hair', 'facial', 'wellness') NOT NULL,
    duration_minutes INT UNSIGNED NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    badge VARCHAR(50) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_services_category (category),
    INDEX idx_services_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Professionals / Specialists Table
CREATE TABLE professionals (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(150) NOT NULL,
    specialty VARCHAR(150) NOT NULL,
    avatar_url VARCHAR(500) NOT NULL,
    rating DECIMAL(3, 2) NOT NULL DEFAULT 5.00,
    reviews_count INT UNSIGNED NOT NULL DEFAULT 0,
    bio TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_professionals_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Working Hours Table
CREATE TABLE working_hours (
    id VARCHAR(36) PRIMARY KEY,
    professional_id VARCHAR(36) NOT NULL,
    day_of_week TINYINT UNSIGNED NOT NULL COMMENT '0=Sunday, 1=Monday... 6=Saturday',
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_working_hours_prof FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE,
    UNIQUE KEY uq_prof_day (professional_id, day_of_week)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bookings Table (Strict concurrency control)
CREATE TABLE bookings (
    id VARCHAR(36) PRIMARY KEY,
    booking_code VARCHAR(20) NOT NULL UNIQUE COMMENT 'Human-readable voucher code e.g. #AUR-9482',
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    special_requests TEXT NULL,
    marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
    service_id VARCHAR(36) NOT NULL,
    professional_id VARCHAR(36) NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    service_price DECIMAL(10, 2) NOT NULL,
    service_fee DECIMAL(10, 2) NOT NULL DEFAULT 10.00,
    vat_amount DECIMAL(10, 2) NOT NULL,
    promo_discount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_preference ENUM('pay_now', 'pay_at_venue') NOT NULL DEFAULT 'pay_now',
    payment_status ENUM('paid', 'pending', 'refunded') NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50) NULL,
    status ENUM('confirmed', 'pending', 'cancelled', 'completed') NOT NULL DEFAULT 'confirmed',
    qr_payload VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_bookings_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
    CONSTRAINT fk_bookings_prof FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE RESTRICT,
    -- Concurrency safeguard: a professional cannot be double-booked at the same time and date
    UNIQUE KEY uq_prof_schedule (professional_id, booking_date, start_time),
    INDEX idx_bookings_date (booking_date),
    INDEX idx_bookings_email (customer_email),
    INDEX idx_bookings_code (booking_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Customer Reviews Table
CREATE TABLE customer_reviews (
    id VARCHAR(36) PRIMARY KEY,
    booking_id VARCHAR(36) NOT NULL,
    professional_id VARCHAR(36) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    rating TINYINT UNSIGNED NOT NULL COMMENT '1 to 5 stars',
    comment TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reviews_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_prof FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
