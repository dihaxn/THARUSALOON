-- Insert default users for testing (password is 'password' for all)
INSERT INTO users (first_name, last_name, email, password, role, enabled, created_at, updated_at) VALUES
('Owner', 'User', 'owner@tharusalon.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'OWNER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Staff', 'Member', 'staff@tharusalon.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'STAFF', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Customer', 'User', 'customer@tharusalon.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample services
INSERT INTO services (name, description, price, duration_minutes, category, is_active, created_at, updated_at) VALUES
('Bridal Makeup', 'Full bridal makeup application with airbrush foundation', 150.00, 60, 'MAKEUP', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hair Styling', 'Complete hair styling and updo for special occasions', 120.00, 90, 'HAIR', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Makeup Trial', 'Trial run for bridal makeup to perfect the look', 100.00, 90, 'TRIAL', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hair Consultation', 'Professional hair styling consultation and advice', 50.00, 30, 'CONSULTATION', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Full Package', 'Complete hair and makeup package for wedding day', 350.00, 180, 'PACKAGE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Touch-ups', 'Quick touch-ups and fixes for makeup and hair', 75.00, 30, 'MAKEUP', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
