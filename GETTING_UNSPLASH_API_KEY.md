# How to Get a Valid Unsplash API Key

## Current Status
✅ **Unsplash API Integration Ready** - The app is configured to fetch restaurant images from Unsplash
❌ **Invalid API Key** - Current key shows "OAuth error: The access token is invalid"

## Step-by-Step Guide to Get Valid API Key

### 1. Create Unsplash Developer Account

1. **Visit Unsplash Developers**
   - Go to: https://unsplash.com/developers
   - Click "Join" or "Login" if you have an account

2. **Sign Up/Login**
   - Use your email or social login
   - Complete account verification if needed

### 2. Create New Application

1. **Navigate to Applications**
   - Once logged in, go to "Your apps" or "Applications"
   - Click "New Application"

2. **Fill Application Details**
   ```
   Application name: Restaurant Discovery App
   Description: A web application for discovering and booking restaurants with beautiful photo galleries
   ```

3. **Accept Terms**
   - Read and accept the API Terms
   - Read and accept the Guidelines

### 3. Get Your API Keys

Once approved, you'll see:
- **Access Key** (Public, for client-side use)
- **Secret Key** (Private, for server-side use)

### 4. Update Your Environment Variables

Replace the keys in `.env.local`:
```bash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_new_access_key_here
UNSPLASH_SECRET_KEY=your_new_secret_key_here
```

### 5. Restart Development Server

```bash
npm run dev
```

## Testing Your API Key

You can test your new API key with:
```bash
curl -H "Authorization: Client-ID YOUR_ACCESS_KEY" "https://api.unsplash.com/photos/random?query=restaurant"
```

## Current App Features (Once API Key is Valid)

### Background Images
- **Query**: "restaurant interior elegant dining"
- **Fallback**: Beautiful restaurant SVG scene
- **Attribution**: Automatic photographer credits

### Restaurant Gallery
- **Specific Queries**: 
  - "french restaurant elegant dining"
  - "japanese sushi restaurant" 
  - "italian restaurant pasta pizza"
  - "steakhouse restaurant grilled meat"
  - "indian restaurant curry spices"
  - "coffee shop cafe interior"

### API Rate Limits
- **Demo Apps**: 50 requests/hour
- **Production Apps**: 5,000 requests/hour
- **Enterprise**: Contact Unsplash for higher limits

## Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Invalid API key
2. **403 Forbidden**: Rate limit exceeded
3. **404 Not Found**: Invalid endpoint

### Solutions:
1. **Double-check API key** in `.env.local`
2. **Restart development server** after changing environment variables
3. **Check rate limits** in Unsplash dashboard
4. **Verify application status** (not suspended)

## Alternative: Demo Mode

If you don't want to set up Unsplash API right now, the app works perfectly with:
- ✅ Beautiful restaurant-themed SVG backgrounds
- ✅ Professional placeholder images
- ✅ All functionality except real photos

Just browse to http://localhost:3000 to see the app in action!
