# 🍽️ EATOPIA - Vibe-Match Your Perfect Dining 

**EATOPIA** is a web experience designed to bridge the gap between social dynamics and dining discovery. Instead of one-size-fits-all results, EATOPIA curates restaurant recommendations based on group type (Solo, Couple, Friends, Family), vibe (Chill, Romantic, Loud AF), and real-time factors like crowd status or live music. It empowers users to vibe-match their evenings, not just search for food.

![EATOPIA Banner](https://img.shields.io/badge/EATOPIA-Vibe--Match%20Your%20Dining-red?style=for-the-badge)

## 🎯 The Problem We Solve

Most food discovery apps are stuck in a loop. You search by cuisine or location, skim through ratings, and hope for the best. But what works for a romantic date rarely suits a late-night hangout with friends, and the "top-rated" café might kill the vibe if you're just trying to read in peace.

**EATOPIA** puts vibe, group, and situation at the core of discovery, with smart suggestions, clear booking info, and even a social twist for those open to connecting.

## ✨ Key Features

### 🎭 **Vibe-Based Matching**
- **Chill** 😌 - Relaxed, quiet, perfect for conversation
- **Romantic** 💕 - Intimate ambiance with soft lighting
- **Energetic** 🎉 - Lively atmosphere with great energy
- **Loud AF** 🔥 - High energy, music, party vibes
- **Upscale** ✨ - Fine dining, sophisticated atmosphere
- **Casual** 👕 - Comfortable, no-fuss dining

### 👥 **Group-Aware Recommendations**
- **Solo** 🧑‍🍳 - Perfect for solo dining exploration
- **Couple** 💑 - Romantic spots for two
- **Friends** 👥 - Great for group hangouts
- **Family** 👨‍👩‍👧‍👦 - Family-friendly gatherings

### 🚀 **Smart Experience Creation**
4-step guided experience creation:
1. **Location Selection** - Where are you dining?
2. **Date & Time** - When do you want to dine?
3. **Group Type** - Who's joining you?
4. **Vibe Selection** - What's the mood?

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework

### **Backend & APIs**
- **Firebase** - Authentication and database
- **Google Maps API** - Location services and restaurant discovery
- **Google Places API** - Restaurant details and reviews
- **Gemini AI** - Smart restaurant recommendations
- **Pixabay API** - High-quality restaurant imagery

### **Development Tools**
- **ESLint** - Code linting
- **Vite** - Fast development server
- **PostCSS** - CSS processing

## 📦 NPM Packages

### **Core Dependencies**
```json
{
  "next": "15.1.3",
  "react": "19.0.0", 
  "react-dom": "19.0.0",
  "typescript": "^5",
  "@types/node": "^22",
  "@types/react": "^19",
  "@types/react-dom": "^19"
}
```

### **Styling**
```json
{
  "tailwindcss": "^3.4.1",
  "postcss": "^8",
  "autoprefixer": "^10.0.1"
}
```

### **API Integrations**
```json
{
  "@googlemaps/js-api-loader": "^1.16.8",
  "@types/google.maps": "^3.58.1",
  "@google/generative-ai": "^0.21.0",
  "firebase": "^10.0.0"
}
```

### **Development Dependencies**
```json
{
  "eslint": "^8",
  "eslint-config-next": "15.1.3",
  "@next/eslint-config-typescript": "^15.1.3"
}
```

## 🔑 API Configuration

### **Required API Keys**

#### 🔥 **Firebase (Authentication & Database)**
```env
# Firebase Configuration (Already configured)
FIREBASE_API_KEY=AIzaSyAe9O00Ttk8eo8rnOaTY_wQRRyTgsIWY6I
FIREBASE_AUTH_DOMAIN=eatopia-723d1.firebaseapp.com
FIREBASE_DATABASE_URL=https://eatopia-723d1-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=eatopia-723d1
FIREBASE_STORAGE_BUCKET=eatopia-723d1.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=746181935140
FIREBASE_APP_ID=1:746181935140:web:4046aedebfbe4df5f718b1
FIREBASE_MEASUREMENT_ID=G-DSHK81TFHE
```

#### 🗺️ **Google Maps & Places API**
```env
# Google Maps API (Configured)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCh5ZZkKXaxSlSobJhVkg0LtBwD8pI2zU8
```

**Enabled APIs:**
- Maps JavaScript API
- Places API (New)
- Geocoding API
- Distance Matrix API

#### 🤖 **Google Gemini AI**
```env
# Gemini AI (Configured)
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyAMTQf1OSy_e2yht9nrC5Gx2EAiTK-Iph8
```

#### 📸 **Pixabay API**
```env
# Pixabay Images (Configured)
NEXT_PUBLIC_PIXABAY_API_KEY=51965370-053d95701ced2fd4dfc5af273
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd my-react-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your API keys to `.env.local`:
```env
# All API keys are already configured - see API Configuration section above
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_PIXABAY_API_KEY=your_pixabay_key

# Firebase config
FIREBASE_API_KEY=your_firebase_key
# ... (see Firebase section above)
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage with EATOPIA branding
│   ├── layout.tsx               # Root layout with AuthProvider
│   ├── create-experience/       # Experience creation flow
│   │   └── page.tsx
│   ├── my-experiences/          # User dashboard
│   │   └── page.tsx
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── Header.tsx               # Navigation with EATOPIA branding
│   ├── SearchForm.tsx           # Quick search + CTA
│   ├── CreateDiningExperience.tsx  # 4-step experience flow
│   ├── MyDiningExperiences.tsx  # User dashboard
│   ├── GoogleMapComponent.tsx   # Maps integration
│   ├── PixabayBackground.tsx    # Image components
│   ├── LoginModal.tsx           # Authentication modals
│   ├── SignupModal.tsx
│   └── ClientLayout.tsx         # Client-side layout wrapper
├── lib/                         # Utility libraries
│   ├── firebase.ts              # Firebase configuration
│   ├── googlemaps.ts            # Google Maps utilities
│   ├── gemini.ts                # Gemini AI utilities
│   └── pixabay.ts               # Pixabay API utilities
├── hooks/                       # React hooks
│   └── useGoogleMaps.ts         # Maps and location hooks
├── contexts/                    # React contexts
│   └── AuthContext.tsx          # Authentication context
└── types/                       # TypeScript definitions
    └── google-maps.d.ts         # Google Maps type extensions
```

## 🎨 Key Components

### **CreateDiningExperience**
4-step guided experience creation:
- Step 1: Location selection with search
- Step 2: Date and time picker
- Step 3: Group type selection (Solo, Couple, Friends, Family)
- Step 4: Vibe selection (Chill, Romantic, Energetic, etc.)

### **MyDiningExperiences** 
User dashboard showing:
- Past and upcoming dining experiences
- Experience status tracking
- Quick action buttons for common scenarios

### **GoogleMapComponent**
Interactive maps with:
- Restaurant markers with details
- User location detection
- Search functionality
- Restaurant filtering

## 🔧 API Integrations

### **Google Maps Integration**
```typescript
// Find restaurants near location
const restaurants = await searchRestaurants({
  location: { lat: 40.7831, lng: -73.9712 },
  radius: 1000,
  keyword: 'italian cuisine',
  type: 'restaurant'
});

// Get user location
const userLocation = await getCurrentLocation();
```

### **Gemini AI Integration**
```typescript
// Generate restaurant recommendations
const recommendations = await generateRestaurantRecommendations(
  'I love spicy vegetarian food with cozy atmosphere',
  'San Francisco'
);

// Create menu descriptions
const description = await generateMenuDescription(
  'Truffle Pasta',
  ['truffle', 'pasta', 'parmesan'],
  'Italian'
);
```

### **Firebase Authentication**
```typescript
// User signup/login
const { signup, login, logout, user } = useAuth();

// Create account
await signup(email, password, displayName);

// Sign in
await login(email, password);
```

### **Pixabay Images**
```typescript
// Get restaurant images
const images = await searchPixabayImages('restaurant interior', 1, 10);

// Get random image
const randomImage = await getRandomPixabayImage('elegant dining');

// Optimized image URLs
const optimizedUrl = getOptimizedPixabayImageUrl(image, 800);
```

## 🌟 Features Overview

### **Vibe-Based Restaurant Discovery**
- Context-aware recommendations based on group dynamics
- Mood and atmosphere matching
- Real-time factors consideration

### **Smart Experience Creation**
- Guided 4-step process
- Location autocomplete with Google Places
- Date/time selection with smart defaults
- Group type awareness for recommendations

### **Social Context Integration**
- Solo dining spots with good ambiance
- Romantic locations for couples
- Group-friendly venues for friends
- Family-appropriate restaurants

### **AI-Powered Recommendations**
- Gemini AI for intelligent suggestions
- Natural language preference processing
- Menu description generation
- Review sentiment analysis

## 🔒 Authentication & Security

- **Firebase Authentication** for secure user management
- **Environment variables** for API key security
- **Client-side route protection** for authenticated features
- **Secure API key handling** with Next.js environment system

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Touch-friendly interfaces** for mobile interaction
- **Progressive Web App** capabilities
- **Cross-browser compatibility**

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### **Environment Variables for Production**
Make sure to set all environment variables in your deployment platform:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_GEMINI_API_KEY`
- `NEXT_PUBLIC_PIXABAY_API_KEY`
- All Firebase configuration variables

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Google** for Maps, Places, and Gemini AI APIs
- **Firebase** for authentication and backend services
- **Pixabay** for beautiful restaurant imagery
- **Vercel** for seamless deployment
- **Tailwind CSS** for rapid UI development

## 📞 Support

For support, email support@eatopia.com or join our Slack channel.

---

**Built with ❤️ for food lovers who understand that dining is about more than just food—it's about the perfect match of mood, company, and atmosphere.**

## 🎯 What Makes EATOPIA Different

EATOPIA isn't just another restaurant finder. It's your **digital friend with taste** that understands:

- **Context matters** - Solo lunch vs romantic dinner require different vibes
- **Group dynamics** - What works for friends doesn't work for family
- **Mood matching** - Sometimes you want loud and energetic, sometimes chill and quiet
- **Real-time factors** - Date, time, and location all influence the perfect choice

**It's not just food discovery—it's experience curation.** 🍽️✨