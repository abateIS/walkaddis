# How to Fix MySQL Root Password

## Method 1: Using sudo mysql (Easiest - Works on Ubuntu/Debian)

Run these commands:

```bash
# This should work without a password on Ubuntu/Debian
sudo mysql
```

Once you're in MySQL, run:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
```

## Method 2: If Method 1 doesn't work

1. Stop MySQL:
```bash
sudo systemctl stop mysql
```

2. Start MySQL in safe mode:
```bash
sudo mysqld_safe --skip-grant-tables --skip-networking &
```

3. Wait 5 seconds, then connect:
```bash
mysql -u root
```

4. In MySQL, run:
```sql
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
```

5. Stop the safe mode MySQL:
```bash
sudo pkill mysqld
```

6. Start MySQL normally:
```bash
sudo systemctl start mysql
```

7. Test the connection:
```bash
mysql -u root -padmin123 -e "SELECT 1;"
```

## Method 3: Create a new user instead

If you can't reset root, create a new user:

```bash
sudo mysql
```

Then in MySQL:
```sql
CREATE USER 'walkaddis'@'localhost' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON walk_addis.* TO 'walkaddis'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Then update `backend/config.php`:
```php
define('DB_USER', 'walkaddis');
define('DB_PASS', 'admin123');
```

