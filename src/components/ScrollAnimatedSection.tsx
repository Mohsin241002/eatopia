'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn';
  delay?: number;
  threshold?: number;
}

export function ScrollAnimatedSection({ 
  children, 
  className = '',
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1
}: ScrollAnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const animationClasses = {
    fadeIn: `transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`,
    slideUp: `transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    }`,
    slideInLeft: `transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
    }`,
    slideInRight: `transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
    }`,
    zoomIn: `transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`
  };

  return (
    <div ref={ref} className={`${animationClasses[animation]} ${className}`}>
      {children}
    </div>
  );
}
