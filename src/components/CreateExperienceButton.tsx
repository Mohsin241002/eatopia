'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CreateExperienceButton() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    
    if (!user) {
      // User is not logged in, redirect to login
      router.push('/login');
    } else {
      // User is logged in, redirect to main page
      router.push('/main');
    }
  };

  if (loading) {
    return (
      <button 
        disabled
        className="bg-gray-400 cursor-not-allowed text-white font-roboto px-8 py-4 rounded-full text-lg shadow-lg"
      >
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick}
      disabled={isClicked}
      className={`font-roboto px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
        isClicked 
          ? 'bg-gray-400 cursor-not-allowed text-white' 
          : 'bg-orange-500 hover:bg-orange-600 text-white'
      }`}
    >
      <span className="transition-all duration-300">
        {isClicked ? 'Redirecting...' : 'Create Your Experience'}
      </span>
    </button>
  );
}