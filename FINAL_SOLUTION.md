# Final Solution - Get Walk Addis Working

## Step 1: Access MySQL and Set Password

Run this command (it should work without asking for MySQL password on Ubuntu/Debian):

```bash
sudo mysql
```

Once you're in MySQL (you'll see `mysql>` prompt), run these commands:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
```

## Step 2: Test the Password

```bash
mysql -u root -padmin123 -e "SELECT 1;"
```

If this works (no error), proceed to Step 3.

## Step 3: Verify Database Exists

```bash
mysql -u root -padmin123 -e "USE walk_addis; SHOW TABLES;"
```

You should see tables like: categories, events, admins, etc.

## Step 4: Update Config File

The file `backend/config.php` should have:
```php
define('DB_USER', 'root');
define('DB_PASS', 'admin123');
```

## Step 5: Restart PHP Server

1. Stop your current PHP server (press Ctrl+C in that terminal)
2. Start it again:
```bash
cd /home/kiab/new/backend
php -S localhost:8000
```

## Step 6: Test API

Open a new terminal and test:
```bash
curl http://localhost:8000/api/categories.php
```

You should see JSON with categories.

## Step 7: Refresh Browser

Go to http://localhost:5173 and refresh - events should load!

---

## If `sudo mysql` doesn't work:

Try this alternative - it will create a new user:

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

Then restart PHP server and test again.

