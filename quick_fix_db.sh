#!/bin/bash
# Quick fix for MySQL password

echo "Fixing MySQL password..."

# Try to connect and reset password
mysql -u root <<EOF 2>/dev/null
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
EOF

if [ $? -eq 0 ]; then
    echo "✓ Password reset successful"
    echo "Testing connection..."
    mysql -u root -padmin123 -e "SELECT 1;" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ Connection test successful!"
    else
        echo "✗ Connection test failed. You may need to run the full fix script."
    fi
else
    echo "✗ Could not reset password. You may need to use safe mode method."
    echo "Run: sudo mysql"
    echo "Then: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';"
fi


