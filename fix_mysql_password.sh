#!/bin/bash
# More reliable MySQL password reset script

echo "=========================================="
echo "MySQL Password Reset - Method 2"
echo "=========================================="
echo ""

# Step 1: Stop MySQL
echo "Step 1: Stopping MySQL..."
sudo systemctl stop mysql
sleep 2

# Step 2: Start MySQL in safe mode without networking
echo "Step 2: Starting MySQL in safe mode..."
sudo mysqld_safe --skip-grant-tables --skip-networking > /dev/null 2>&1 &
sleep 5

# Step 3: Create the socket directory if it doesn't exist
echo "Step 3: Ensuring MySQL socket directory exists..."
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld

# Step 4: Try to connect and reset password
echo "Step 4: Resetting password..."
echo "Enter the password you want to use (default: admin123):"
read -s NEW_PASS
NEW_PASS=${NEW_PASS:-admin123}

# Kill any existing mysqld processes
sudo pkill mysqld
sleep 2

# Start MySQL in safe mode again
sudo mysqld_safe --skip-grant-tables --skip-networking > /dev/null 2>&1 &
sleep 5

# Now try to connect and reset
sudo mysql <<MYSQL_SCRIPT
USE mysql;
UPDATE user SET authentication_string=PASSWORD('$NEW_PASS') WHERE User='root';
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
FLUSH PRIVILEGES;
EXIT;
MYSQL_SCRIPT

# Stop safe mode
echo "Step 5: Stopping safe mode MySQL..."
sudo pkill mysqld
sleep 3

# Start MySQL normally
echo "Step 6: Starting MySQL normally..."
sudo systemctl start mysql
sleep 3

# Test the connection
echo ""
echo "Step 7: Testing connection..."
mysql -u root -p$NEW_PASS -e "SELECT 1;" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ SUCCESS! Password has been reset to: $NEW_PASS"
    echo ""
    echo "Update backend/config.php with:"
    echo "  define('DB_PASS', '$NEW_PASS');"
else
    echo ""
    echo "✗ Password reset may have failed. Trying alternative method..."
    echo ""
    echo "Please run this command manually:"
    echo "  sudo mysql"
    echo ""
    echo "Then in MySQL, run:"
    echo "  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';"
    echo "  FLUSH PRIVILEGES;"
    echo "  EXIT;"
fi

