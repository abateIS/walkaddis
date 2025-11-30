# Step-by-Step Guide to Fix Database Issues

This guide will help you fix MySQL database connection issues for the Walk Addis application.

## Prerequisites Check

First, let's verify what's installed:

```bash
# Check if MySQL is installed
mysql --version

# Check if MySQL service is running
sudo systemctl status mysql
```

If MySQL is not installed, install it:
```bash
sudo apt update
sudo apt install mysql-server
```

---

## Step 1: Check MySQL Service Status

```bash
# Check if MySQL is running
sudo systemctl status mysql
```

**If MySQL is NOT running:**
```bash
# Start MySQL service
sudo systemctl start mysql

# Enable MySQL to start on boot
sudo systemctl enable mysql
```

**Expected output:** You should see "active (running)" in green.

---

## Step 2: Fix MySQL Root Password

### Option A: Using sudo mysql (Recommended - Works on Ubuntu/Debian)

This is the easiest method and works on most Ubuntu/Debian systems:

```bash
# Access MySQL without password
sudo mysql
```

Once you're in MySQL (you'll see `mysql>` prompt), run these commands:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
```

**Expected result:** You should see "Query OK" messages.

### Option B: If Option A doesn't work (Safe Mode Method)

If `sudo mysql` asks for a password or doesn't work, follow these steps:

1. **Stop MySQL service:**
   ```bash
   sudo systemctl stop mysql
   ```

2. **Start MySQL in safe mode:**
   ```bash
   sudo mysqld_safe --skip-grant-tables --skip-networking &
   ```

3. **Wait 5 seconds, then connect:**
   ```bash
   mysql -u root
   ```

4. **In MySQL, run these commands:**
   ```sql
   USE mysql;
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. **Stop the safe mode MySQL:**
   ```bash
   sudo pkill mysqld
   ```

6. **Start MySQL normally:**
   ```bash
   sudo systemctl start mysql
   ```

---

## Step 3: Verify MySQL Root Password Works

Test if you can connect with the new password:

```bash
mysql -u root -padmin123 -e "SELECT 1;"
```

**Expected output:** You should see a table with "1" in it, or no error message.

**If you get an error:**
- Go back to Step 2 and try Option B
- Or check if MySQL service is running: `sudo systemctl status mysql`

---

## Step 4: Create the Database

Connect to MySQL and create the `walk_addis` database:

```bash
mysql -u root -padmin123
```

Once in MySQL, run:

```sql
CREATE DATABASE IF NOT EXISTS walk_addis;
SHOW DATABASES;
EXIT;
```

**Expected output:** You should see `walk_addis` in the list of databases.

**Alternative (one-line command):**
```bash
mysql -u root -padmin123 -e "CREATE DATABASE IF NOT EXISTS walk_addis;"
```

---

## Step 5: Import Database Schema

Import the database schema to create all necessary tables:

```bash
# Make sure you're in the project root directory
cd /home/kiab/new

# Import the schema
mysql -u root -padmin123 walk_addis < database/schema.sql
```

**Expected output:** No error messages. The command should complete silently.

**Verify tables were created:**
```bash
mysql -u root -padmin123 -e "USE walk_addis; SHOW TABLES;"
```

**Expected output:** You should see tables like:
- `categories`
- `events`
- `admins`
- `organizer_contacts`

---

## Step 6: Verify Database Configuration

Check that your `backend/config.php` file has the correct settings:

```bash
cat backend/config.php | grep -A 4 "DB_"
```

**Expected values:**
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'walk_addis');
define('DB_USER', 'root');
define('DB_PASS', 'admin123');
```

**If these values are different**, update them:
```bash
nano backend/config.php
```

Or use your preferred text editor to update the values.

---

## Step 7: Test Database Connection

Test if your PHP application can connect to the database:

```bash
# If you have a test script
php backend/test_db.php
```

**Or create a simple test:**

```bash
cat > /tmp/test_db.php << 'EOF'
<?php
try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=walk_addis;charset=utf8mb4",
        "root",
        "admin123"
    );
    echo "✓ Database connection successful!\n";
    echo "✓ Database 'walk_addis' is accessible\n";
    
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "✓ Found " . count($tables) . " tables in database\n";
} catch (PDOException $e) {
    echo "✗ Database connection failed: " . $e->getMessage() . "\n";
}
EOF

php /tmp/test_db.php
```

**Expected output:**
```
✓ Database connection successful!
✓ Database 'walk_addis' is accessible
✓ Found 4 tables in database
```

---

## Step 8: Alternative - Create a Dedicated Database User (Optional)

If you prefer not to use root, create a dedicated user:

```bash
mysql -u root -padmin123
```

Then in MySQL:

```sql
CREATE USER 'walkaddis'@'localhost' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON walk_addis.* TO 'walkaddis'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

**Then update `backend/config.php`:**
```php
define('DB_USER', 'walkaddis');
define('DB_PASS', 'admin123');
```

**Test the new user:**
```bash
mysql -u walkaddis -padmin123 -e "USE walk_addis; SELECT COUNT(*) FROM categories;"
```

---

## Troubleshooting

### Problem: "Access denied for user 'root'@'localhost'"

**Solution:** Go back to Step 2 and reset the password using Option B.

### Problem: "Can't connect to MySQL server"

**Solution:**
```bash
# Check if MySQL is running
sudo systemctl status mysql

# If not running, start it
sudo systemctl start mysql
```

### Problem: "Unknown database 'walk_addis'"

**Solution:** Go back to Step 4 and create the database.

### Problem: "Table doesn't exist"

**Solution:** Go back to Step 5 and import the schema again.

### Problem: PHP can't connect but MySQL command works

**Solution:**
1. Check if PHP MySQL extension is installed:
   ```bash
   php -m | grep pdo_mysql
   ```
2. If not installed:
   ```bash
   sudo apt install php-mysql
   ```

### Problem: "mysql_native_password" plugin error

**Solution:** This means you need to use the authentication plugin. Make sure you ran:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
```

---

## Quick Verification Checklist

After completing all steps, verify:

- [ ] MySQL service is running: `sudo systemctl status mysql`
- [ ] Can connect with password: `mysql -u root -padmin123 -e "SELECT 1;"`
- [ ] Database exists: `mysql -u root -padmin123 -e "SHOW DATABASES;" | grep walk_addis`
- [ ] Tables exist: `mysql -u root -padmin123 -e "USE walk_addis; SHOW TABLES;"`
- [ ] Config file has correct values: `cat backend/config.php | grep DB_`
- [ ] PHP can connect: `php /tmp/test_db.php` (or your test script)

---

## Summary

Once all steps are complete, your database should be:
- ✅ MySQL running and accessible
- ✅ Root password set to `admin123`
- ✅ Database `walk_addis` created
- ✅ All tables imported from schema
- ✅ PHP configuration matches database credentials

Your application should now be able to connect to the database successfully!


