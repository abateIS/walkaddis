# Push to GitHub - Step by Step

## Option 1: Push Everything Together (Recommended)

Since your frontend and backend are in the same repository, push them together.

### Step 1: Initialize Git (if not done)

```bash
cd /home/kiab/new
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create First Commit

```bash
git commit -m "Initial commit - Walk Addis Event Platform"
```

### Step 4: Create GitHub Repository

1. Go to https://github.com
2. Click "+" → "New repository"
3. Name: `walkaddis` (or your choice)
4. Description: "Event discovery platform for Addis Ababa"
5. **Don't** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 5: Connect and Push

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/walkaddis.git

# Rename branch to main
git branch -M main

# Push everything
git push -u origin main
```

**That's it!** Your entire project (frontend + backend) is now on GitHub.

---

## Option 2: Separate Repositories (If You Want)

If you prefer separate repositories:

### Frontend Repository

```bash
cd /home/kiab/new/frontend
git init
git add .
git commit -m "Frontend - Walk Addis"
git remote add origin https://github.com/YOUR_USERNAME/walkaddis-frontend.git
git branch -M main
git push -u origin main
```

### Backend Repository

```bash
cd /home/kiab/new/backend
git init
git add .
git commit -m "Backend - Walk Addis API"
git remote add origin https://github.com/YOUR_USERNAME/walkaddis-backend.git
git branch -M main
git push -u origin main
```

**Note:** Separate repos make deployment more complex. I recommend Option 1.

---

## Quick Commands (All Together)

```bash
cd /home/kiab/new

# Initialize (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Walk Addis Event Platform"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/walkaddis.git

# Push
git branch -M main
git push -u origin main
```

---

## What Gets Pushed?

✅ **Frontend** (`frontend/` folder)
✅ **Backend** (`backend/` folder)
✅ **Database** (`database/` folder)
✅ **Documentation** (all .md files)
✅ **Config files** (.gitignore, etc.)

❌ **NOT pushed** (thanks to .gitignore):
- `node_modules/`
- `.env` files
- Log files
- System files

---

## After Pushing

Once on GitHub, you can:
1. Deploy to Render/Vercel/000webhost
2. Share with collaborators
3. Set up CI/CD
4. Track changes

---

## Need Help?

If you get errors:
- **Authentication**: You may need to set up GitHub credentials
- **Large files**: Check .gitignore is working
- **Permission denied**: Check repository access

Let me know if you need help with any step!


