'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getRandomPixabayImage, PixabayImage, getOptimizedPixabayImageUrl, getPixabayImageAlt } from '@/lib/pixabay';

interface PixabayBackgroundProps {
  query?: string;
  className?: string;
  fallbackSrc?: string;
}

export function PixabayBackground({ 
  query = 'restaurant elegant minimalist', 
  className = '', 
  fallbackSrc = '/restaurant-background.svg' 
}: PixabayBackgroundProps) {
  const [image, setImage] = useState<PixabayImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      try {
        setLoading(true);
        setError(false);
        
        // Check if API key is available
        if (!process.env.NEXT_PUBLIC_PIXABAY_API_KEY) {
          console.warn('Pixabay API key not configured, using fallback image');
          setError(true);
          return;
        }

        console.log('Fetching image from Pixabay:', query);
        const randomImage = await getRandomPixabayImage(query);
        if (randomImage) {
          setImage(randomImage);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch Pixabay image:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [query]);

  // Show subtle pattern background while loading or on error
  if (loading || error || !image) {
    return (
      <div className={`fixed inset-0 -z-10 ${className}`}>
        {/* Very minimal background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.01' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '40px 40px'
             }} 
        />
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Very subtle overlay to create minimal effect */}
      <div className="absolute inset-0 bg-white/98 dark:bg-gray-900/98 z-10" />
      <Image
        src={getOptimizedPixabayImageUrl(image, 1400)}
        alt={getPixabayImageAlt(image)}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
    </div>
  );
}

export default PixabayBackground;
