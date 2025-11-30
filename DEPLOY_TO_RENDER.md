# Deploy to Render - Step by Step

## Prerequisites
1. GitHub account
2. Render account (free at https://render.com)

## Step 1: Prepare Your Code

### 1.1 Create .gitignore (if not exists)
```bash
cd /home/kiab/new
cat > .gitignore << 'EOF'
node_modules/
frontend/node_modules/
backend/vendor/
.env
*.log
.DS_Store
EOF
```

### 1.2 Initialize Git Repository
```bash
cd /home/kiab/new
git init
git add .
git commit -m "Initial commit - Walk Addis"
```

### 1.3 Push to GitHub
1. Create a new repository on GitHub (name it `walkaddis`)
2. Then run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/walkaddis.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Render

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (free)

### 2.2 Deploy Database
1. Click "New +" → "PostgreSQL"
2. Name: `walkaddis-db`
3. Plan: Free
4. Click "Create Database"
5. **Note the connection details** (you'll need them)

### 2.3 Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Settings:
   - **Name**: `walkaddis-backend`
   - **Environment**: PHP
   - **Build Command**: `echo "No build needed"`
   - **Start Command**: `php -S 0.0.0.0:$PORT -t backend`
   - **Plan**: Free
4. Add Environment Variables:
   - `DB_HOST`: (from database connection)
   - `DB_NAME`: (from database connection)
   - `DB_USER`: (from database connection)
   - `DB_PASS`: (from database connection)
5. Click "Create Web Service"

### 2.4 Deploy Frontend
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Settings:
   - **Name**: `walkaddis-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Plan**: Free
4. Add Environment Variable:
   - `VITE_API_URL`: `https://walkaddis-backend.onrender.com/api`
5. Click "Create Static Site"

## Step 3: Update Backend for PostgreSQL

Since Render uses PostgreSQL, we need to update the backend:

### 3.1 Update config.php
Change the PDO connection to support PostgreSQL:

```php
// In backend/config.php, update getDBConnection():
$pdo = new PDO(
    "pgsql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=5432",
    DB_USER,
    DB_PASS,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
);
```

### 3.2 Update SQL Queries
PostgreSQL uses slightly different syntax. We'll need to adapt the queries.

## Step 4: Import Database Schema

After deployment, you'll need to import your database schema. Render provides a database URL you can use.

---

## Alternative: Use 000webhost (Keeps MySQL)

If you want to keep MySQL instead of PostgreSQL:

### Option A: 000webhost (Free PHP + MySQL)

1. **Sign up**: https://www.000webhost.com
2. **Create website**
3. **Upload backend files** via File Manager or FTP
4. **Create MySQL database** in control panel
5. **Update config.php** with database credentials
6. **Deploy frontend** to Vercel/Netlify pointing to your 000webhost backend

---

## Quick Comparison

| Service | Frontend | Backend | Database | Ease | Free Tier |
|---------|----------|---------|----------|------|-----------|
| **Render** | ✅ | ✅ | PostgreSQL | ⭐⭐⭐⭐⭐ | Good |
| **Vercel + 000webhost** | ✅ | ✅ | MySQL | ⭐⭐⭐⭐ | Good |
| **Netlify + InfinityFree** | ✅ | ✅ | MySQL | ⭐⭐⭐ | Good |
| **Railway** | ✅ | ✅ | MySQL | ⭐⭐⭐⭐ | Limited |

---

## Recommended: Vercel + 000webhost (Keeps MySQL)

This keeps your MySQL database and is easier to set up.

### Frontend on Vercel:
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Root Directory: `frontend`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Add Environment Variable: `VITE_API_URL` = your backend URL

### Backend on 000webhost:
1. Sign up at https://www.000webhost.com
2. Create website
3. Upload `backend` folder contents
4. Create MySQL database
5. Update `backend/config.php` with database credentials
6. Update frontend API URL to point to your 000webhost URL

---

## Need Help?

If you want, I can:
1. Create deployment-ready files
2. Adapt the code for PostgreSQL (if using Render)
3. Create a build script
4. Set up environment variables

Let me know which option you prefer!


