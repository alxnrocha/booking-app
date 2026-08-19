# Modelo Relacional de Base de Datos (MySQL 8.4 LTS) — Aura Booking

Documentación técnica del esquema relacional y restricciones de integridad para el sistema de reservas multi-step de alta concurrencia.

---

## 📊 Diagrama Entidad-Relación (Mermaid DER)

```mermaid
erDiagram
    SERVICES ||--o{ BOOKINGS : "recibe"
    PROFESSIONALS ||--o{ BOOKINGS : "atiende"
    PROFESSIONALS ||--o{ WORKING_HOURS : "posee"
    PROFESSIONALS ||--o{ CUSTOMER_REVIEWS : "recibe"
    BOOKINGS ||--o{ CUSTOMER_REVIEWS : "origina"

    SERVICES {
        varchar(36) id PK
        varchar(150) name
        enum category "massage, hair, facial, wellness"
        int duration_minutes
        decimal price
        text description
        varchar(500) image_url
        varchar(50) badge
        boolean is_active
        timestamp created_at
    }

    PROFESSIONALS {
        varchar(36) id PK
        varchar(150) name
        varchar(150) title
        varchar(150) specialty
        varchar(500) avatar_url
        decimal rating
        int reviews_count
        text bio
        boolean is_active
        timestamp created_at
    }

    WORKING_HOURS {
        varchar(36) id PK
        varchar(36) professional_id FK
        tinyint day_of_week "0=Dom... 6=Sab"
        time start_time
        time end_time
        boolean is_active
    }

    BOOKINGS {
        varchar(36) id PK
        varchar(20) booking_code UK "ej: #AUR-9482"
        varchar(150) customer_name
        varchar(150) customer_email
        varchar(50) customer_phone
        text special_requests
        boolean marketing_consent
        varchar(36) service_id FK
        varchar(36) professional_id FK
        date booking_date
        time start_time
        time end_time
        decimal service_price
        decimal service_fee
        decimal vat_amount
        decimal promo_discount
        decimal total_amount
        enum payment_preference "pay_now, pay_at_venue"
        enum payment_status "paid, pending, refunded"
        varchar(50) payment_method
        enum status "confirmed, pending, cancelled, completed"
        varchar(255) qr_payload
        timestamp created_at
    }

    CUSTOMER_REVIEWS {
        varchar(36) id PK
        varchar(36) booking_id FK
        varchar(36) professional_id FK
        varchar(150) customer_name
        tinyint rating "1-5"
        text comment
        timestamp created_at
    }
```

---

## 🔒 Control de Concurrencia y Restricciones Clave

1. **Prevención de Doble Reserva (Double Booking Prevention):**
   ```sql
   UNIQUE KEY uq_prof_schedule (professional_id, booking_date, start_time)
   ```
   Garantiza a nivel de motor de base de datos (`InnoDB`) que un mismo terapeuta/especialista jamás pueda tener dos citas superpuestas en el mismo bloque temporal.

2. **Integridad Referencial:**
   - La eliminación de un servicio o especialista activo está restringida (`ON DELETE RESTRICT`) si existen citas asociadas en `bookings`.
   - La eliminación de un profesional elimina en cascada sus horarios de trabajo (`ON DELETE CASCADE`).

3. **Optimización de Índices:**
   - Búsqueda de reservas por código de voucher (`idx_bookings_code`).
   - Consultas de agenda por fecha (`idx_bookings_date`) y cliente (`idx_bookings_email`).
