'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getStoredRecommendations, RestaurantRecommendation } from '@/lib/gemini';

export default function RecommendationsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<RestaurantRecommendation[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadRecommendations = async () => {
      const stored = await getStoredRecommendations(user.uid);
      if (stored) {
        setRecommendations(stored);
      } else {
        router.push('/main');
      }
    };

    loadRecommendations();
  }, [user, router]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl text-orange-500 mb-8">Your Recommendations</h1>
      <div className="grid gap-6">
        {recommendations.map((restaurant, index) => (
          <div key={index} className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl text-white mb-2">{restaurant.name}</h3>
            <p className="text-orange-400">{restaurant.cuisine}  {restaurant.priceRange}</p>
            <p className="text-gray-300 mt-2">{restaurant.description}</p>
            <div className="mt-4">
              <span className="text-orange-400"> {restaurant.rating}/5</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 space-x-4">
        <button
          onClick={() => router.push('/main')}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Start Over
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
