# 🚀 Converting Math Rush to an Android APK

Since this game is built with **React and Vite (HTML5/JavaScript)**, the easiest way to convert it into a production-ready Android APK is using **Capacitor**.

## 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v18+)
- **Android Studio**
- **Java JDK 17+**

---

## 2. Step-by-Step Guide

### Step 1: Initialize Capacitor
In your project root, run:
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```
*App Name:* Math Rush
*App ID:* com.yourname.mathrush

### Step 2: Build the Web Project
Ensure your `dist` folder is ready:
```bash
npm run build
```

### Step 3: Add Android Platform
```bash
npm install @capacitor/android
npx cap add android
```

### Step 4: Sync the Code
```bash
npx cap copy
npx cap sync
```

### Step 5: Open in Android Studio
```bash
npx cap open android
```

### Step 6: Build the APK
1. In Android Studio, wait for Gradle to sync.
2. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
3. Your APK will be located in: `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 3. Alternative: PWA (Progressive Web App)
You can also use **Vite PWA Plugin** to make it installable directly from the browser without an APK.
1. Install `vite-plugin-pwa`.
2. Configure `vite.config.ts`.
3. Add a `manifest.json`.
4. Users can select "Add to Home Screen" on Android.

---

## 💡 Pro Tips for Play Store
- **App Icon:** Generate a 512x512 rounded icon.
- **Splash Screen:** Use `@capacitor/assets` to generate splash screens.
- **Signing:** For Play Store, generate a **Signed App Bundle (.aab)** instead of a debug APK.
