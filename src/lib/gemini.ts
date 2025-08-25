import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Gemini API key not found. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Get the Gemini Pro model
export const getGeminiModel = (modelName: string = 'gemini-pro') => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized. Please check your API key.');
  }
  return genAI.getGenerativeModel({ model: modelName });
};

// Generate text using Gemini
export async function generateText(prompt: string, modelName: string = 'gemini-pro'): Promise<string> {
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
export async function* generateTextStream(prompt: string, modelName: string = 'gemini-pro') {
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

  constructor(modelName: string = 'gemini-pro') {
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

// Restaurant recommendation generator
export async function generateRestaurantRecommendations(
  userPreferences: string,
  location?: string
): Promise<string> {
  const prompt = `You are a helpful restaurant recommendation assistant. Based on the following user preferences${location ? ` in ${location}` : ''}, provide personalized restaurant recommendations:

User preferences: ${userPreferences}

Please provide:
1. 3-5 restaurant recommendations
2. Brief description of each restaurant's cuisine and atmosphere
3. Why each recommendation matches the user's preferences
4. Estimated price range ($ to $$$$)

Format the response in a friendly, conversational tone.`;

  return generateText(prompt);
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
};
