# 🔌 EATOPIA API Documentation

This document provides comprehensive information about all APIs integrated into EATOPIA and how to use them.

## 📑 Table of Contents
- [Firebase Authentication](#firebase-authentication)
- [Google Maps & Places API](#google-maps--places-api)
- [Google Gemini AI](#google-gemini-ai)
- [Unsplash Images API](#unsplash-images-api)
- [Rate Limits & Quotas](#rate-limits--quotas)
- [Error Handling](#error-handling)

---

## 🔥 Firebase Authentication

### **Configuration**
```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### **Available Functions**

#### **User Registration**
```typescript
import { useAuth } from '@/contexts/AuthContext';

const { signup } = useAuth();

await signup(
  email: string,
  password: string, 
  displayName: string
);
```

#### **User Login**
```typescript
const { login } = useAuth();

await login(
  email: string,
  password: string
);
```

#### **User Logout**
```typescript
const { logout } = useAuth();

await logout();
```

#### **Password Reset**
```typescript
const { resetPassword } = useAuth();

await resetPassword(email: string);
```

#### **Get Current User**
```typescript
const { user, loading } = useAuth();

// user: User | null
// loading: boolean
```

### **Error Handling**
```typescript
try {
  await signup(email, password, displayName);
} catch (error: any) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email is already registered';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Invalid email address';
    default:
      return error.message;
  }
}
```

---

## 🗺️ Google Maps & Places API

### **Configuration**
```typescript
// src/lib/googlemaps.ts
import { Loader } from '@googlemaps/js-api-loader';

const mapsLoader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places', 'geometry', 'geocoding'],
});
```

### **Core Functions**

#### **Initialize Map**
```typescript
import { initializeMap } from '@/lib/googlemaps';

const map = await initializeMap(containerElement, {
  center: { lat: 40.7831, lng: -73.9712 },
  zoom: 13,
  mapTypeControl: false,
  streetViewControl: false,
});
```

#### **Search Restaurants**
```typescript
import { searchRestaurants } from '@/lib/googlemaps';

const restaurants = await searchRestaurants({
  location: { lat: 40.7831, lng: -73.9712 },
  radius: 1000,              // meters
  keyword: 'italian cuisine',
  type: 'restaurant',
  maxResults: 20,
  minRating: 4.0
});

// Returns: RestaurantLocation[]
interface RestaurantLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  priceLevel?: number;
  cuisine?: string;
  phoneNumber?: string;
  website?: string;
  photos?: string[];
  openingHours?: string[];
  reviews?: any[];
}
```

#### **Get Restaurant Details**
```typescript
import { getRestaurantDetails } from '@/lib/googlemaps';

const restaurant = await getRestaurantDetails(placeId: string);

// Returns detailed RestaurantLocation with full info
```

#### **Geocoding**
```typescript
import { geocodeAddress, reverseGeocode } from '@/lib/googlemaps';

// Address to coordinates
const coords = await geocodeAddress('123 Main St, New York, NY');
// Returns: { lat: number, lng: number } | null

// Coordinates to address
const address = await reverseGeocode(40.7831, -73.9712);
// Returns: string | null
```

#### **User Location**
```typescript
import { getCurrentLocation } from '@/lib/googlemaps';

const location = await getCurrentLocation();
// Returns: { lat: number, lng: number } | null
```

#### **Distance Calculation**
```typescript
import { calculateDistance } from '@/lib/googlemaps';

const result = await calculateDistance(
  { lat: 40.7831, lng: -73.9712 },  // origin
  { lat: 40.7589, lng: -73.9851 }   // destination
);

// Returns: { distance: string, duration: string } | null
// Example: { distance: "2.1 km", duration: "8 mins" }
```

#### **Autocomplete**
```typescript
import { initializeAutocomplete } from '@/lib/googlemaps';

const autocomplete = await initializeAutocomplete(
  inputElement,
  (place) => console.log('Selected:', place),
  { 
    types: ['restaurant'],
    componentRestrictions: { country: 'us' }
  }
);
```

### **React Hooks**

#### **useGoogleMaps Hook**
```typescript
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

const {
  map,                    // google.maps.Map | null
  isLoaded,              // boolean
  error,                 // string | null
  userLocation,          // { lat, lng } | null
  mapRef,                // RefObject<HTMLDivElement>
  searchRestaurants,     // Function
  centerOnLocation,      // Function
  centerOnUser          // Function
} = useGoogleMaps({
  center: { lat: 40.7831, lng: -73.9712 },
  zoom: 13,
  enableGeolocation: true
});
```

#### **useRestaurantSearch Hook**
```typescript
import { useRestaurantSearch } from '@/hooks/useGoogleMaps';

const {
  restaurants,           // RestaurantLocation[]
  isSearching,          // boolean
  error,                // string | null
  searchRestaurants,    // Function
  clearResults          // Function
} = useRestaurantSearch({
  autoSearch: true,
  location: { lat: 40.7831, lng: -73.9712 },
  radius: 1000,
  cuisine: 'italian'
});
```

### **Restaurant Map Utils**
```typescript
import { RestaurantMapUtils } from '@/lib/googlemaps';

// Find restaurants nearby
const nearby = await RestaurantMapUtils.findRestaurantsNearby(
  { lat: 40.7831, lng: -73.9712 },
  1000,  // radius in meters
  'pizza' // cuisine type
);

// Find restaurants along route
const alongRoute = await RestaurantMapUtils.findRestaurantsAlongRoute(
  { lat: 40.7831, lng: -73.9712 },  // origin
  { lat: 40.7589, lng: -73.9851 },  // destination
  5000  // max detour in meters
);

// Filter restaurants
const filtered = RestaurantMapUtils.filterRestaurants(restaurants, {
  minRating: 4.0,
  maxPriceLevel: 3,
  cuisine: 'italian',
  openNow: true
});
```

---

## 🤖 Google Gemini AI

### **Configuration**
```typescript
// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);
```

### **Core Functions**

#### **Basic Text Generation**
```typescript
import { generateText } from '@/lib/gemini';

const response = await generateText(
  'What makes a great Italian restaurant?'
);
```

#### **Streaming Text Generation**
```typescript
import { generateTextStream } from '@/lib/gemini';

for await (const chunk of generateTextStream(prompt)) {
  console.log(chunk); // Real-time text chunks
}
```

#### **Image Analysis (Gemini Pro Vision)**
```typescript
import { generateContentWithImage } from '@/lib/gemini';

const analysis = await generateContentWithImage(
  'Describe this restaurant dish',
  imageBase64Data,
  'image/jpeg'
);
```

### **Restaurant-Specific Functions**

#### **Restaurant Recommendations**
```typescript
import { generateRestaurantRecommendations } from '@/lib/gemini';

const recommendations = await generateRestaurantRecommendations(
  'I love spicy vegetarian food and cozy atmosphere',  // preferences
  'San Francisco'  // location (optional)
);

// Returns personalized restaurant suggestions with descriptions
```

#### **Menu Description Generation**
```typescript
import { generateMenuDescription } from '@/lib/gemini';

const description = await generateMenuDescription(
  'Truffle Risotto',                           // dish name
  ['arborio rice', 'truffle', 'parmesan'],    // ingredients
  'Italian'                                    // cuisine type
);

// Returns: "Creamy arborio rice slowly cooked with aromatic truffle..."
```

#### **Review Summary**
```typescript
import { generateReviewSummary } from '@/lib/gemini';

const reviews = [
  "Amazing pasta, great service!",
  "Food was good but loud atmosphere",
  "Perfect for date night, romantic setting"
];

const summary = await generateReviewSummary(reviews);

// Returns comprehensive analysis of sentiment and key points
```

### **Chat Functionality**
```typescript
import { GeminiChat } from '@/lib/gemini';

const chat = new GeminiChat();

// Send messages
const response1 = await chat.sendMessage(
  "What are the best Italian restaurants in NYC?"
);

const response2 = await chat.sendMessage(
  "Which one would be good for a romantic dinner?"
);

// Streaming chat
const stream = await chat.sendMessageStream(
  "Tell me more about the ambiance"
);
```

### **Error Handling**
```typescript
try {
  const result = await generateText(prompt);
} catch (error: any) {
  if (error.message.includes('API key')) {
    console.error('Invalid Gemini API key');
  } else if (error.message.includes('quota')) {
    console.error('API quota exceeded');
  } else {
    console.error('Gemini API error:', error.message);
  }
}
```

---

## 📸 Unsplash Images API

### **Configuration**
```typescript
// src/lib/unsplash.ts
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';
```

### **Core Functions**

#### **Search Images**
```typescript
import { searchUnsplashImages } from '@/lib/unsplash';

const images = await searchUnsplashImages(
  'restaurant interior',  // query
  10,                    // count
  'landscape'            // orientation (optional)
);

// Returns: UnsplashImage[]
interface UnsplashImage {
  id: string;
  urls: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
  };
  links: {
    html: string;
  };
}
```

#### **Get Random Image**
```typescript
import { getRandomUnsplashImage } from '@/lib/unsplash';

const image = await getRandomUnsplashImage(
  'fine dining restaurant'  // query
);
```

#### **Optimize Image URL**
```typescript
import { getOptimizedImageUrl } from '@/lib/unsplash';

const optimizedUrl = getOptimizedImageUrl(
  originalUrl,
  800,  // width
  600   // height
);
```

### **React Components**

#### **UnsplashBackground Component**
```tsx
import UnsplashBackground from '@/components/UnsplashBackground';

<UnsplashBackground
  query="restaurant interior elegant dining"
  className="w-full h-full"
  fallbackSrc="/restaurant-background.svg"
/>
```

#### **RestaurantImage Component**
```tsx
import RestaurantImage from '@/components/RestaurantImage';

<RestaurantImage
  query="italian restaurant pasta"
  index={0}
  className="w-full h-64 rounded-lg"
/>
```

### **Attribution Requirements**
```typescript
// Always include attribution for Unsplash images
const attribution = `Photo by ${image.user.name} on Unsplash`;

// Link back to photographer
<a href={image.user.links.html} target="_blank" rel="noopener">
  {attribution}
</a>
```

---

## 📊 Rate Limits & Quotas

### **Firebase**
- **Authentication**: 10,000 verifications/month (free)
- **Database**: 1GB storage, 10GB/month transfer (free)
- **Hosting**: 10GB storage, 360MB/day transfer (free)

### **Google Maps**
- **Free Tier**: $200/month credit (covers ~28,000 map loads)
- **Maps JavaScript API**: $7 per 1,000 loads
- **Places API**: $17 per 1,000 requests (Basic Data)
- **Geocoding API**: $5 per 1,000 requests

### **Google Gemini AI**
- **Free Tier**: 15 requests per minute, 1,500 requests per day
- **Rate Limits**: 60 requests per minute (paid tier)
- **Token Limits**: 30,720 input tokens, 2,048 output tokens

### **Unsplash**
- **Demo/Development**: 50 requests per hour
- **Production**: 5,000 requests per hour
- **Search**: No additional cost
- **Downloads**: Track for analytics

---

## 🚨 Error Handling

### **Global Error Types**
```typescript
interface APIError {
  code: string;
  message: string;
  service: 'firebase' | 'google-maps' | 'gemini' | 'unsplash';
}
```

### **Firebase Errors**
```typescript
const handleFirebaseError = (error: any): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No user found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Try again later';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection';
    default:
      return 'Authentication error occurred';
  }
};
```

### **Google Maps Errors**
```typescript
const handleMapsError = (status: string): string => {
  switch (status) {
    case 'ZERO_RESULTS':
      return 'No restaurants found in this area';
    case 'OVER_QUERY_LIMIT':
      return 'Search limit exceeded. Try again later';
    case 'REQUEST_DENIED':
      return 'Access denied. Check API key';
    case 'INVALID_REQUEST':
      return 'Invalid search parameters';
    default:
      return 'Maps service unavailable';
  }
};
```

### **Gemini AI Errors**
```typescript
const handleGeminiError = (error: any): string => {
  if (error.message.includes('API key')) {
    return 'AI service configuration error';
  } else if (error.message.includes('quota')) {
    return 'AI service limit reached';
  } else if (error.message.includes('safety')) {
    return 'Content blocked by safety filters';
  } else {
    return 'AI service temporarily unavailable';
  }
};
```

### **Unsplash Errors**
```typescript
const handleUnsplashError = (status: number): string => {
  switch (status) {
    case 401:
      return 'Invalid Unsplash API key';
    case 403:
      return 'Unsplash rate limit exceeded';
    case 404:
      return 'Images not found';
    case 500:
      return 'Unsplash service error';
    default:
      return 'Image service unavailable';
  }
};
```

---

## 🔧 Best Practices

### **API Key Security**
- Use environment variables for all API keys
- Never expose secret keys in client-side code
- Rotate API keys regularly
- Set up API key restrictions and quotas

### **Performance Optimization**
- Cache API responses when appropriate
- Use image optimization for Unsplash images
- Implement lazy loading for Maps components
- Debounce search inputs to reduce API calls

### **Error Recovery**
- Implement graceful fallbacks for all APIs
- Show user-friendly error messages
- Provide retry mechanisms for transient errors
- Log errors for debugging

### **Monitoring**
- Track API usage across all services
- Set up alerts for quota limits
- Monitor error rates and response times
- Use analytics to optimize API calls

---

## 📞 Support & Resources

### **Official Documentation**
- [Firebase Docs](https://firebase.google.com/docs)
- [Google Maps API](https://developers.google.com/maps/documentation)
- [Google AI Studio](https://ai.google.dev/docs)
- [Unsplash API](https://unsplash.com/documentation)

### **Status Pages**
- [Firebase Status](https://status.firebase.google.com/)
- [Google Cloud Status](https://status.cloud.google.com/)
- [Unsplash Status](https://status.unsplash.com/)

### **Community Support**
- [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)
- [Stack Overflow - Google Maps](https://stackoverflow.com/questions/tagged/google-maps)
- [Google AI Community](https://discuss.ai.google.dev/)

---

This documentation covers all API integrations in EATOPIA. For specific implementation details, refer to the source code in the respective utility files. 🍽️✨
