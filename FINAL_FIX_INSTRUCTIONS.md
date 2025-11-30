# FINAL FIX - Run This Script

I've created a complete fix script that handles ALL the issues you encountered.

## Quick Fix (Run This Now)

```bash
cd /home/kiab/new
./fix_mysql_complete.sh
```

This script will:
1. ✅ Fix the directory issue (`/var/run/mysqld`)
2. ✅ Stop all MySQL processes properly
3. ✅ Start MySQL in safe mode correctly
4. ✅ Reset root password to `admin123`
5. ✅ Restart MySQL normally
6. ✅ Create the `walk_addis` database
7. ✅ Import the schema
8. ✅ Verify everything works

**Just run the script and wait for it to complete!**

---

## If the Script Doesn't Work - Manual Fix

If for some reason the script fails, here's the exact manual fix:

### Step 1: Stop Everything and Create Directory

```bash
sudo systemctl stop mysql
sudo pkill -9 mysqld
sudo pkill -9 mysqld_safe
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
sudo chmod 755 /var/run/mysqld
```

### Step 2: Start MySQL in Safe Mode

```bash
sudo mysqld_safe --skip-grant-tables --skip-networking > /dev/null 2>&1 &
```

Wait 5 seconds, then:

### Step 3: Reset Password

```bash
mysql -u root <<EOF
USE mysql;
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
UPDATE user SET authentication_string=PASSWORD('admin123') WHERE User='root';
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
EOF
```

### Step 4: Stop Safe Mode and Start Normal

```bash
sudo pkill -9 mysqld
sudo systemctl start mysql
```

### Step 5: Test and Setup Database

```bash
# Test connection
mysql -u root -padmin123 -e "SELECT 1;"

# Create database
mysql -u root -padmin123 -e "CREATE DATABASE IF NOT EXISTS walk_addis;"

# Import schema
mysql -u root -padmin123 walk_addis < database/schema.sql

# Verify
mysql -u root -padmin123 -e "USE walk_addis; SHOW TABLES;"
```

---

## That's It!

After running the script (or manual steps), your database will be ready to use.


