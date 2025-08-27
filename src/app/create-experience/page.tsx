'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { createExperience } from '@/lib/experiences';
import Header from '@/components/Header';
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection';
import { SimpleMouseTracker } from '@/components/SimpleMouseTracker';
import { ParallaxSection } from '@/components/ParallaxSection';
import Link from 'next/link';

export default function CreateExperiencePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    restaurant: '',
    location: '',
    date: '',
    time: '',
    guests: 1,
    cuisine: '',
    priceRange: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login');
      return;
    }

    if (!formData.name || !formData.restaurant || !formData.location || !formData.date || !formData.time) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Combine date and time
      const experienceDate = new Date(`${formData.date}T${formData.time}`);

      await createExperience({
        userId: user.uid,
        name: formData.name,
        restaurant: formData.restaurant,
        location: formData.location,
        date: experienceDate,
        status: experienceDate > new Date() ? 'upcoming' : 'completed',
        guests: formData.guests,
        cuisine: formData.cuisine,
        priceRange: formData.priceRange,
        notes: formData.notes
      });

      // Redirect to dashboard after successful creation
      router.push('/dashboard');
    } catch (err) {
      console.error('Error creating experience:', err);
      setError('Failed to create experience. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-black/90 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-riveta-medium text-black dark:text-white mb-4">Please sign in to create an experience</h1>
          <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-riveta-medium transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black/90 relative overflow-x-hidden">
      <SimpleMouseTracker />
      <Header />
      
      <ParallaxSection 
        pixabayQuery="restaurant chef cooking fine dining"
        speed={0.1}
        overlay="light"
        className="min-h-screen"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <ScrollAnimatedSection animation="slideUp" delay={200}>
            <div className="text-center mb-12">
              <Link href="/dashboard" className="inline-flex items-center text-orange-500 hover:text-orange-600 font-riveta-medium mb-6 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-riveta-medium text-black dark:text-white mb-4">
                Create New <span className="text-orange-500">Experience</span>
              </h1>
              <p className="text-lg font-rivetatext-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Plan your next extraordinary dining adventure and capture every delicious moment
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="slideUp" delay={400}>
            <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl">
              
              {error && (
                <div className="mb-6 p-4 rounded-2xl text-sm font-rivetabg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Experience Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                    placeholder="e.g., Birthday Celebration, Date Night, Business Dinner"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="restaurant" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Restaurant Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="restaurant"
                      name="restaurant"
                      value={formData.restaurant}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                      placeholder="Restaurant name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Location *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                      placeholder="City, State or Address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date *
                      </span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Time *
                      </span>
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Guests
                      </span>
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 transition-all duration-200"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cuisine" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Cuisine Type
                      </span>
                    </label>
                    <select
                      id="cuisine"
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 transition-all duration-200"
                    >
                      <option value="">Select cuisine type</option>
                      <option value="American">American</option>
                      <option value="Italian">Italian</option>
                      <option value="French">French</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Indian">Indian</option>
                      <option value="Mexican">Mexican</option>
                      <option value="Thai">Thai</option>
                      <option value="Mediterranean">Mediterranean</option>
                      <option value="Steakhouse">Steakhouse</option>
                      <option value="Seafood">Seafood</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="priceRange" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Price Range
                      </span>
                    </label>
                    <select
                      id="priceRange"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 transition-all duration-200"
                    >
                      <option value="">Select price range</option>
                      <option value="$">$ - Budget Friendly</option>
                      <option value="$$">$$ - Moderate</option>
                      <option value="$$$">$$$ - Expensive</option>
                      <option value="$$$$">$$$$ - Fine Dining</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Notes (Optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-rivetatext-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                    placeholder="Special requests, dietary restrictions, celebration details, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-2xl font-riveta-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Experience...
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Experience
                    </span>
                  )}
                </button>
              </form>
            </div>
          </ScrollAnimatedSection>
        </div>
      </ParallaxSection>
    </div>
  );
}
