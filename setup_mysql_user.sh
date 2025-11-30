#!/bin/bash
# Simple script to create MySQL user or reset password

echo "=========================================="
echo "MySQL Setup for Walk Addis"
echo "=========================================="
echo ""
echo "This will try to access MySQL and create a user for the app."
echo ""

# Try to access MySQL with sudo (works on Ubuntu/Debian)
echo "Attempting to access MySQL..."
sudo mysql <<EOF 2>&1
-- Check if we can access MySQL
SELECT 'MySQL access successful!' as status;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS 'walkaddis'@'localhost' IDENTIFIED BY 'walkaddis123';

-- Grant privileges
GRANT ALL PRIVILEGES ON walk_addis.* TO 'walkaddis'@'localhost';
FLUSH PRIVILEGES;

-- Also update root password to 'walkaddis123' for easier access
ALTER USER 'root'@'localhost' IDENTIFIED BY 'walkaddis123';
FLUSH PRIVILEGES;

SELECT 'Setup complete! User created and root password set to: walkaddis123' as message;
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Success! MySQL is now configured."
    echo ""
    echo "Credentials:"
    echo "  Username: walkaddis"
    echo "  Password: walkaddis123"
    echo "  (Root password also set to: walkaddis123)"
    echo ""
    echo "The config.php is already set up with these credentials!"
else
    echo ""
    echo "✗ Could not access MySQL automatically."
    echo "You may need to reset the MySQL root password manually."
    echo ""
    echo "Run: ./reset_mysql_password.sh"
fi

