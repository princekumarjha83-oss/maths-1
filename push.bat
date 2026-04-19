@echo off
echo Pushing to GitHub...

git add .
git commit -m "Auto-push: %date% %time%"
git push origin main

echo Pushed successfully!
pause
