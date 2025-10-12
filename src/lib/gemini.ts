import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchRestaurants, geocodeAddress } from './googlemaps';

// Types for dining preferences
export interface DiningPreferences {
  guests: number;
  vibe: string;
  occasion: string;
  userId?: string;
  timestamp?: string;
  location?: string;
}

export interface RestaurantRecommendation {
  name: string;
  cuisine: string;
  priceRange: string;
  atmosphere: string;
  specialFeatures?: string[];
  specialties?: string;
  location?: string;
  rating: number;
  description: string;
}

// Initialize Gemini AI
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Gemini API key not found. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Get the Gemini Pro model
export const getGeminiModel = (modelName: string = 'gemini-1.5-flash') => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized. Please check your API key.');
  }
  return genAI.getGenerativeModel({ model: modelName });
};

// Generate text using Gemini
export async function generateText(prompt: string, modelName: string = 'gemini-1.5-flash'): Promise<string> {
  try {
    if (!genAI) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    const model = getGeminiModel(modelName);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating text with Gemini:', error);
    throw error;
  }
}

// Generate text stream using Gemini (for real-time responses)
export async function* generateTextStream(prompt: string, modelName: string = 'gemini-1.5-flash') {
  try {
    if (!genAI) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    const model = getGeminiModel(modelName);
    const result = await model.generateContentStream(prompt);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      yield chunkText;
    }
  } catch (error) {
    console.error('Error generating text stream with Gemini:', error);
    throw error;
  }
}

// Generate content with image input (Gemini Pro Vision)
export async function generateContentWithImage(
  prompt: string, 
  imageData: string, 
  mimeType: string = 'image/jpeg'
): Promise<string> {
  try {
    if (!genAI) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    const model = getGeminiModel('gemini-pro-vision');
    const imagePart = {
      inlineData: {
        data: imageData.split(',')[1], // Remove data:image/jpeg;base64, prefix
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content with image:', error);
    throw error;
  }
}

// Chat functionality
export class GeminiChat {
  private chat: any;
  private model: any;

  constructor(modelName: string = 'gemini-1.5-flash') {
    if (!genAI) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }
    this.model = getGeminiModel(modelName);
    this.chat = this.model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  }

  async sendMessageStream(message: string) {
    try {
      const result = await this.chat.sendMessageStream(message);
      return result.stream;
    } catch (error) {
      console.error('Error sending chat message stream:', error);
      throw error;
    }
  }
}

// Utility functions for common use cases

// Enhanced restaurant recommendation generator with real Google Places data
export async function generateRestaurantRecommendations(preferences: DiningPreferences): Promise<RestaurantRecommendation[]> {
  const { location, guests, vibe, occasion } = preferences;
  
  try {
    // First, try to get real restaurant data from Google Places if we have location
    let realRestaurants: any[] = [];
    if (location) {
      // Try to geocode the location to get coordinates
      const coords = await geocodeAddress(location);
      if (coords) {
        console.log('Found coordinates for location:', coords);
        
        // Search for restaurants in the area
        const nearbyRestaurants = await searchRestaurants({
          location: coords,
          radius: 5000, // 5km radius
          type: 'restaurant',
          minRating: 3.5,
          maxResults: 20
        });
        
        realRestaurants = nearbyRestaurants;
        console.log(`Found ${nearbyRestaurants.length} real restaurants`);
      }
    }

    // If we have real restaurants, enhance them with AI-generated descriptions
    if (realRestaurants.length > 0) {
      return await enhanceRealRestaurants(realRestaurants, preferences);
    }
    
    // Fallback to AI-generated restaurants
    return await generateAIRestaurants(preferences);
    
  } catch (error) {
    console.error('Error in enhanced restaurant recommendations:', error);
    return getFallbackRecommendations(preferences);
  }
}

// Function to enhance real restaurant data with AI descriptions
async function enhanceRealRestaurants(restaurants: any[], preferences: DiningPreferences): Promise<RestaurantRecommendation[]> {
  const { location, guests, vibe, occasion } = preferences;
  
  // Filter restaurants based on preferences
  const filteredRestaurants = restaurants
    .filter(restaurant => restaurant.rating >= 3.5)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8); // Get top 8 to select 5 from
  
  // Generate AI descriptions for these real restaurants
  const prompt = `You are a restaurant recommendation expert. I have a list of REAL restaurants from Google Places. Please analyze them and select the 5 BEST matches for these preferences:

Location: ${location}
Guests: ${guests}
Vibe: ${vibe} 
Occasion: ${occasion}

Real Restaurants:
${filteredRestaurants.map((r, i) => `${i + 1}. ${r.name} - Rating: ${r.rating}, Address: ${r.address}`).join('\n')}

For each of the 5 BEST matches, provide enhanced information in this JSON format:
[
  {
    "name": "Exact restaurant name from the list",
    "cuisine": "Cuisine type (infer from name/context)",
    "priceRange": "$ or $$ or $$$ or $$$$",
    "atmosphere": "Atmosphere description matching the ${vibe} vibe",
    "location": "Neighborhood or area description", 
    "specialties": "Likely signature dishes or specialties",
    "rating": actual_rating_number,
    "description": "2-3 sentence description explaining why this restaurant matches the ${occasion} occasion for ${guests} people seeking a ${vibe} atmosphere"
  }
]

Choose restaurants that best match the requested vibe and occasion. Vary the cuisine types and price points for diversity.`;

  try {
    const response = await generateText(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const enhanced = JSON.parse(jsonMatch[0]);
      return enhanced.slice(0, 5); // Ensure exactly 5 recommendations
    }
  } catch (error) {
    console.error('Error enhancing real restaurants:', error);
  }
  
  // Fallback: manually enhance the restaurants
  return filteredRestaurants.slice(0, 5).map(restaurant => ({
    name: restaurant.name,
    cuisine: 'International', // Default since we don't have this from Places API
    priceRange: getPriceRange(restaurant.priceLevel),
    atmosphere: getAtmosphereForVibe(vibe),
    location: restaurant.address,
    specialties: 'Popular local dishes',
    rating: restaurant.rating || 4.0,
    description: `A highly-rated restaurant perfect for ${occasion} with ${guests} ${guests === 1 ? 'person' : 'people'}.`
  }));
}

// Function to generate AI restaurants when no real data is available
async function generateAIRestaurants(preferences: DiningPreferences): Promise<RestaurantRecommendation[]> {
  const { location, guests, vibe, occasion } = preferences;
  const locationText = location ? `in or near ${location}` : 'in your area';
  
  const prompt = `As a restaurant recommendation expert, suggest 5 restaurants ${locationText} based on these preferences:
- Location: ${location || 'Not specified'}
- Number of guests: ${guests}
- Desired vibe: ${vibe}
- Occasion: ${occasion}

For each restaurant, provide:
1. Name (realistic for the location)
2. Cuisine type
3. Price range ($, $$, $$$, $$$$)
4. Atmosphere description
5. Location/neighborhood
6. Specialties
7. Rating (4.0-5.0)
8. Brief description

Format as JSON array with the structure used above.

Make recommendations diverse while matching the ${vibe} vibe for ${occasion} with ${guests} people.`;

  try {
    const response = await generateText(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error generating AI restaurants:', error);
  }
  
  return getFallbackRecommendations(preferences);
}

// Helper functions
function getPriceRange(priceLevel?: number): string {
  if (!priceLevel) return '$$';
  switch (priceLevel) {
    case 1: return '$';
    case 2: return '$$';
    case 3: return '$$$';
    case 4: return '$$$$';
    default: return '$$';
  }
}

function getAtmosphereForVibe(vibe: string): string {
  switch (vibe.toLowerCase()) {
    case 'casual': return 'Relaxed and comfortable atmosphere';
    case 'romantic': return 'Intimate and cozy ambiance';
    case 'luxury': return 'Elegant and upscale environment';
    case 'family': return 'Warm and family-friendly setting';
    default: return 'Pleasant dining atmosphere';
  }
}

// Menu item descriptions generator
export async function generateMenuDescription(
  dishName: string,
  ingredients: string[],
  cuisineType: string
): Promise<string> {
  const prompt = `Create an appealing menu description for a ${cuisineType} dish called "${dishName}" with the following ingredients: ${ingredients.join(', ')}.

The description should be:
- Appetizing and mouth-watering
- Professional but not overly formal
- About 2-3 sentences long
- Highlight key flavors and cooking methods

Example format: "Tender grilled salmon glazed with honey-soy reduction, served over fragrant jasmine rice with crisp seasonal vegetables and finished with toasted sesame seeds and fresh herbs."`;

  return generateText(prompt);
}

// Store user dining preferences (could be extended to use database in future)
const userPreferences = new Map<string, DiningPreferences>();

export function storeDiningPreferences(preferences: DiningPreferences): string {
  const preferenceId = `pref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const enrichedPreferences = {
    ...preferences,
    timestamp: new Date().toISOString(),
  };
  
  userPreferences.set(preferenceId, enrichedPreferences);
  console.log('Stored dining preferences:', enrichedPreferences);
  return preferenceId;
}

export function getDiningPreferences(preferenceId: string): DiningPreferences | null {
  return userPreferences.get(preferenceId) || null;
}

// Store recommendations in memory (could be extended to use database in future)
const userRecommendations = new Map<string, RestaurantRecommendation[]>();

export function storeRecommendations(userId: string, recommendations: RestaurantRecommendation[]): void {
  userRecommendations.set(userId, recommendations);
  console.log('Stored recommendations for user:', userId);
}

export function getStoredRecommendations(userId: string): RestaurantRecommendation[] | null {
  return userRecommendations.get(userId) || null;
}

function getFallbackRecommendations(preferences: DiningPreferences): RestaurantRecommendation[] {
  return [
    {
      name: "The Garden Bistro",
      cuisine: "Modern American",
      priceRange: "$$",
      atmosphere: "Cozy and welcoming with garden views",
      location: "Downtown District",
      specialties: "Farm-to-table cuisine, craft cocktails",
      specialFeatures: ["Farm-to-table ingredients", "Outdoor seating", "Craft cocktails"],
      rating: 4.3,
      description: "A charming bistro offering fresh, locally-sourced dishes in a relaxed garden setting perfect for any occasion."
    },
    {
      name: "Spice Route",
      cuisine: "Indian",
      priceRange: "$",
      atmosphere: "Vibrant and colorful with traditional decor",
      location: "Cultural Quarter",
      specialties: "Authentic curries, tandoor specialties",
      specialFeatures: ["Authentic spices", "Vegetarian options", "Family-friendly"],
      rating: 4.5,
      description: "Authentic Indian cuisine with bold flavors and generous portions in a warm, family-friendly environment."
    },
    {
      name: "Bella Vista",
      cuisine: "Italian",
      priceRange: "$$$",
      atmosphere: "Elegant and romantic with city views",
      location: "Hillside Heights",
      specialties: "Handmade pasta, wood-fired pizza",
      rating: 4.7,
      description: "Upscale Italian dining with stunning city views and authentic recipes passed down through generations."
    }
  ];
}

// Restaurant review summary generator
export async function generateReviewSummary(reviews: string[]): Promise<string> {
  const prompt = `Analyze the following restaurant reviews and create a comprehensive summary highlighting:
1. Overall sentiment
2. Most mentioned positives
3. Common concerns or negatives
4. Food quality and service feedback
5. Atmosphere and ambiance notes

Reviews:
${reviews.map((review, index) => `Review ${index + 1}: ${review}`).join('\n\n')}

Provide a balanced, objective summary that would help potential customers make an informed decision.`;

  return generateText(prompt);
}

export default {
  generateText,
  generateTextStream,
  generateContentWithImage,
  GeminiChat,
  generateRestaurantRecommendations,
  generateMenuDescription,
  generateReviewSummary,
  storeDiningPreferences,
  getDiningPreferences,
  storeRecommendations,
  getStoredRecommendations,
};
