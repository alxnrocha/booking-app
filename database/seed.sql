-- ==========================================================
-- Aura Booking — Seed Data (MySQL 8.4 LTS)
-- ==========================================================

-- Services Seed
INSERT INTO services (id, name, category, duration_minutes, price, description, image_url, badge, is_active) VALUES
('srv-massage-01', 'Massage Therapy', 'massage', 60, 120.00, 'Relaxing & therapeutic massage with organic aromatic oils to ease tension and restore balance.', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80', 'Popular', TRUE),
('srv-hair-01', 'Hair Styling & Cut', 'hair', 45, 85.00, 'Precision cut, bespoke style & premium blowout with botanical hair revitalizing treatments.', 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80', NULL, TRUE),
('srv-facial-01', 'Facial Spa Deep Cleansing', 'facial', 60, 110.00, 'Deep pore cleansing, ultrasonic hydration, and antioxidant facial massage for glowing skin.', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', 'Signature', TRUE),
('srv-wellness-01', 'Aromatherapy Body Wrap', 'wellness', 75, 145.00, 'Detoxifying volcanic mud wrap paired with lavender and eucalyptus warm steam immersion.', 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80', NULL, TRUE),
('srv-wellness-02', 'VIP Deluxe Head-to-Toe Retreat', 'wellness', 120, 220.00, 'Full body signature massage, gold mask facial and custom botanical scalp therapy.', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', 'VIP Exclusive', TRUE),
('srv-facial-02', 'Cryo-Glow Lift & Tone', 'facial', 50, 95.00, 'Cold therapy stimulation to boost collagen production, refine pores and reduce inflammation.', 'https://images.unsplash.com/photo-1512290900672-1f4a9b6c005e?auto=format&fit=crop&w=800&q=80', NULL, TRUE);

-- Professionals Seed
INSERT INTO professionals (id, name, title, specialty, avatar_url, rating, reviews_count, bio, is_active) VALUES
('spec-01', 'Isabella Moretti', 'Senior Wellness Therapist', 'Holistic Massage & Cryo Spa', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 4.90, 128, 'Over 9 years of luxury resort experience in Milan and Zurich specializing in deep restorative touch.', TRUE),
('spec-02', 'Matteo Rossi', 'Master Hair Stylist & Director', 'Precision Cuts & Color Couture', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 4.95, 210, 'Former editorial stylist for Milan Fashion Week, expert in custom textures and effortless elegance.', TRUE),
('spec-03', 'Sofia Laurent', 'Advanced Esthetician', 'Dermatological Facials & Glow Lift', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', 4.88, 94, 'Certified master in French lymphatic drainage and advanced non-invasive skin regeneration.', TRUE),
('spec-04', 'Elena Vance', 'Holistic Body Specialist', 'Aromatherapy & Stress Relief', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 4.92, 115, 'Dedicated to mind-body equilibrium utilizing ancient herbal botanical infusions and pressure therapy.', TRUE);

-- Working Hours Seed (Isabella Mon-Sat, 09:00 - 21:00)
INSERT INTO working_hours (id, professional_id, day_of_week, start_time, end_time, is_active) VALUES
('wh-01-1', 'spec-01', 1, '09:00:00', '21:00:00', TRUE),
('wh-01-2', 'spec-01', 2, '09:00:00', '21:00:00', TRUE),
('wh-01-3', 'spec-01', 3, '09:00:00', '21:00:00', TRUE),
('wh-01-4', 'spec-01', 4, '09:00:00', '21:00:00', TRUE),
('wh-01-5', 'spec-01', 5, '09:00:00', '21:00:00', TRUE),
('wh-01-6', 'spec-01', 6, '09:00:00', '21:00:00', TRUE);

-- Sample Bookings Seed
INSERT INTO bookings (
    id, booking_code, customer_name, customer_email, customer_phone, special_requests,
    marketing_consent, service_id, professional_id, booking_date, start_time, end_time,
    service_price, service_fee, vat_amount, promo_discount, total_amount,
    payment_preference, payment_status, payment_method, status, qr_payload
) VALUES (
    'book-sample-01', '#AUR-9482', 'Emma Johnson', 'emma.johnson@email.com', '+39 312 345 6789',
    'I have sensitive skin, please use gentle products. Thank you!', TRUE,
    'srv-massage-01', 'spec-01', '2025-05-15', '12:00:00', '13:00:00',
    120.00, 10.00, 28.60, 25.00, 133.60,
    'pay_now', 'paid', 'Mastercard **** 4242', 'confirmed',
    'AURA-RESERVATION:AUR-9482:EMMA_JOHNSON:2025-05-15:12:00'
);
