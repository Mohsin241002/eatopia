'use client';

import { useEffect, useRef, useState } from 'react';
import { PixabayBackground } from './PixabayBackground';

interface ParallaxSectionProps {
  children: React.ReactNode;
  pixabayQuery?: string;
  speed?: number;
  className?: string;
  overlay?: 'light' | 'dark' | 'black' | 'none';
}

export function ParallaxSection({ 
  children, 
  pixabayQuery, 
  speed = 0.5, 
  className = '',
  overlay = 'dark'
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const parallax = scrolled * speed;
        setOffsetY(parallax);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const overlayClass = {
    light: 'bg-white/95',
    dark: 'bg-gradient-to-b from-black/15 via-black/10 to-black/15',
    black: 'bg-gradient-to-b from-black/60 via-black/50 to-black/60',
    none: ''
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {pixabayQuery && (
        <div 
          className="absolute inset-0 -z-10"
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          <PixabayBackground 
            query={pixabayQuery}
            className="scale-110"
          />
        </div>
      )}
      
      {overlay !== 'none' && (
        <div className={`absolute inset-0 z-0 ${overlayClass[overlay]}`} />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
