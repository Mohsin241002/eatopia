// Pixabay API utility functions

export interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  fullHDURL?: string;
  views: number;
  downloads: number;
  likes: number;
  tags: string;
  user: string;
  userImageURL: string;
  webformatWidth: number;
  webformatHeight: number;
  imageWidth: number;
  imageHeight: number;
  previewURL: string;
}

const PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
const PIXABAY_API_URL = 'https://pixabay.com/api/';

export async function searchPixabayImages(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<PixabayImage[]> {
  if (!PIXABAY_API_KEY) {
    console.warn('Pixabay API key is not configured');
    return [];
  }

  try {
    const params = new URLSearchParams({
      key: PIXABAY_API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      category: 'food',
      min_width: '1920',
      min_height: '1080',
      safesearch: 'true',
      page: page.toString(),
      per_page: perPage.toString(),
    });

    const response = await fetch(`${PIXABAY_API_URL}?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Pixabay search API error:', response.status, errorData);
      throw new Error(`Pixabay API error: ${response.status}`);
    }

    const data = await response.json();
    return data.hits || [];
  } catch (error) {
    console.error('Error fetching images from Pixabay:', error);
    return [];
  }
}

export async function getRandomPixabayImage(query: string): Promise<PixabayImage | null> {
  if (!PIXABAY_API_KEY) {
    console.warn('Pixabay API key is not configured');
    return null;
  }

  try {
    // Get first 20 results and pick a random one
    const images = await searchPixabayImages(query, 1, 20);
    
    if (images.length === 0) {
      console.warn(`No images found for query: ${query}`);
      return null;
    }

    // Return a random image from the results
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  } catch (error) {
    console.error('Error fetching random image from Pixabay:', error);
    return null;
  }
}

export function getOptimizedPixabayImageUrl(image: PixabayImage, width?: number, height?: number): string {
  // Pixabay provides different sized URLs
  // Use fullHDURL for highest quality, fall back to largeImageURL, then webformatURL
  if (width && width > 1920 && image.fullHDURL) {
    return image.fullHDURL;
  } else if (width && width > 640) {
    return image.largeImageURL;
  } else {
    return image.webformatURL;
  }
}

export function getPixabayImageAlt(image: PixabayImage): string {
  return image.tags.split(',').slice(0, 3).join(', ') || 'Restaurant image';
}

