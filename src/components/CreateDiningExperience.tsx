'use client';

import { useState } from 'react';
import Image from 'next/image';

// Step 1: Location Selection
interface Step1Props {
  onNext: (location: string) => void;
}

function Step1LocationSelection({ onNext }: Step1Props) {
  const [searchLocation, setSearchLocation] = useState('');

  const handleNext = () => {
    if (searchLocation.trim()) {
      onNext(searchLocation);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-medium">1</div>
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-medium">2</div>
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-medium">3</div>
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-medium">4</div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Where are you looking to dine?</h1>
        <p className="text-gray-600 text-lg">Search for your dining location</p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex">
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search dining location..."
            className="flex-1 px-6 py-4 text-lg border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleNext()}
          />
          <button
            onClick={handleNext}
            disabled={!searchLocation.trim()}
            className="px-8 py-4 bg-red-500 text-white rounded-r-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔍
          </button>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!searchLocation.trim()}
        className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

// Step 2: Date & Time Selection
interface Step2Props {
  location: string;
  onNext: (dateTime: { date: string; time: string }) => void;
  onBack: () => void;
}

function Step2DateTimeSelection({ location, onNext, onBack }: Step2Props) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  };

  // Generate today + next 30 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-medium">✓</div>
          <div className="w-16 h-1 bg-green-500 rounded"></div>
          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-medium">2</div>
          <div className="w-16 h-1 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-medium">3</div>
          <div className="w-16 h-1 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-medium">4</div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">When are you dining?</h1>
        <p className="text-gray-600 text-lg">Select your dining date and time for {location}</p>
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-8 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-6xl mb-2">🍽️</div>
          <p className="text-xl font-medium">Perfect Dining Experience Awaits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Date Selection */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">Dining Date</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Select date</option>
            {generateDates().map(date => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">Dining Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Select time</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="text-center mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            Perfect! Dining on {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedDate || !selectedTime}
          className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// Step 3: Group Type Selection
interface Step3Props {
  onNext: (groupType: string) => void;
  onBack: () => void;
}

function Step3GroupTypeSelection({ onNext, onBack }: Step3Props) {
  const [selectedGroup, setSelectedGroup] = useState('');

  const groupTypes = [
    {
      id: 'solo',
      title: 'Just Me',
      subtitle: 'A solo dining exploration',
      emoji: '🧑‍🍳',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'couple',
      title: 'A Couple',
      subtitle: 'Two diners in perfect harmony',
      emoji: '💑',
      color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
    },
    {
      id: 'friends',
      title: 'Friends',
      subtitle: 'A group of food adventurers',
      emoji: '👥',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'family',
      title: 'Family',
      subtitle: 'A gathering of loved ones',
      emoji: '👨‍👩‍👧‍👦',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  const handleNext = () => {
    if (selectedGroup) {
      onNext(selectedGroup);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-medium">✓</div>
          <div className="w-16 h-1 bg-green-500 rounded"></div>
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-medium">✓</div>
          <div className="w-16 h-1 bg-green-500 rounded"></div>
          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-medium">3</div>
          <div className="w-16 h-1 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-medium">4</div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Who's Dining?</h1>
        <p className="text-gray-600 text-lg">Select the type of dining group for your experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {groupTypes.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroup(group.id)}
            className={`p-6 border-2 rounded-lg transition-all ${
              selectedGroup === group.id 
                ? 'border-red-500 bg-red-50' 
                : group.color
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{group.title}</h3>
                <p className="text-gray-600">{group.subtitle}</p>
              </div>
              <div className="text-4xl">{group.emoji}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedGroup}
          className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// Step 4: Vibe Selection
interface Step4Props {
  onNext: (vibe: string) => void;
  onBack: () => void;
}

function Step4VibeSelection({ onNext, onBack }: Step4Props) {
  const [selectedVibe, setSelectedVibe] = useState('');

  const vibes = [
    {
      id: 'chill',
      title: 'Chill',
      subtitle: 'Relaxed, quiet, perfect for conversation',
      emoji: '😌',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'romantic',
      title: 'Romantic',
      subtitle: 'Intimate ambiance with soft lighting',
      emoji: '💕',
      color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
    },
    {
      id: 'energetic',
      title: 'Energetic',
      subtitle: 'Lively atmosphere with great energy',
      emoji: '🎉',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'loud-af',
      title: 'Loud AF',
      subtitle: 'High energy, music, party vibes',
      emoji: '🔥',
      color: 'bg-red-50 border-red-200 hover:bg-red-100'
    },
    {
      id: 'upscale',
      title: 'Upscale',
      subtitle: 'Fine dining, sophisticated atmosphere',
      emoji: '✨',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'casual',
      title: 'Casual',
      subtitle: 'Comfortable, no-fuss dining',
      emoji: '👕',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    }
  ];

  const handleNext = () => {
    if (selectedVibe) {
      onNext(selectedVibe);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-medium">✓</div>
          <div className="w-16 h-1 bg-green-500 rounded"></div>
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-medium">✓</div>
          <div className="w-16 h-1 bg-green-500 rounded"></div>
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-medium">✓</div>
          <div className="w-16 h-1 bg-green-500 rounded"></div>
          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-medium">4</div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">What's the Vibe?</h1>
        <p className="text-gray-600 text-lg">Choose the atmosphere that matches your mood</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {vibes.map((vibe) => (
          <button
            key={vibe.id}
            onClick={() => setSelectedVibe(vibe.id)}
            className={`p-6 border-2 rounded-lg transition-all ${
              selectedVibe === vibe.id 
                ? 'border-red-500 bg-red-50' 
                : vibe.color
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{vibe.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{vibe.title}</h3>
              <p className="text-gray-600 text-sm">{vibe.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedVibe}
          className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Find Perfect Spots →
        </button>
      </div>
    </div>
  );
}

// Main Component
interface DiningExperienceData {
  location: string;
  dateTime: { date: string; time: string };
  groupType: string;
  vibe: string;
}

export default function CreateDiningExperience() {
  const [currentStep, setCurrentStep] = useState(1);
  const [experienceData, setExperienceData] = useState<Partial<DiningExperienceData>>({});

  const handleStep1 = (location: string) => {
    setExperienceData(prev => ({ ...prev, location }));
    setCurrentStep(2);
  };

  const handleStep2 = (dateTime: { date: string; time: string }) => {
    setExperienceData(prev => ({ ...prev, dateTime }));
    setCurrentStep(3);
  };

  const handleStep3 = (groupType: string) => {
    setExperienceData(prev => ({ ...prev, groupType }));
    setCurrentStep(4);
  };

  const handleStep4 = (vibe: string) => {
    setExperienceData(prev => ({ ...prev, vibe }));
    // Here you would typically navigate to results page or trigger search
    console.log('Complete experience data:', { ...experienceData, vibe });
    // For now, we'll just log the data
    alert(`Perfect! Searching for ${vibe} ${experienceData.groupType} spots in ${experienceData.location} on ${experienceData.dateTime?.date} at ${experienceData.dateTime?.time}`);
  };

  const goBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-black/5">
      {currentStep === 1 && <Step1LocationSelection onNext={handleStep1} />}
      {currentStep === 2 && experienceData.location && (
        <Step2DateTimeSelection 
          location={experienceData.location} 
          onNext={handleStep2} 
          onBack={goBack} 
        />
      )}
      {currentStep === 3 && (
        <Step3GroupTypeSelection onNext={handleStep3} onBack={goBack} />
      )}
      {currentStep === 4 && (
        <Step4VibeSelection onNext={handleStep4} onBack={goBack} />
      )}
    </div>
  );
}
