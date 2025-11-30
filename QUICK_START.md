# Quick Start Guide - Development Servers

## Start Both Servers

### Option 1: Two Terminal Windows (Recommended)

#### Terminal 1 - Backend (PHP Server)
```bash
cd /home/kiab/new/backend
php -S localhost:8000
```

**Expected output:**
```
PHP 7.x.x Development Server (http://localhost:8000) started
```

**Keep this terminal open!** The backend must keep running.

---

#### Terminal 2 - Frontend (React/Vite Server)
```bash
cd /home/kiab/new/frontend
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Keep this terminal open too!** The frontend must keep running.

---

### Option 2: Background Processes (Advanced)

If you want to run both in the background:

```bash
# Start backend in background
cd /home/kiab/new/backend
php -S localhost:8000 > /tmp/backend.log 2>&1 &

# Start frontend in background
cd /home/kiab/new/frontend
npm run dev > /tmp/frontend.log 2>&1 &

# View logs
tail -f /tmp/backend.log
tail -f /tmp/frontend.log
```

---

## Access Your Application

Once both servers are running:

1. **Open your browser**
2. **Go to:** http://localhost:5173
3. **You should see:** Your Walk Addis website with your new logo!

---

## Verify Everything Works

### Test Backend:
```bash
curl http://localhost:8000/api/categories.php
```
Should return JSON with categories.

### Test Frontend:
- Open http://localhost:5173
- Check if logo appears in navbar
- Check if logo appears in footer
- Check browser tab for favicon

---

## Stopping the Servers

### If running in foreground:
- Press `Ctrl + C` in each terminal

### If running in background:
```bash
# Find and kill PHP server
pkill -f "php -S localhost:8000"

# Find and kill Vite server
pkill -f "vite"
```

---

## Troubleshooting

### Backend Issues

**Problem:** `php: command not found`
```bash
sudo apt update
sudo apt install php php-mysql
```

**Problem:** Port 8000 already in use
```bash
# Use a different port
php -S localhost:8001
# Then update frontend/src/services/api.js to use port 8001
```

### Frontend Issues

**Problem:** `npm: command not found`
```bash
sudo apt update
sudo apt install nodejs npm
```

**Problem:** Dependencies not installed
```bash
cd /home/kiab/new/frontend
npm install
```

**Problem:** Port 5173 already in use
- Vite will automatically use the next available port
- Or specify: `npm run dev -- --port 5174`

---

## Quick Commands Reference

```bash
# Start Backend
cd /home/kiab/new/backend && php -S localhost:8000

# Start Frontend
cd /home/kiab/new/frontend && npm run dev

# Check if servers are running
curl http://localhost:8000/api/categories.php  # Backend
curl http://localhost:5173                      # Frontend
```

---

## Your Logo Should Appear In:

✅ **Navbar** - Top left corner  
✅ **Footer** - Brand section  
✅ **Admin Login** - Above login form  
✅ **Browser Tab** - Favicon  

If your logo doesn't appear:
1. Make sure the file is at: `frontend/public/assets/logo.svg` (or .png/.jpg)
2. Make sure the favicon is at: `frontend/public/favicon.svg` (or .png/.ico)
3. Hard refresh the browser: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
4. Check browser console for any errors

---

Enjoy your beautiful website! 🎉


