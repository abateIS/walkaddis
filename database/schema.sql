-- Walk Addis Database Schema

CREATE DATABASE IF NOT EXISTS walk_addis;
USE walk_addis;

-- Categories table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
    venue VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    event_date DATETIME NOT NULL,
    image_url VARCHAR(500),
    ticket_price DECIMAL(10, 2) DEFAULT 0.00,
    ticket_url VARCHAR(500),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    organizer_name VARCHAR(255) NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'cancelled', 'completed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_event_date (event_date),
    INDEX idx_status (status)
);

-- Admin users table
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event organizer contact submissions
CREATE TABLE organizer_contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organizer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    organization VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('pending', 'contacted', 'approved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Music', 'music', 'Concerts, live performances, and music festivals'),
('Arts', 'arts', 'Art exhibitions, galleries, and cultural events'),
('Sports', 'sports', 'Sports events, tournaments, and competitions'),
('Food & Drink', 'food-drink', 'Food festivals, tastings, and culinary events'),
('Technology', 'technology', 'Tech meetups, conferences, and workshops'),
('Business', 'business', 'Networking events, conferences, and seminars'),
('Entertainment', 'entertainment', 'Comedy shows, theater, and entertainment events'),
('Community', 'community', 'Community gatherings and social events');

-- Insert default admin (password: admin123)
-- Note: You may need to generate a new password hash using PHP's password_hash() function
-- For now, you can create the admin manually or use: php -r "echo password_hash('admin123', PASSWORD_DEFAULT);"
INSERT INTO admins (username, email, password_hash) VALUES
('admin', 'admin@walkaddis.com', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

