# Unsplash API Setup Instructions

## Current Status
The app is currently using beautiful restaurant-themed SVG backgrounds as fallbacks. To enable real restaurant photos from Unsplash, you need to set up a valid API key.

## Error Fixed
✅ **Image Domain Error:** Added `images.unsplash.com` to Next.js configuration in `next.config.ts`
✅ **Graceful Fallbacks:** App now uses restaurant-themed SVG when API is unavailable

To get dynamic images working with Unsplash, follow these steps:

## Getting a Valid Unsplash API Key

1. **Create an Unsplash Developer Account:**
   - Go to [https://unsplash.com/developers](https://unsplash.com/developers)
   - Sign up or log in to your Unsplash account

2. **Create a New Application:**
   - Click "New Application"
   - Accept the API Terms
   - Fill out the application form:
     - **Application name:** "Landed Houses"
     - **Description:** "A property rental website showcasing countryside houses"
     - **Website:** Your website URL (can use localhost for development)

3. **Get Your Keys:**
   - Once approved, you'll get:
     - **Access Key** (for public requests)
     - **Secret Key** (for authenticated requests)

4. **Update Environment Variables:**
   - Update `.env.local` with your new keys:
   ```
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_new_access_key_here
   UNSPLASH_SECRET_KEY=your_new_secret_key_here
   ```

5. **Restart Development Server:**
   ```bash
   npm run dev
   ```

## Current Fallback

Currently, the app uses a beautiful SVG landscape as a fallback when the Unsplash API is unavailable. This ensures the site works perfectly even without API access.

## API Usage

The app is configured to:
- Fetch random countryside house images for the background
- Show proper attribution to photographers
- Gracefully fallback to SVG when API is unavailable
- Cache images for better performance

## Rate Limits

Unsplash free tier allows:
- 50 requests per hour for demo apps
- 5000 requests per hour for production apps

The app is designed to handle these limits gracefully.
