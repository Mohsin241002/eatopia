'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.svg"
                alt="Eatopia"
                width={120}
                height={40}
                className="text-black dark:text-white dark:filter dark:brightness-0 dark:invert"
                priority
              />
            </Link>
          </div>

          {/* Right side - Auth and Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Authenticated user menu
              <div className="flex items-center space-x-6">
                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-6">
                  <Link 
                    href="/dashboard" 
                    className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-riveta-medium transition-colors"
                  >
                    My Experiences
                  </Link>
                  <Link 
                    href="/create-experience" 
                    className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-riveta-medium transition-colors"
                  >
                    Create
                  </Link>
                  <Link 
                    href="/" 
                    className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-riveta-medium transition-colors"
                  >
                    Discover
                  </Link>
                </nav>
                
                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block">
                    <span className="text-black/80 dark:text-white/80 font-riveta text-sm">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white font-riveta transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              // Guest user buttons
              <div className="flex items-center space-x-4">
                <Link 
                  href="/contact"
                  className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-riveta-medium transition-colors"
                >
                  Contact
                </Link>
                <Link 
                  href="/about"
                  className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-riveta-medium transition-colors"
                >
                  About Us
                </Link>
                <Link 
                  href="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-riveta-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
