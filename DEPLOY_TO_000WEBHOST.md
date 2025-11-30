# Deploy to 000webhost (Free PHP + MySQL) - Detailed Guide

## Why 000webhost?
- ✅ Free PHP hosting
- ✅ Free MySQL database (up to 2 databases)
- ✅ No credit card required
- ✅ Easy setup
- ✅ Keeps your MySQL setup

## Step 1: Sign Up

1. Go to https://www.000webhost.com
2. Click "Sign Up" (free)
3. Create account (use email verification)

## Step 2: Create Website

1. After login, click "Create Website"
2. Choose "Build a New Website"
3. Enter website name (e.g., `walkaddis`)
4. Click "Next" → "Skip" (we'll upload our own files)

## Step 3: Upload Backend Files

### Option A: File Manager (Easier)
1. Go to "File Manager" in control panel
2. Navigate to `public_html` folder
3. Delete default files (index.html, etc.)
4. Upload your `backend` folder contents:
   - Upload all files from `/home/kiab/new/backend/` to `public_html/`
   - Keep the folder structure (api/, config.php, etc.)

### Option B: FTP (Faster for large files)
1. Get FTP credentials from control panel
2. Use FileZilla or similar FTP client
3. Connect and upload backend files

## Step 4: Create MySQL Database

1. Go to "MySQL Databases" in control panel
2. Click "Create Database"
3. Database name: `walkaddis` (or your choice)
4. Username: (auto-generated or create new)
5. Password: (set a strong password)
6. Click "Create"
7. **Save these credentials!**

## Step 5: Update Backend Config

1. In File Manager, edit `public_html/config.php`
2. Update database credentials:
```php
define('DB_HOST', 'localhost'); // Usually localhost
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');
```

**Note:** 000webhost usually provides a database host like `localhost` or a specific hostname. Check your database details.

## Step 6: Import Database Schema

1. Go to "phpMyAdmin" in control panel
2. Select your database
3. Click "Import"
4. Upload your `database/schema.sql` file
5. Click "Go"

## Step 7: Update CORS Settings

In `public_html/config.php`, update CORS to allow your frontend domain:

```php
header('Access-Control-Allow-Origin: https://your-frontend-domain.vercel.app');
// Or for development:
header('Access-Control-Allow-Origin: *'); // Remove in production!
```

## Step 8: Test Backend

Your backend URL will be: `https://your-site-name.000webhostapp.com/api/`

Test it:
```bash
curl https://your-site-name.000webhostapp.com/api/categories.php
```

## Step 9: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Environment Variables:
   - `VITE_API_URL` = `https://your-site-name.000webhostapp.com/api`
7. Click "Deploy"

## Step 10: Update Frontend API URL

After Vercel deployment, update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-site-name.000webhostapp.com/api'
```

## Your Live URLs

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-site-name.000webhostapp.com/api`
- **Database**: Managed by 000webhost

## Troubleshooting

### Backend 500 Error
- Check database credentials in config.php
- Check file permissions (should be 644 for files, 755 for folders)
- Check error logs in 000webhost control panel

### CORS Errors
- Update `Access-Control-Allow-Origin` in config.php
- Make sure it matches your frontend domain exactly

### Database Connection Failed
- Verify database credentials
- Check if database exists in phpMyAdmin
- Some hosts use different hostnames (check your database details)

## Free Tier Limitations

- **Bandwidth**: 1 GB/month
- **Storage**: 300 MB
- **Databases**: 2 MySQL databases
- **Subdomain**: `.000webhostapp.com`

## Upgrade Options (Optional)

If you need more resources later:
- Upgrade to paid plan
- Or migrate to other free hosts

---

## Quick Checklist

- [ ] Sign up for 000webhost
- [ ] Create website
- [ ] Upload backend files
- [ ] Create MySQL database
- [ ] Update config.php with database credentials
- [ ] Import database schema
- [ ] Test backend API
- [ ] Deploy frontend to Vercel
- [ ] Update frontend API URL
- [ ] Test full application

---

**Your website will be live for free!** 🎉


