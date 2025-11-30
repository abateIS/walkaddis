#!/bin/bash
# Proper MySQL password reset script

echo "=========================================="
echo "MySQL Password Reset - Proper Method"
echo "=========================================="
echo ""

# Stop MySQL
echo "1. Stopping MySQL..."
sudo systemctl stop mysql
sleep 2

# Create socket directory
echo "2. Creating socket directory..."
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld

# Start MySQL in safe mode
echo "3. Starting MySQL in safe mode..."
sudo mysqld_safe --skip-grant-tables --skip-networking > /dev/null 2>&1 &
sleep 8

# Connect and reset password
echo "4. Resetting password to 'admin123'..."
mysql -u root <<EOF
USE mysql;
-- For MySQL 5.7+
UPDATE user SET authentication_string='' WHERE User='root';
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'admin123';
FLUSH PRIVILEGES;
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

# Test connection
echo "7. Testing connection..."
mysql -u root -padmin123 -e "SELECT 1;" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ SUCCESS! Password is now: admin123"
    echo ""
    echo "The config.php is already set up with this password."
else
    echo ""
    echo "✗ Still having issues. Let's try creating a new user instead..."
    echo ""
    echo "Run: sudo mysql (without password)"
    echo "Then create a new user with these SQL commands:"
    echo "  CREATE USER 'walkaddis'@'localhost' IDENTIFIED BY 'admin123';"
    echo "  GRANT ALL PRIVILEGES ON walk_addis.* TO 'walkaddis'@'localhost';"
    echo "  FLUSH PRIVILEGES;"
    echo "  EXIT;"
fi

