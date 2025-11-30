# How to Start the Application

Follow these steps to start both the backend and frontend servers.

## Prerequisites Check

✅ **Database is already set up and working!**
- MySQL is running
- Database `walk_addis` exists with all tables
- Password is configured correctly

---

## Step 1: Start the Backend (PHP Server)

Open a **new terminal window** (Terminal 1) and run:

```bash
cd /home/kiab/new/backend
php -S localhost:8000
```

**Expected output:**
```
PHP 7.x.x Development Server (http://localhost:8000) started
```

**Keep this terminal open!** The backend server must keep running.

**To test the backend is working:**
Open another terminal and run:
```bash
curl http://localhost:8000/api/categories.php
```

You should see JSON data with categories.

---

## Step 2: Start the Frontend (React/Vite Server)

Open a **second terminal window** (Terminal 2) and run:

```bash
cd /home/kiab/new/frontend

# First, make sure dependencies are installed (if not already done)
npm install

# Then start the development server
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Keep this terminal open too!** The frontend server must keep running.

---

## Step 3: Open the Application

Open your web browser and go to:

**http://localhost:5173**

You should see the Walk Addis application!

---

## Quick Start (All in One)

If you want to start both servers quickly, you can use these commands in separate terminals:

### Terminal 1 (Backend):
```bash
cd /home/kiab/new/backend && php -S localhost:8000
```

### Terminal 2 (Frontend):
```bash
cd /home/kiab/new/frontend && npm run dev
```

---

## Troubleshooting

### Backend Issues

**Problem:** `php: command not found`
- **Solution:** Install PHP:
  ```bash
  sudo apt update
  sudo apt install php php-mysql
  ```

**Problem:** Port 8000 already in use
- **Solution:** Use a different port:
  ```bash
  php -S localhost:8001
  ```
  Then update `frontend/src/services/api.js` to use port 8001

**Problem:** Database connection error
- **Solution:** Verify MySQL is running:
  ```bash
  sudo systemctl status mysql
  ```

### Frontend Issues

**Problem:** `npm: command not found`
- **Solution:** Install Node.js and npm:
  ```bash
  sudo apt update
  sudo apt install nodejs npm
  ```

**Problem:** `npm install` fails
- **Solution:** Clear cache and try again:
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

**Problem:** Port 5173 already in use
- **Solution:** Vite will automatically use the next available port, or you can specify:
  ```bash
  npm run dev -- --port 5174
  ```

**Problem:** Frontend can't connect to backend
- **Solution:** 
  1. Make sure backend is running on port 8000
  2. Check `frontend/src/services/api.js` has correct URL: `http://localhost:8000/api`
  3. Test backend directly: `curl http://localhost:8000/api/categories.php`

---

## Stopping the Servers

To stop the servers:
1. Go to each terminal window
2. Press `Ctrl + C` to stop the server
3. Repeat for both terminals

---

## Summary

✅ **Backend:** Running on `http://localhost:8000`
✅ **Frontend:** Running on `http://localhost:5173`
✅ **Database:** MySQL with `walk_addis` database

**Access the app at:** http://localhost:5173

---

## Admin Login

Default admin credentials:
- **Email:** admin@walkaddis.com
- **Password:** admin123

(You may need to create this admin user first if it doesn't exist)


