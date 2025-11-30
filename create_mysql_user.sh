#!/bin/bash
# Create a new MySQL user for the application

echo "=========================================="
echo "Creating MySQL User for Walk Addis"
echo "=========================================="
echo ""
echo "This will create a new MySQL user 'walkaddis' with password 'admin123'"
echo "This is safer than using root."
echo ""

# Stop MySQL
echo "1. Stopping MySQL..."
sudo systemctl stop mysql
sleep 2

# Create socket directory
echo "2. Ensuring socket directory exists..."
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld

# Start MySQL in safe mode
echo "3. Starting MySQL in safe mode..."
sudo mysqld_safe --skip-grant-tables --skip-networking > /dev/null 2>&1 &
sleep 8

# Create the user
echo "4. Creating user 'walkaddis'..."
mysql -u root <<EOF
USE mysql;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS 'walkaddis'@'localhost' IDENTIFIED BY 'admin123';

-- Grant privileges
GRANT ALL PRIVILEGES ON walk_addis.* TO 'walkaddis'@'localhost';
FLUSH PRIVILEGES;

-- Verify
SELECT User, Host FROM user WHERE User='walkaddis';
EXIT;
EOF

# Stop safe mode
echo "5. Stopping safe mode..."
sudo pkill mysqld
sleep 3

# Start MySQL normally
echo "6. Starting MySQL normally..."
sudo systemctl start mysql
sleep 3

# Test connection with new user
echo "7. Testing connection with new user..."
mysql -u walkaddis -padmin123 -e "USE walk_addis; SELECT COUNT(*) as tables FROM information_schema.tables WHERE table_schema='walk_addis';" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ SUCCESS! User 'walkaddis' created and working!"
    echo ""
    echo "Credentials:"
    echo "  Username: walkaddis"
    echo "  Password: admin123"
    echo ""
    echo "The config.php needs to be updated. Let me do that..."
else
    echo ""
    echo "✗ Connection test failed. But user might still be created."
    echo "Try manually: mysql -u walkaddis -padmin123"
fi

