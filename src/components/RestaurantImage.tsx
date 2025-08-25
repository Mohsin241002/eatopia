'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { searchUnsplashImages, UnsplashImage, getOptimizedImageUrl } from '@/lib/unsplash';

interface RestaurantImageProps {
  query?: string;
  width: number;
  height: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  index?: number; // To get different images from the same search
}

export default function RestaurantImage({ 
  query = 'restaurant food dining', 
  width, 
  height, 
  className = '', 
  alt = 'Restaurant image',
  priority = false,
  index = 0
}: RestaurantImageProps) {
  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      try {
        setLoading(true);
        setError(false);
        
        // Check if API key is available
        if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
          console.warn('Unsplash API key not configured, using fallback');
          setError(true);
          return;
        }

        console.log('Fetching restaurant images from Unsplash:', query);
        // Fetch multiple images and select by index
        const images = await searchUnsplashImages(query, 1, Math.max(10, index + 1));
        if (images.length > index) {
          setImage(images[index]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch restaurant image:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [query, index]);

  if (loading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center rounded-lg`} style={{width, height}}>
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className={`${className} bg-orange-100 flex items-center justify-center rounded-lg border-2 border-orange-200`} style={{width, height}}>
        <div className="text-center p-4">
          <svg className="w-8 h-8 text-orange-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <p className="text-sm text-orange-600 font-medium">Restaurant Image</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden rounded-lg`}>
      <Image
        src={getOptimizedImageUrl(image, width, height)}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        priority={priority}
      />
      {/* Optional attribution overlay for individual images */}
      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity">
        <a
          href={`https://unsplash.com/@${image.user.username}?utm_source=restaurant_app&utm_medium=referral`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {image.user.name}
        </a>
      </div>
    </div>
  );
}
