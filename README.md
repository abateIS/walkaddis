# Walk Addis - Event Promotion Platform

A full-stack web application for discovering and promoting events in Addis Ababa, Ethiopia.

## Features

- 🎉 Browse events by category (Music, Arts, Sports, etc.)
- 🔍 Filter events by preferences
- 📅 View event details
- 👨‍💼 Admin panel for event management
- 📧 Contact form for event organizers

## Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: PHP (REST API)
- **Database**: MySQL
- **Styling**: Tailwind CSS

## Project Structure

```
├── frontend/          # React application
├── backend/           # PHP API
├── database/          # Database schema
└── README.md
```

## Setup Instructions

### Backend Setup

1. Ensure PHP 7.4+ and MySQL are installed
2. Create a MySQL database named `walk_addis`
3. Import the database schema from `database/schema.sql`
4. Update database credentials in `backend/config.php`
5. Start PHP development server:
   ```bash
   cd backend
   php -S localhost:8000
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Admin Access

Default admin credentials (change after first login):
- Email: admin@walkaddis.com
- Password: admin123




