'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { searchUnsplashImages, UnsplashImage, getOptimizedImageUrl } from '@/lib/unsplash';

interface PropertyImageProps {
  query: string;
  width: number;
  height: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function PropertyImage({ 
  query, 
  width, 
  height, 
  className = '', 
  alt = 'Property image',
  priority = false 
}: PropertyImageProps) {
  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      try {
        setLoading(true);
        setError(false);
        const images = await searchUnsplashImages(query, 1, 1);
        if (images.length > 0) {
          setImage(images[0]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch property image:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [query]);

  if (loading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className={`${className} bg-gray-300 flex items-center justify-center`}>
        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={getOptimizedImageUrl(image, width, height)}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
