#!/bin/bash
# Script to reset MySQL root password
# This will set a new password for MySQL root user

echo "=========================================="
echo "MySQL Root Password Reset Script"
echo "=========================================="
echo ""
echo "This script will help you reset your MySQL root password."
echo "You'll need to enter your system sudo password."
echo ""
read -p "Press Enter to continue..."

# Stop MySQL service
echo "Stopping MySQL service..."
sudo systemctl stop mysql

# Start MySQL in safe mode (skip grant tables)
echo "Starting MySQL in safe mode..."
sudo mysqld_safe --skip-grant-tables --skip-networking &

# Wait a moment for MySQL to start
sleep 3

# Reset the password
echo "Resetting MySQL root password..."
echo "Enter the NEW password you want to use for MySQL root:"
read -s NEW_PASSWORD

# Connect and reset password
sudo mysql <<EOF
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$NEW_PASSWORD';
FLUSH PRIVILEGES;
EXIT;
EOF

# Stop the safe mode MySQL
echo "Stopping MySQL safe mode..."
sudo pkill mysqld

# Wait a moment
sleep 2

# Start MySQL normally
echo "Starting MySQL normally..."
sudo systemctl start mysql

echo ""
echo "=========================================="
echo "Password reset complete!"
echo "=========================================="
echo "Your new MySQL root password is: $NEW_PASSWORD"
echo ""
echo "Now update backend/config.php with this password:"
echo "  define('DB_PASS', '$NEW_PASSWORD');"
echo ""

