'use client';

import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Floating elements that follow mouse */}
      <div
        className="absolute w-96 h-96 bg-orange-500/3 dark:bg-orange-400/2 rounded-full blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      <div
        className="absolute w-64 h-64 bg-orange-500/2 dark:bg-orange-400/1 rounded-full blur-2xl transition-all duration-1500 ease-out"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          transform: 'translate3d(0, 0, 0)',
        }}
      />
    </div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function FloatingElement({ children, className = '', speed = 0.1 }: FloatingElementProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`transition-transform duration-1000 ease-out ${className}`}
      style={{
        transform: `translate(${mousePosition.x * speed}px, ${mousePosition.y * speed}px)`,
      }}
    >
      {children}
    </div>
  );
}
