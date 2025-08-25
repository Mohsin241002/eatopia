'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getRandomUnsplashImage, UnsplashImage, getOptimizedImageUrl } from '@/lib/unsplash';

interface UnsplashBackgroundProps {
  query: string;
  className?: string;
  fallbackSrc?: string;
}

export default function UnsplashBackground({ 
  query, 
  className = '', 
  fallbackSrc = '/landscape.svg' 
}: UnsplashBackgroundProps) {
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
          console.warn('Unsplash API key not configured, using fallback image');
          setError(true);
          return;
        }

        console.log('Fetching image from Unsplash:', query);
        const randomImage = await getRandomUnsplashImage(query);
        if (randomImage) {
          setImage(randomImage);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch Unsplash image:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [query]);

  // Show fallback image while loading or on error
  if (loading || error || !image) {
    return (
      <div className={className}>
        <Image
          src={fallbackSrc}
          alt="Restaurant background"
          fill
          className="object-cover object-bottom"
          priority
        />
        {loading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={getOptimizedImageUrl(image, 1400, 400)}
        alt={image.alt_description || image.description || 'Restaurant interior'}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Attribution overlay */}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        Photo by{' '}
        <a
          href={`https://unsplash.com/@${image.user.username}?utm_source=landed_houses&utm_medium=referral`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          {image.user.name}
        </a>
        {' '}on{' '}
        <a
          href="https://unsplash.com/?utm_source=landed_houses&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          Unsplash
        </a>
      </div>
    </div>
  );
}
