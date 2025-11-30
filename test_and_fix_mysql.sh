#!/bin/bash

echo "Checking MySQL status..."
sudo systemctl status mysql | head -5

echo ""
echo "Testing connection with sudo mysql..."
sudo mysql -e "SELECT 'Connection works!' as status;" 2>&1

echo ""
echo "If that worked, let's reset the password properly..."
echo "Run this command:"
echo "sudo mysql -e \"ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123'; FLUSH PRIVILEGES;\""
echo ""
echo "Then test:"
echo "mysql -u root -padmin123 -e 'SELECT 1;'"


