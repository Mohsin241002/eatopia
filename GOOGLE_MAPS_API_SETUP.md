# Google Maps API Setup Guide

## Issue: ApiNotActivatedMapError

This error occurs when the required Google Maps APIs are not enabled for your API key.

## Solution: Enable Required APIs

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Select Your Project
- If you don't have a project, create one
- Select the project that contains your API key

### Step 3: Enable Required APIs
Go to **APIs & Services** → **Library** and enable these APIs:

1. **Maps JavaScript API**
   - Search: "Maps JavaScript API"
   - Click on it and press "Enable"

2. **Places API** 
   - Search: "Places API"
   - Click on it and press "Enable"

3. **Geocoding API**
   - Search: "Geocoding API" 
   - Click on it and press "Enable"

### Step 4: Verify API Key Settings
1. Go to **APIs & Services** → **Credentials**
2. Find your API key: `AIzaSyCh5ZZkKXaxSlSobJhVkg0LtBwD8pI2zU8`
3. Click on the API key name
4. Check restrictions:
   - **Option A**: No restrictions (for development)
   - **Option B**: Add the enabled APIs to "API restrictions"

### Step 5: Enable Billing (If Required)
- Some Google Maps APIs require billing to be enabled
- Go to **Billing** in Google Cloud Console
- Add a billing account if prompted

## Quick Links
- [Google Cloud Console](https://console.cloud.google.com/)
- [Maps JavaScript API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)
- [Places API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)
- [Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)

## After Enabling APIs
1. Wait 1-2 minutes for changes to propagate
2. Refresh your test page: http://localhost:3003/test-places
3. Test the location autocomplete functionality

## Troubleshooting
If you still see errors after enabling APIs:
- Check if billing is enabled for your Google Cloud project
- Verify the API key is not restricted to specific domains
- Wait a few minutes for API activation to propagate