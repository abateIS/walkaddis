# Admin Guide - How to Add and Manage Events

## Admin Login Credentials

**Email:** `admin@walkaddis.com`  
**Password:** `admin123`

---

## How to Access Admin Panel

1. Make sure both servers are running:
   - Backend: `php -S localhost:8000` (in `backend` folder)
   - Frontend: `npm run dev` (in `frontend` folder)

2. Open your browser and go to: **http://localhost:5173**

3. Navigate to the Admin page. You can:
   - Click on "Admin" in the navigation menu (if available)
   - Or go directly to: **http://localhost:5173/admin** (if routing is set up)
   - Or look for an "Admin" link/button in the navigation

4. You'll see a login form. Enter:
   - **Email:** `admin@walkaddis.com`
   - **Password:** `admin123`

5. Click "Login"

---

## How to Add a New Event

After logging in, you'll see the "Create New Event" form. Fill in the details:

### Required Fields (marked with *):
- **Event Title** - Name of your event
- **Description** - Detailed description of the event
- **Category** - Select from dropdown (Music, Arts, Sports, etc.)
- **Event Date & Time** - When the event will happen
- **Venue** - Name of the venue
- **Address** - Full address of the venue
- **Organizer Name** - Name of the person/organization organizing

### Optional Fields:
- **Ticket Price (ETB)** - Price in Ethiopian Birr (leave 0 for free events)
- **Image URL** - Link to an event image (e.g., `https://example.com/image.jpg`)
- **Ticket Purchase URL** - Link where people can buy tickets
- **Contact Email** - Email for inquiries
- **Contact Phone** - Phone number for inquiries
- **Feature this event** - Checkbox to feature the event on homepage

### Steps:
1. Fill in all required fields
2. Add optional information as needed
3. Check "Feature this event" if you want it highlighted on the homepage
4. Click **"Create Event"**
5. You'll see a success message: "✓ Event created successfully!"
6. The form will reset, ready for the next event

---

## Viewing Your Events

After creating an event:
1. Go back to the homepage: **http://localhost:5173**
2. Your new event should appear in the events list
3. If you checked "Feature this event", it will appear at the top

---

## Managing Events (Current Limitations)

**Note:** The current version allows you to:
- ✅ **Create** new events
- ✅ **View** all events on the homepage
- ❌ **Edit** events (not yet implemented in UI)
- ❌ **Delete** events (not yet implemented in UI)

### To Edit or Delete Events (Using Database):

If you need to edit or delete events, you can do it directly in the database:

#### View All Events:
```bash
mysql -u root -padmin123 -e "USE walk_addis; SELECT id, title, event_date, status FROM events;"
```

#### Edit an Event:
```bash
mysql -u root -padmin123
```

Then in MySQL:
```sql
USE walk_addis;

-- Update event title
UPDATE events SET title = 'New Event Title' WHERE id = 1;

-- Update event status (active, cancelled, completed)
UPDATE events SET status = 'cancelled' WHERE id = 1;

-- Update featured status
UPDATE events SET is_featured = 1 WHERE id = 1;

EXIT;
```

#### Delete an Event:
```sql
USE walk_addis;
DELETE FROM events WHERE id = 1;
EXIT;
```

---

## Event Status Options

Events can have three statuses:
- **active** - Event is live and visible (default)
- **cancelled** - Event has been cancelled
- **completed** - Event has finished

To change status via database:
```sql
UPDATE events SET status = 'cancelled' WHERE id = 1;
```

---

## Tips for Adding Events

1. **Use Good Images:** Add image URLs that are publicly accessible. You can:
   - Upload images to imgur.com and use the direct link
   - Use images from Unsplash (https://unsplash.com)
   - Host images on your own server

2. **Date Format:** The date picker will format it correctly, but make sure to select a future date for upcoming events

3. **Featured Events:** Only feature your most important events to keep the homepage clean

4. **Categories:** Make sure to select the correct category so users can filter events properly

5. **Contact Information:** Always add contact email/phone so people can reach out with questions

---

## Troubleshooting

### Can't Login?
- Make sure the backend server is running on port 8000
- Check that the admin user exists:
  ```bash
  mysql -u root -padmin123 -e "USE walk_addis; SELECT * FROM admins;"
  ```

### Event Not Appearing?
- Check if the event was created:
  ```bash
  mysql -u root -padmin123 -e "USE walk_addis; SELECT id, title, status FROM events ORDER BY id DESC LIMIT 5;"
  ```
- Make sure the event status is 'active'
- Refresh the homepage

### Form Errors?
- Make sure all required fields are filled
- Check that the date is in the future (if that's required)
- Verify category_id is a valid number

---

## Quick Reference

**Admin Login:**
- URL: http://localhost:5173/admin (or navigate via menu)
- Email: `admin@walkaddis.com`
- Password: `admin123`

**View Events:**
- Homepage: http://localhost:5173

**Database Access:**
```bash
mysql -u root -padmin123 walk_addis
```

**View Recent Events:**
```bash
mysql -u root -padmin123 -e "USE walk_addis; SELECT id, title, event_date FROM events ORDER BY id DESC LIMIT 10;"
```

---

## Next Steps (Future Enhancements)

The following features could be added in the future:
- Edit events from the admin panel
- Delete events from the admin panel
- View all events in a list/table format
- Bulk actions (delete multiple events)
- Event analytics/statistics
- Image upload (instead of URL)

For now, you can create events through the admin panel and manage them via the database if needed.


