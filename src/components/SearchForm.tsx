'use client';

import { useState } from 'react';

export default function SearchForm() {
  const [isStays, setIsStays] = useState(true);

  return (
    <div className="bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle between Stays and Weddings */}
        <div className="flex items-center space-x-4 mb-8">
          <span className="text-gray-900 font-medium text-lg">Dining</span>
          <button
            onClick={() => setIsStays(!isStays)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isStays ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isStays ? 'translate-x-1' : 'translate-x-6'
              }`}
            />
          </button>
          <span className="text-gray-900 font-medium text-lg">Events</span>
        </div>

        {/* Search Form */}
        <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Where */}
            <div className="border-r border-gray-200 p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="City or neighborhood"
                className="w-full text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-base font-medium"
              />
            </div>

            {/* Date */}
            <div className="border-r border-gray-200 p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="text"
                placeholder="Select date"
                className="w-full text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-base font-medium"
              />
            </div>

            {/* Time */}
            <div className="border-r border-gray-200 p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="text"
                placeholder="Select time"
                className="w-full text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-base font-medium"
              />
            </div>

            {/* Party Size */}
            <div className="p-4 flex items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Party Size
                </label>
                <input
                  type="text"
                  placeholder="Number of guests"
                  className="w-full text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-base font-medium"
                />
              </div>
              <button className="ml-4 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
