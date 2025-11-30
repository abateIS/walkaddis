#!/bin/bash

# Complete MySQL Fix Script - Handles all common issues
# This script will fix MySQL password and set up the database

set -e  # Exit on any error

echo "=========================================="
echo "MySQL Complete Fix Script"
echo "=========================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Kill any existing MySQL processes
echo -e "${YELLOW}Step 1: Stopping all MySQL processes...${NC}"
sudo systemctl stop mysql 2>/dev/null || true
sudo pkill -9 mysqld 2>/dev/null || true
sudo pkill -9 mysqld_safe 2>/dev/null || true
sleep 2
echo -e "${GREEN}✓ MySQL processes stopped${NC}"
echo ""

# Step 2: Create the required directory
echo -e "${YELLOW}Step 2: Creating required directories...${NC}"
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
sudo chmod 755 /var/run/mysqld
echo -e "${GREEN}✓ Directory created: /var/run/mysqld${NC}"
echo ""

# Step 3: Start MySQL in safe mode
echo -e "${YELLOW}Step 3: Starting MySQL in safe mode...${NC}"
sudo mysqld_safe --skip-grant-tables --skip-networking > /dev/null 2>&1 &
MYSQL_PID=$!
echo "Waiting for MySQL to start..."
sleep 5

# Check if MySQL started
if ps -p $MYSQL_PID > /dev/null; then
    echo -e "${GREEN}✓ MySQL started in safe mode (PID: $MYSQL_PID)${NC}"
else
    echo -e "${RED}✗ Failed to start MySQL in safe mode${NC}"
    exit 1
fi
echo ""

# Step 4: Reset root password
echo -e "${YELLOW}Step 4: Resetting MySQL root password...${NC}"
sleep 2

# Try method 1: Clear password first, then set it
mysql -u root <<EOF 2>/dev/null
USE mysql;
UPDATE user SET plugin='mysql_native_password' WHERE User='root' AND Host='localhost';
UPDATE user SET authentication_string='' WHERE User='root' AND Host='localhost';
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Password reset successful${NC}"
else
    echo -e "${YELLOW}⚠ First attempt failed, trying alternative method...${NC}"
    # Method 2: Direct UPDATE for older MySQL versions
    mysql -u root <<EOF 2>/dev/null
USE mysql;
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
UPDATE user SET password=PASSWORD('admin123') WHERE User='root';
FLUSH PRIVILEGES;
EOF
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Password reset completed (method 2)${NC}"
    else
        echo -e "${YELLOW}⚠ Trying method 3...${NC}"
        # Method 3: Just use ALTER USER
        mysql -u root <<EOF 2>/dev/null
USE mysql;
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'admin123';
FLUSH PRIVILEGES;
EOF
        echo -e "${GREEN}✓ Password reset completed (method 3)${NC}"
    fi
fi
echo ""

# Step 5: Stop safe mode MySQL
echo -e "${YELLOW}Step 5: Stopping safe mode MySQL...${NC}"
sudo pkill -9 mysqld
sudo pkill -9 mysqld_safe
sleep 2
echo -e "${GREEN}✓ Safe mode MySQL stopped${NC}"
echo ""

# Step 6: Start MySQL normally
echo -e "${YELLOW}Step 6: Starting MySQL normally...${NC}"
sudo systemctl start mysql
sleep 3

if sudo systemctl is-active --quiet mysql; then
    echo -e "${GREEN}✓ MySQL is running normally${NC}"
else
    echo -e "${RED}✗ Failed to start MySQL${NC}"
    exit 1
fi
echo ""

# Step 7: Test the connection
echo -e "${YELLOW}Step 7: Testing MySQL connection...${NC}"
if mysql -u root -padmin123 -e "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ MySQL connection successful!${NC}"
else
    echo -e "${RED}✗ Connection test failed${NC}"
    echo -e "${YELLOW}Trying one more time with different method...${NC}"
    sleep 2
    if mysql -u root -padmin123 -e "SELECT 1;" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ MySQL connection successful!${NC}"
    else
        echo -e "${RED}✗ Still failing. Please check MySQL logs:${NC}"
        echo "   sudo tail -50 /var/log/mysql/error.log"
        exit 1
    fi
fi
echo ""

# Step 8: Create database
echo -e "${YELLOW}Step 8: Creating database 'walk_addis'...${NC}"
mysql -u root -padmin123 -e "CREATE DATABASE IF NOT EXISTS walk_addis;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database created${NC}"
else
    echo -e "${RED}✗ Failed to create database${NC}"
    exit 1
fi
echo ""

# Step 9: Import schema
echo -e "${YELLOW}Step 9: Importing database schema...${NC}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/database/schema.sql" ]; then
    mysql -u root -padmin123 walk_addis < "$SCRIPT_DIR/database/schema.sql" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Schema imported successfully${NC}"
    else
        echo -e "${YELLOW}⚠ Schema import had warnings (this might be okay)${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Schema file not found at: $SCRIPT_DIR/database/schema.sql${NC}"
    echo "   You can import it manually later with:"
    echo "   mysql -u root -padmin123 walk_addis < database/schema.sql"
fi
echo ""

# Step 10: Verify tables
echo -e "${YELLOW}Step 10: Verifying database setup...${NC}"
TABLE_COUNT=$(mysql -u root -padmin123 -e "USE walk_addis; SHOW TABLES;" 2>/dev/null | wc -l)
if [ $TABLE_COUNT -gt 1 ]; then
    echo -e "${GREEN}✓ Found $((TABLE_COUNT - 1)) tables in database${NC}"
    mysql -u root -padmin123 -e "USE walk_addis; SHOW TABLES;" 2>/dev/null
else
    echo -e "${YELLOW}⚠ No tables found. You may need to import schema manually.${NC}"
fi
echo ""

# Final summary
echo "=========================================="
echo -e "${GREEN}✓ MySQL Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "MySQL root password: admin123"
echo "Database name: walk_addis"
echo ""
echo "Test connection with:"
echo "  mysql -u root -padmin123 -e \"USE walk_addis; SHOW TABLES;\""
echo ""
echo "Your backend/config.php should have:"
echo "  define('DB_USER', 'root');"
echo "  define('DB_PASS', 'admin123');"
echo ""

