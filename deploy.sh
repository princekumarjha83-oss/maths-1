#!/bin/bash

echo "Building and deploying to GitHub..."

# Build the project
npm run build

# Add all changes
git add .

# Commit with timestamp
git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
git push origin main

echo "Deployment complete!"
echo "Your app will be live at: https://princekumarjha83-oss.github.io/math-project2/"
