# Fix Database Connection - Quick Steps

## The Problem
MySQL password is incorrect, so the backend can't connect to the database.

## Solution - Run These Commands

Open a **new terminal** and run these commands one by one:

### Step 1: Try to access MySQL with sudo (usually works without password)
```bash
sudo mysql
```

If that works, you'll see `mysql>` prompt. Then run:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
```

### Step 2: If Step 1 doesn't work (asks for password)

Run these commands:

```bash
# Stop MySQL
sudo systemctl stop mysql

# Start MySQL in safe mode
sudo mysqld_safe --skip-grant-tables --skip-networking &

# Wait 3 seconds
sleep 3

# Connect without password
mysql -u root
```

Then in MySQL, run:
```sql
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
```

Then:
```bash
# Stop safe mode
sudo pkill mysqld

# Start MySQL normally
sudo systemctl start mysql
```

### Step 3: Test the connection
```bash
mysql -u root -padmin123 -e "SELECT 1;"
```

If you see output (even a warning), it worked!

### Step 4: Verify database exists
```bash
mysql -u root -padmin123 -e "USE walk_addis; SHOW TABLES;"
```

You should see tables like: categories, events, admins, etc.

---

## After Fixing

1. **Restart your backend server:**
   - Go to the terminal running `php -S localhost:8000`
   - Press `Ctrl + C` to stop it
   - Run again: `cd /home/kiab/new/backend && php -S localhost:8000`

2. **Refresh your browser** at http://localhost:5173

3. **Events should now load!**

---

## Quick One-Liner (if sudo mysql works)

```bash
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123'; FLUSH PRIVILEGES;"
```

Then test:
```bash
mysql -u root -padmin123 -e "SELECT 1;"
```


