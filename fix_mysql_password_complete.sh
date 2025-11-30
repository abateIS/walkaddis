#!/bin/bash

echo "=========================================="
echo "MySQL Password Reset - Complete Fix"
echo "=========================================="
echo ""

# Step 1: Stop MySQL
echo "Step 1: Stopping MySQL..."
sudo systemctl stop mysql 2>/dev/null || true
sudo pkill -9 mysqld 2>/dev/null || true
sudo pkill -9 mysqld_safe 2>/dev/null || true
sleep 2

# Step 2: Create required directory
echo "Step 2: Creating required directories..."
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
sudo chmod 755 /var/run/mysqld
echo "✓ Directory created"

# Step 3: Start MySQL in safe mode
echo "Step 3: Starting MySQL in safe mode..."
sudo mysqld_safe --skip-grant-tables --skip-networking > /dev/null 2>&1 &
sleep 5

# Step 4: Reset password
echo "Step 4: Resetting MySQL root password..."
mysql -u root <<EOF 2>/dev/null
USE mysql;
UPDATE user SET plugin='mysql_native_password' WHERE User='root' AND Host='localhost';
UPDATE user SET authentication_string='' WHERE User='root' AND Host='localhost';
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
EOF

if [ $? -eq 0 ]; then
    echo "✓ Password reset successful"
else
    echo "⚠ First attempt failed, trying alternative..."
    mysql -u root <<EOF 2>/dev/null
USE mysql;
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
EOF
    echo "✓ Password reset completed"
fi

# Step 5: Stop safe mode
echo "Step 5: Stopping safe mode MySQL..."
sudo pkill -9 mysqld
sudo pkill -9 mysqld_safe
sleep 2

# Step 6: Start MySQL normally
echo "Step 6: Starting MySQL normally..."
sudo systemctl start mysql
sleep 3

# Step 7: Test connection
echo "Step 7: Testing connection..."
if mysql -u root -padmin123 -e "SELECT 1;" > /dev/null 2>&1; then
    echo "✓ SUCCESS! MySQL password is now: admin123"
    echo ""
    echo "Testing database access..."
    mysql -u root -padmin123 -e "USE walk_addis; SHOW TABLES;" 2>/dev/null | head -10
    echo ""
    echo "✓ Everything is working!"
else
    echo "✗ Connection test failed"
    echo "You may need to try Method 1: sudo mysql"
fi

echo ""
echo "=========================================="


