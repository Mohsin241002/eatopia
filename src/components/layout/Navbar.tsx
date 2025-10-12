'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, MenuItem } from '@/components/ui/navbar-menu';
import { SimpleAvatar } from '@/components/ui/SimpleAvatar';

export default function Header() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActive("profile");
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(null);
    }, 150); // 150ms delay before closing
  };

  return (
    <header className="bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image
                src="/icons/logo.svg"
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
              // Authenticated user menu with profile dropdown
              <div className="flex items-center space-x-6">
                {/* Discover Link */}
                <Link 
                  href="/" 
                  className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-roboto transition-colors"
                >
                  Discover
                </Link>

                {/* My Reservations Link */}
                <Link 
                  href="/dashboard"
                  className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-roboto transition-colors"
                >
                  My Reservations
                </Link>

                {/* Contact Link */}
                <Link 
                  href="/contact"
                  className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-roboto transition-colors"
                >
                  Contact
                </Link>

                <div 
                  className="relative" 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Avatar Trigger */}
                  <div className="cursor-pointer p-2 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200">
                    <SimpleAvatar 
                      name={user.displayName || user.email || "User"} 
                      size="sm" 
                      variant="solid" 
                    />
                  </div>
                  
                  {/* Dropdown Menu - No gap */}
                  {active === "profile" && (
                    <div 
                      className="absolute top-full right-0 z-50"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 py-3 min-w-[240px] mt-1">
                        <div className="flex flex-col text-sm">
                          <Link 
                            href="/dashboard" 
                            className="text-neutral-700 dark:text-neutral-200 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 px-4 py-3 mx-2 rounded-lg block"
                            onClick={() => setActive(null)}
                          >
                            <div className="flex items-center space-x-3">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9,22 9,12 15,12 15,22"/>
                              </svg>
                              <span className="font-medium">My Reservations</span>
                            </div>
                          </Link>
                          <div className="text-neutral-400 dark:text-neutral-500 cursor-not-allowed px-4 py-3 mx-2 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="16"/>
                                <line x1="8" y1="12" x2="16" y2="12"/>
                              </svg>
                              <span className="font-medium">Create Experience (Coming Soon)</span>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-3 mx-2"></div>
                          <div className="px-4 py-2 mx-2">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                              Signed in as
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300 mb-3 break-all">
                              {user.displayName || user.email}
                            </div>
                            <button
                              onClick={() => {
                                setActive(null);
                                logout();
                              }}
                              className="flex items-center space-x-3 text-red-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16,17 21,12 16,7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                              </svg>
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Guest user buttons
              <div className="flex items-center space-x-4">
                <Link 
                  href="/contact"
                  className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-roboto transition-colors"
                >
                  Contact
                </Link>
                <Link 
                  href="/about"
                  className="text-black/70 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 font-roboto transition-colors"
                >
                  About Us
                </Link>
                <Link 
                  href="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-roboto transition-colors"
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
