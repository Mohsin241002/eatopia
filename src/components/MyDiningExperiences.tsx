'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DiningExperience {
  id: string;
  location: string;
  date: string;
  groupType: string;
  vibe: string;
  budget: string;
  imageUrl: string;
  restaurantsFound: number;
  status: 'upcoming' | 'completed' | 'planning';
}

// Mock data for dining experiences
const mockExperiences: DiningExperience[] = [
  {
    id: '1',
    location: 'Manhattan, New York',
    date: 'Dec 15 - Dec 15, 2024',
    groupType: 'couple',
    vibe: 'romantic',
    budget: 'Upscale',
    imageUrl: '/restaurant-background.svg',
    restaurantsFound: 12,
    status: 'upcoming'
  },
  {
    id: '2',
    location: 'Brooklyn, New York',
    date: 'Dec 8 - Dec 8, 2024',
    groupType: 'friends',
    vibe: 'loud-af',
    budget: 'Moderate',
    imageUrl: '/restaurant-background.svg',
    restaurantsFound: 8,
    status: 'completed'
  },
  {
    id: '3',
    location: 'San Francisco, California',
    date: 'Dec 22 - Dec 23, 2024',
    groupType: 'family',
    vibe: 'casual',
    budget: 'Budget-friendly',
    imageUrl: '/restaurant-background.svg',
    restaurantsFound: 15,
    status: 'planning'
  },
  {
    id: '4',
    location: 'Los Angeles, California',
    date: 'Jan 5 - Jan 5, 2025',
    groupType: 'solo',
    vibe: 'chill',
    budget: 'Moderate',
    imageUrl: '/restaurant-background.svg',
    restaurantsFound: 6,
    status: 'upcoming'
  }
];

const vibeEmojis = {
  'romantic': '💕',
  'chill': '😌',
  'loud-af': '🔥',
  'energetic': '🎉',
  'upscale': '✨',
  'casual': '👕'
};

const groupTypeEmojis = {
  'solo': '🧑‍🍳',
  'couple': '💑',
  'friends': '👥',
  'family': '👨‍👩‍👧‍👦'
};

export default function MyDiningExperiences() {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredExperiences = activeTab === 'all' 
    ? mockExperiences 
    : mockExperiences.filter(exp => exp.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dining Experiences</h1>
              <p className="text-gray-600 mt-1">Manage your vibe-matched dining adventures</p>
            </div>
            <Link
              href="/create-experience"
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              + Create New Experience
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex space-x-6 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-red-500 text-red-600 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            All Experiences
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'upcoming'
                ? 'border-red-500 text-red-600 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'completed'
                ? 'border-red-500 text-red-600 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Experiences Grid */}
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No dining experiences yet</h3>
            <p className="text-gray-600 mb-6">Create your first vibe-matched dining experience!</p>
            <Link
              href="/create-experience"
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredExperiences.map((experience) => (
              <div
                key={experience.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                {/* Experience Image */}
                <div className="relative h-48 bg-gradient-to-r from-orange-400 to-red-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">
                        {vibeEmojis[experience.vibe as keyof typeof vibeEmojis] || '🍽️'}
                      </div>
                      <div className="text-2xl">
                        {groupTypeEmojis[experience.groupType as keyof typeof groupTypeEmojis]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      experience.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800'
                        : experience.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {experience.status.charAt(0).toUpperCase() + experience.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Experience Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {experience.location}
                  </h3>
                  <p className="text-gray-600 mb-4">{experience.date}</p>

                  <div className="space-y-3">
                    {/* Group & Vibe */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Group:</span>
                        <span className="font-medium capitalize">{experience.groupType}</span>
                        <span>{groupTypeEmojis[experience.groupType as keyof typeof groupTypeEmojis]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Vibe:</span>
                        <span className="font-medium capitalize">{experience.vibe.replace('-', ' ')}</span>
                        <span>{vibeEmojis[experience.vibe as keyof typeof vibeEmojis]}</span>
                      </div>
                    </div>

                    {/* Budget & Restaurants Found */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">💰 Budget:</span>
                        <span className="font-medium">{experience.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">🎯 Found:</span>
                        <span className="font-medium">{experience.restaurantsFound} spots</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-3">
                    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                      {experience.status === 'completed' ? 'View Details' : 'View Restaurants'}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      {experience.status === 'completed' ? 'Book Again' : 'Edit'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-2xl mb-2">🍽️</div>
              <h4 className="font-medium text-gray-900">Find Tonight's Spot</h4>
              <p className="text-sm text-gray-600">Quick dinner recommendation for tonight</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-2xl mb-2">💕</div>
              <h4 className="font-medium text-gray-900">Date Night Planner</h4>
              <p className="text-sm text-gray-600">Romantic spots for you and your partner</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-2xl mb-2">👥</div>
              <h4 className="font-medium text-gray-900">Group Hangout</h4>
              <p className="text-sm text-gray-600">Perfect spots for friend gatherings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
