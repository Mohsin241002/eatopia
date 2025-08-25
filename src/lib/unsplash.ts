// Unsplash API utility functions

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
  };
  width: number;
  height: number;
}

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export async function searchUnsplashImages(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashImage[]> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('Unsplash access key is not configured');
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Unsplash search API error:', response.status, errorData);
      throw new Error(`Unsplash API error: ${response.status} - ${errorData.errors ? errorData.errors.join(', ') : 'Unknown error'}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
}

export async function getRandomUnsplashImage(query: string): Promise<UnsplashImage | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('Unsplash access key is not configured');
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Unsplash random API error:', response.status, errorData);
      throw new Error(`Unsplash API error: ${response.status} - ${errorData.errors ? errorData.errors.join(', ') : 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random image from Unsplash:', error);
    return null;
  }
}

export function getOptimizedImageUrl(image: UnsplashImage, width: number, height?: number): string {
  const params = new URLSearchParams({
    w: width.toString(),
    ...(height && { h: height.toString() }),
    fit: 'crop',
    crop: 'center',
  });
  
  return `${image.urls.raw}&${params.toString()}`;
}
