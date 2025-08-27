# 🔧 Environment Setup Guide for EATOPIA

This guide will help you set up all the required API keys and environment variables for EATOPIA.

## 📋 Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# ===================================
# 🔥 FIREBASE CONFIGURATION
# ===================================
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id

# ===================================
# 🗺️ GOOGLE MAPS CONFIGURATION
# ===================================
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# ===================================
# 🤖 GOOGLE GEMINI AI
# ===================================
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# ===================================
# 📸 UNSPLASH API
# ===================================
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
UNSPLASH_SECRET_KEY=your_unsplash_secret_key
```

## 🔥 Firebase Setup

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "eatopia-app")
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Authentication
1. In Firebase console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save changes

### 3. Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Register app with nickname
5. Copy the config object values to your `.env.local`

```javascript
// Example Firebase config (replace with your values)
const firebaseConfig = {
  apiKey: "AIzaSyAe9O00Ttk8eo8rnOaTY_wQRRyTgsIWY6I",
  authDomain: "eatopia-723d1.firebaseapp.com",
  databaseURL: "https://eatopia-723d1-default-rtdb.firebaseio.com",
  projectId: "eatopia-723d1",
  storageBucket: "eatopia-723d1.firebasestorage.app",
  messagingSenderId: "746181935140",
  appId: "1:746181935140:web:4046aedebfbe4df5f718b1",
  measurementId: "G-DSHK81TFHE"
};
```

## 🗺️ Google Maps API Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable billing (required for Maps API)

### 2. Enable Required APIs
Navigate to "APIs & Services" → "Library" and enable:
- **Maps JavaScript API**
- **Places API (New)**
- **Geocoding API**
- **Distance Matrix API**

### 3. Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API key"
3. Copy the API key
4. Click "Restrict Key" (recommended)
5. Set application restrictions (HTTP referrers for web)
6. Set API restrictions to only enabled APIs above

### 4. Add to Environment
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🤖 Google Gemini AI Setup

### 1. Get API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the generated key

### 2. Add to Environment
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
```

## 📸 Unsplash API Setup

### 1. Create Unsplash Developer Account
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Sign up or log in
3. Accept the API Terms

### 2. Create New Application
1. Click "Your apps" → "New Application"
2. Accept terms and conditions
3. Fill in application details:
   - **Application name**: "EATOPIA"
   - **Description**: "Restaurant discovery app with vibe-based matching"
4. Submit application

### 3. Get API Keys
1. Once approved, go to your application
2. Copy "Access Key" and "Secret Key"

### 4. Add to Environment
```bash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key
UNSPLASH_SECRET_KEY=your_secret_key
```

## 🔒 Security Best Practices

### Environment Variable Security
- Never commit `.env.local` to version control
- Use `NEXT_PUBLIC_` prefix only for client-side variables
- Keep secret keys (like Unsplash Secret) without the prefix
- Use different API keys for development and production

### API Key Restrictions
- **Google Maps**: Restrict to your domain/localhost
- **Firebase**: Configure authorized domains
- **Unsplash**: Monitor usage and set rate limits

### Production Deployment
When deploying to Vercel, Netlify, or other platforms:
1. Add all environment variables to your deployment platform
2. Use production Firebase project
3. Use production Google Cloud project
4. Update API key restrictions for production domain

## 🧪 Testing Your Setup

### 1. Check Firebase Connection
```bash
npm run dev
```
- Try signing up/logging in
- Check browser console for Firebase errors

### 2. Test Google Maps
- Visit `/create-experience`
- Check if location search works
- Verify maps load correctly

### 3. Test Gemini AI
- Look for AI-generated content
- Check browser console for API errors

### 4. Test Unsplash Images
- Check if restaurant images load
- Verify image optimization works

## 🚨 Common Issues

### Firebase Authentication Not Working
- Check if Email/Password provider is enabled
- Verify all Firebase config values are correct
- Check browser console for specific errors

### Google Maps Not Loading
- Verify API key is correct and unrestricted
- Check if required APIs are enabled
- Ensure billing is enabled on Google Cloud

### Gemini AI Not Responding
- Check API key is valid
- Verify you have access to Gemini API
- Check rate limits and quotas

### Unsplash Images Not Loading
- Verify API keys are correct
- Check if application is approved
- Monitor rate limits (50 requests/hour for demo)

## 💡 Development Tips

- Use browser DevTools to check for API errors
- Monitor API usage in respective dashboards
- Keep API keys secure and rotate them regularly
- Use environment-specific configurations for dev/staging/prod

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for detailed error messages
2. Verify all API keys are correctly set in `.env.local`
3. Ensure all required APIs are enabled
4. Check service status pages for any outages
5. Review the official documentation for each service

---

Happy coding! 🍽️✨
