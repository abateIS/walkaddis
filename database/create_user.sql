-- Create a dedicated MySQL user for Walk Addis application
-- This allows you to use a simple password for the app

-- Option 1: Create user with password 'walkaddis123' (change this to your preferred password)
CREATE USER IF NOT EXISTS 'walkaddis'@'localhost' IDENTIFIED BY 'walkaddis123';

-- Grant all privileges on walk_addis database
GRANT ALL PRIVILEGES ON walk_addis.* TO 'walkaddis'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;

-- Verify the user was created
SELECT User, Host FROM mysql.user WHERE User = 'walkaddis';

