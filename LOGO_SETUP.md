# Logo Setup Instructions

## Current Logo Implementation

The website is now set up to use your brand logo in the following locations:

1. **Navbar** - Top left corner
2. **Footer** - Brand section
3. **Admin Login Page** - Above the login form
4. **Favicon** - Browser tab icon

## How to Replace the Placeholder Logo

### Step 1: Add Your Logo Files

1. Place your logo file(s) in: `frontend/public/assets/`
2. Recommended formats:
   - **SVG** (best for scalability) - name it `logo.svg`
   - **PNG** (with transparent background) - name it `logo.png`
   - **JPG** (if no transparency needed) - name it `logo.jpg`

### Step 2: Update Logo References

The logo is currently referenced as `/assets/logo.svg` in:
- `frontend/src/components/Navbar.jsx` (line ~14)
- `frontend/src/components/Footer.jsx` (line ~45)
- `frontend/src/pages/Admin.jsx` (line ~175)

If you use a different format (PNG/JPG), update the file extension in these files.

### Step 3: Create Favicon

1. Create a square version of your logo (32x32px or 64x64px recommended)
2. Save it as `frontend/public/favicon.svg` (or `.png`, `.ico`)
3. Update `frontend/index.html` line 5 if using a different format

### Step 4: Extract Brand Colors (Optional)

If your logo has specific colors you want to use:

1. Identify the main colors from your logo
2. Update `frontend/tailwind.config.js` in the `colors.primary` section
3. The current colors are orange-based (#f97316)

Example:
```javascript
primary: {
  500: '#YOUR_COLOR', // Main brand color
  600: '#DARKER_SHADE', // For hover states
  // ... etc
}
```

## Current Brand Colors

The website uses a refined orange color palette:
- **Primary Orange**: `#f97316`
- **Dark Orange**: `#ea580c`
- **Light Orange**: `#fb923c`

These colors are used throughout:
- Buttons and links
- Accents and highlights
- Gradients and backgrounds
- Hover states

## Logo Specifications

### Recommended Sizes:
- **Navbar Logo**: 180px width × 50px height (or proportional)
- **Footer Logo**: 200px width × 60px height (or proportional)
- **Favicon**: 32×32px or 64×64px (square)

### File Formats:
- **SVG** (preferred) - Scalable, small file size
- **PNG** - Good quality, supports transparency
- **JPG** - Smaller file size, no transparency

## Testing

After adding your logo:
1. Restart the development server
2. Check all pages:
   - Homepage (navbar)
   - Footer (scroll down)
   - Admin login page
   - Browser tab (favicon)

## Need Help?

If you need to adjust logo sizes or positioning, edit:
- Navbar: `frontend/src/components/Navbar.jsx`
- Footer: `frontend/src/components/Footer.jsx`
- Admin: `frontend/src/pages/Admin.jsx`

The logo images use Tailwind classes for sizing:
- `h-8 sm:h-10` = Height 32px on mobile, 40px on larger screens
- `w-auto` = Width adjusts automatically to maintain aspect ratio


