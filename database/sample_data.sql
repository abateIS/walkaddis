-- Sample Events Data for Walk Addis
-- Run this after importing schema.sql to add some example events

USE walk_addis;

-- Sample Music Events
INSERT INTO events (title, description, category_id, venue, address, event_date, ticket_price, organizer_name, is_featured) VALUES
('Jazz Night at Alliance', 'Experience an evening of smooth jazz performances by local and international artists at the historic Alliance Ethio-Française.', 1, 'Alliance Ethio-Française', 'Addis Ababa, Ethiopia', '2024-02-15 19:00:00', 500.00, 'Addis Jazz Society', TRUE),
('Ethiopian Music Festival', 'A celebration of traditional and modern Ethiopian music featuring top artists from across the country.', 1, 'Millennium Hall', 'Addis Ababa, Ethiopia', '2024-02-20 18:00:00', 800.00, 'Ethiopian Music Association', TRUE);

-- Sample Arts Events
INSERT INTO events (title, description, category_id, venue, address, event_date, ticket_price, organizer_name) VALUES
('Contemporary Art Exhibition', 'Explore the works of emerging Ethiopian contemporary artists in this curated exhibition.', 2, 'Asni Gallery', 'Addis Ababa, Ethiopia', '2024-02-10 10:00:00', 0.00, 'Asni Gallery'),
('Photography Workshop', 'Learn professional photography techniques from award-winning photographers.', 2, 'Modern Art Studio', 'Addis Ababa, Ethiopia', '2024-02-12 14:00:00', 1200.00, 'Addis Photography Club');

-- Sample Sports Events
INSERT INTO events (title, description, category_id, venue, address, event_date, ticket_price, organizer_name) VALUES
('Addis Ababa Marathon', 'Join thousands of runners in the annual Addis Ababa Marathon through the city streets.', 3, 'Meskel Square', 'Addis Ababa, Ethiopia', '2024-02-25 06:00:00', 500.00, 'Addis Running Club'),
('Basketball Tournament', 'Watch exciting basketball matches featuring top teams from Addis Ababa.', 3, 'Addis Ababa Stadium', 'Addis Ababa, Ethiopia', '2024-02-18 16:00:00', 200.00, 'Ethiopian Basketball Federation');

-- Sample Food & Drink Events
INSERT INTO events (title, description, category_id, venue, address, event_date, ticket_price, organizer_name) VALUES
('Ethiopian Coffee Festival', 'Taste the finest Ethiopian coffee varieties and learn about traditional coffee ceremonies.', 4, 'Sheraton Addis', 'Addis Ababa, Ethiopia', '2024-02-14 10:00:00', 300.00, 'Ethiopian Coffee Association'),
('Food Truck Festival', 'Enjoy diverse cuisines from food trucks across the city in this weekend festival.', 4, 'Bole Road', 'Addis Ababa, Ethiopia', '2024-02-17 12:00:00', 0.00, 'Addis Food Network');

-- Sample Technology Events
INSERT INTO events (title, description, category_id, venue, address, event_date, ticket_price, organizer_name) VALUES
('Tech Startup Meetup', 'Network with tech entrepreneurs and learn about the latest innovations in the Ethiopian tech scene.', 5, 'iCog Labs', 'Addis Ababa, Ethiopia', '2024-02-11 18:00:00', 0.00, 'Addis Tech Hub'),
('AI & Machine Learning Workshop', 'Hands-on workshop on artificial intelligence and machine learning applications.', 5, 'Addis Ababa University', 'Addis Ababa, Ethiopia', '2024-02-16 09:00:00', 1500.00, 'Tech Ethiopia');

