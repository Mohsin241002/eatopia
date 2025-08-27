'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function SearchForm() {
  const { user } = useAuth();
  const router = useRouter();

  const handleCreateExperience = () => {
    if (user) {
      // User is logged in, redirect to create experience
      router.push('/create-experience');
    } else {
      // User is not logged in, redirect to login page
      router.push('/login');
    }
  };

  return (
    <div className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Create Experience CTA */}
        <div className="text-center">
          <div className="backdrop-blur-glass rounded-3xl p-8 md:p-12 border border-white/30 shadow-2xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium mb-6">
              <span className="animate-pulse mr-2">🎯</span>
              AI-Powered Vibe Matching
            </div>
            
            <p className="text-white/90 mb-8 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Ready for a perfectly vibe-matched dining experience?
            </p>
            
            <button 
              onClick={handleCreateExperience}
              className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-12 md:px-20 py-4 md:py-6 rounded-full font-black text-lg md:text-xl transition-all duration-500 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 font-cream animate-gradient"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>✨</span>
                <span>Create Your Perfect Experience</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <p className="text-white/70 mt-6 text-base md:text-lg max-w-3xl mx-auto font-light">
              Tell us your group, mood, and vibe — we'll find the perfect spots that match your energy
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
                <span className="mr-1">👥</span> Group-Aware
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
                <span className="mr-1">🎭</span> Mood Matching
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
                <span className="mr-1">⚡</span> Real-time Results
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
                <span className="mr-1">🤖</span> AI-Powered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
