'use client';

import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function SimpleMouseTracker() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed w-4 h-4 bg-orange-500 dark:bg-orange-400 rounded-full pointer-events-none z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-60' : 'opacity-0'
      }`}
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  );
}
