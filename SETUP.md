# Walk Addis - Setup Guide

## Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher (or MariaDB)
- Node.js 16+ and npm
- A web server (Apache/Nginx) or PHP built-in server

## Step-by-Step Setup

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and import schema
mysql -u root -p < database/schema.sql

# (Optional) Import sample data
mysql -u root -p < database/sample_data.sql
```

### 2. Backend Configuration

Edit `backend/config.php` and update database credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'walk_addis');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
```

### 3. Start PHP Backend Server

```bash
cd backend
php -S localhost:8000
```

The API will be available at `http://localhost:8000/api/`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 5. Admin Access

Default admin credentials:
- **Email**: admin@walkaddis.com
- **Password**: admin123

**Important**: Change the admin password after first login!

To create a new admin password hash:
```bash
php -r "echo password_hash('your_new_password', PASSWORD_DEFAULT);"
```

Then update the database:
```sql
UPDATE admins SET password_hash = 'your_generated_hash' WHERE email = 'admin@walkaddis.com';
```

## API Endpoints

- `GET /api/events.php` - Get all events (optional: `?category=music`)
- `GET /api/categories.php` - Get all categories
- `POST /api/events.php` - Create new event (admin only)
- `POST /api/contact.php` - Submit organizer contact form
- `POST /api/admin/login.php` - Admin login

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure:
1. The PHP server is running on port 8000
2. The React dev server is running on port 5173
3. Update CORS headers in `backend/config.php` if using different ports

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `backend/config.php`
- Ensure the database `walk_addis` exists

### Frontend Not Loading
- Run `npm install` in the frontend directory
- Check that Node.js version is 16+
- Clear browser cache

## Production Deployment

For production:
1. Update CORS origin in `backend/config.php` to your domain
2. Use a proper web server (Apache/Nginx) instead of PHP built-in server
3. Build the React app: `cd frontend && npm run build`
4. Serve the `frontend/dist` folder as static files
5. Use environment variables for sensitive configuration
6. Enable HTTPS
7. Implement proper authentication (JWT tokens)

