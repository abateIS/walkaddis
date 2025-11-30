#!/bin/bash
# Quick script to push everything to GitHub

echo "=========================================="
echo "Pushing Walk Addis to GitHub"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    echo "✓ Git initialized"
fi

# Add all files
echo "Adding files..."
git add .
echo "✓ Files added"

# Check if there are changes
if git diff --staged --quiet; then
    echo "⚠ No changes to commit"
else
    # Commit
    echo "Creating commit..."
    git commit -m "Initial commit - Walk Addis Event Platform with logo and dark mode"
    echo "✓ Committed"
fi

echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Create a repository on GitHub:"
echo "   - Go to https://github.com"
echo "   - Click 'New repository'"
echo "   - Name it: walkaddis"
echo "   - Don't initialize with README"
echo ""
echo "2. Then run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/walkaddis.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Replace YOUR_USERNAME with your GitHub username!"
echo ""


