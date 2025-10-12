'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  storeDiningPreferences, 
  generateRestaurantRecommendations, 
  storeRecommendations,
  DiningPreferences, 
  RestaurantRecommendation 
} from '@/lib/gemini';
import { getCurrentLocation, reverseGeocode, getPlacePredictions, getPlaceDetails, PlacePrediction } from '@/lib/googlemaps';

interface Answers {
  location: string | null;
  guests: number | null;
  vibe: string | null;
  occasion: string | null;
  [key: string]: number | string | null;
}

interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

interface QuestionOption {
  value: number | string;
  label: string;
  icon: string;
  description?: string;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

const MainPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    location: null,
    guests: null,
    vibe: null,
    occasion: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<RestaurantRecommendation[]>([]);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [placePredictions, setPlacePredictions] = useState<PlacePrediction[]>([]);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlacePrediction | null>(null);
  const [selectedPredictionIndex, setSelectedPredictionIndex] = useState(-1);

  // Clear predictions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (placePredictions.length > 0) {
        setTimeout(() => setPlacePredictions([]), 100);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [placePredictions]);

  // Step 1: Guest Type Options
  const guestTypeOptions = [
    { value: 'single', label: 'Single', icon: '🧍', description: 'Just me' },
    { value: 'couple', label: 'Couple', icon: '💑', description: 'Two of us' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Family dining' },
    { value: 'friends', label: 'Friends', icon: '👥', description: 'Group of friends' },
  ];

  // Step 2: Occasion Options (based on Guest Type)
  const occasionOptions = {
    single: [
      { value: 'work-lunch', label: 'Work lunch', icon: '💼', description: 'Quick business meal' },
      { value: 'coffee-chill', label: 'Coffee & chill', icon: '☕', description: 'Relaxed coffee time' },
      { value: 'just-dining', label: 'Just dining', icon: '🍽️', description: 'Simple meal' },
      { value: 'celebration-self', label: 'Celebration for self', icon: '🎉', description: 'Treating myself' },
    ],
    couple: [
      { value: 'anniversary', label: 'Anniversary', icon: '💍', description: 'Special milestone' },
      { value: 'date-night', label: 'Date night', icon: '💕', description: 'Romantic evening' },
      { value: 'casual-dinner', label: 'Casual dinner', icon: '🍝', description: 'Regular date' },
      { value: 'surprise-celebration', label: 'Surprise celebration', icon: '🎊', description: 'Special surprise' },
    ],
    family: [
      { value: 'birthday', label: 'Birthday', icon: '🎂', description: 'Family birthday' },
      { value: 'weekend-outing', label: 'Weekend outing', icon: '🌅', description: 'Family time' },
      { value: 'family-dinner', label: 'Family dinner', icon: '🍽️', description: 'Regular family meal' },
      { value: 'festive-celebration', label: 'Festive celebration', icon: '🎆', description: 'Holiday celebration' },
    ],
    friends: [
      { value: 'reunion', label: 'Reunion', icon: '🤝', description: 'Getting back together' },
      { value: 'party-night', label: 'Party night', icon: '🎉', description: 'Fun night out' },
      { value: 'casual-hangout', label: 'Casual hangout', icon: '😊', description: 'Regular meetup' },
      { value: 'farewell-dinner', label: 'Farewell dinner', icon: '👋', description: 'Goodbye meal' },
    ],
  };

  // Step 3: Budget Options (based on Occasion)
  const budgetOptions = {
    // Work/Business style events
    'work-lunch': [
      { value: 'budget-meal', label: 'Budget meal', icon: '�', description: '$10-20 per person' },
      { value: 'mid-range-restaurant', label: 'Mid-range restaurant', icon: '💵', description: '$20-40 per person' },
      { value: 'fine-dining', label: 'Fine dining', icon: '💎', description: '$40-80 per person' },
      { value: 'corporate-buffet', label: 'Corporate buffet', icon: '🍽️', description: '$25-50 per person' },
    ],
    
    // Casual/Simple dining
    'coffee-chill': [
      { value: 'budget-cafe', label: 'Budget café', icon: '☕', description: '$5-15 per person' },
      { value: 'mid-range-diner', label: 'Mid-range diner', icon: '🏪', description: '$15-30 per person' },
      { value: 'premium-bistro', label: 'Premium bistro', icon: '🍷', description: '$30-50 per person' },
      { value: 'rooftop-lounge', label: 'Rooftop lounge', icon: '🌃', description: '$35-60 per person' },
    ],
    'just-dining': [
      { value: 'budget-cafe', label: 'Budget café', icon: '☕', description: '$5-15 per person' },
      { value: 'mid-range-diner', label: 'Mid-range diner', icon: '🏪', description: '$15-30 per person' },
      { value: 'premium-bistro', label: 'Premium bistro', icon: '🍷', description: '$30-50 per person' },
      { value: 'rooftop-lounge', label: 'Rooftop lounge', icon: '🌃', description: '$35-60 per person' },
    ],
    'casual-dinner': [
      { value: 'budget-cafe', label: 'Budget café', icon: '☕', description: '$5-15 per person' },
      { value: 'mid-range-diner', label: 'Mid-range diner', icon: '🏪', description: '$15-30 per person' },
      { value: 'premium-bistro', label: 'Premium bistro', icon: '🍷', description: '$30-50 per person' },
      { value: 'rooftop-lounge', label: 'Rooftop lounge', icon: '🌃', description: '$35-60 per person' },
    ],
    'casual-hangout': [
      { value: 'budget-cafe', label: 'Budget café', icon: '☕', description: '$5-15 per person' },
      { value: 'mid-range-diner', label: 'Mid-range diner', icon: '🏪', description: '$15-30 per person' },
      { value: 'premium-bistro', label: 'Premium bistro', icon: '🍷', description: '$30-50 per person' },
      { value: 'rooftop-lounge', label: 'Rooftop lounge', icon: '🌃', description: '$35-60 per person' },
    ],

    // Celebration events
    'birthday': [
      { value: 'affordable-celebration', label: 'Affordable celebration', icon: '🎂', description: '$20-40 per person' },
      { value: 'classic-dining', label: 'Classic dining', icon: '🍾', description: '$40-70 per person' },
      { value: 'luxury-experience', label: 'Luxury experience', icon: '✨', description: '$70-120 per person' },
      { value: 'exclusive-private-room', label: 'Exclusive private room', icon: '🏛️', description: '$100+ per person' },
    ],
    'anniversary': [
      { value: 'affordable-celebration', label: 'Affordable celebration', icon: '🎂', description: '$20-40 per person' },
      { value: 'classic-dining', label: 'Classic dining', icon: '🍾', description: '$40-70 per person' },
      { value: 'luxury-experience', label: 'Luxury experience', icon: '✨', description: '$70-120 per person' },
      { value: 'exclusive-private-room', label: 'Exclusive private room', icon: '🏛️', description: '$100+ per person' },
    ],
    'celebration-self': [
      { value: 'affordable-celebration', label: 'Affordable celebration', icon: '🎂', description: '$20-40 per person' },
      { value: 'classic-dining', label: 'Classic dining', icon: '🍾', description: '$40-70 per person' },
      { value: 'luxury-experience', label: 'Luxury experience', icon: '✨', description: '$70-120 per person' },
      { value: 'exclusive-private-room', label: 'Exclusive private room', icon: '🏛️', description: '$100+ per person' },
    ],
    'surprise-celebration': [
      { value: 'affordable-celebration', label: 'Affordable celebration', icon: '🎂', description: '$20-40 per person' },
      { value: 'classic-dining', label: 'Classic dining', icon: '🍾', description: '$40-70 per person' },
      { value: 'luxury-experience', label: 'Luxury experience', icon: '✨', description: '$70-120 per person' },
      { value: 'exclusive-private-room', label: 'Exclusive private room', icon: '🏛️', description: '$100+ per person' },
    ],
    'festive-celebration': [
      { value: 'affordable-celebration', label: 'Affordable celebration', icon: '🎂', description: '$20-40 per person' },
      { value: 'classic-dining', label: 'Classic dining', icon: '🍾', description: '$40-70 per person' },
      { value: 'luxury-experience', label: 'Luxury experience', icon: '✨', description: '$70-120 per person' },
      { value: 'exclusive-private-room', label: 'Exclusive private room', icon: '🏛️', description: '$100+ per person' },
    ],

    // Party/Group events
    'reunion': [
      { value: 'group-friendly-budget', label: 'Group-friendly budget', icon: '�', description: '$15-30 per person' },
      { value: 'premium-restaurant', label: 'Premium restaurant', icon: '🍽️', description: '$30-60 per person' },
      { value: 'party-lounge', label: 'Party lounge', icon: '🍸', description: '$40-80 per person' },
      { value: 'vip-section', label: 'VIP section', icon: '👑', description: '$80+ per person' },
    ],
    'party-night': [
      { value: 'group-friendly-budget', label: 'Group-friendly budget', icon: '👥', description: '$15-30 per person' },
      { value: 'premium-restaurant', label: 'Premium restaurant', icon: '🍽️', description: '$30-60 per person' },
      { value: 'party-lounge', label: 'Party lounge', icon: '🍸', description: '$40-80 per person' },
      { value: 'vip-section', label: 'VIP section', icon: '👑', description: '$80+ per person' },
    ],
    'farewell-dinner': [
      { value: 'group-friendly-budget', label: 'Group-friendly budget', icon: '👥', description: '$15-30 per person' },
      { value: 'premium-restaurant', label: 'Premium restaurant', icon: '🍽️', description: '$30-60 per person' },
      { value: 'party-lounge', label: 'Party lounge', icon: '🍸', description: '$40-80 per person' },
      { value: 'vip-section', label: 'VIP section', icon: '👑', description: '$80+ per person' },
    ],
    'weekend-outing': [
      { value: 'group-friendly-budget', label: 'Group-friendly budget', icon: '👥', description: '$15-30 per person' },
      { value: 'premium-restaurant', label: 'Premium restaurant', icon: '�️', description: '$30-60 per person' },
      { value: 'party-lounge', label: 'Party lounge', icon: '🍸', description: '$40-80 per person' },
      { value: 'vip-section', label: 'VIP section', icon: '👑', description: '$80+ per person' },
    ],
    'family-dinner': [
      { value: 'group-friendly-budget', label: 'Group-friendly budget', icon: '👥', description: '$15-30 per person' },
      { value: 'premium-restaurant', label: 'Premium restaurant', icon: '🍽️', description: '$30-60 per person' },
      { value: 'party-lounge', label: 'Party lounge', icon: '🍸', description: '$40-80 per person' },
      { value: 'vip-section', label: 'VIP section', icon: '👑', description: '$80+ per person' },
    ],
  };

  // Dynamic question structure based on current step and answers
  const getCurrentQuestion = () => {
    if (currentStep === 0) {
      // Step 1: Location (always first)
      return {
        id: 'location',
        title: 'Where are you dining?',
        subtitle: 'We\'ll find real restaurants in your area',
        options: [
          { value: 'current', label: 'Use My Location', icon: '�', description: 'Automatically detect your current location' },
          { value: 'manual', label: 'Choose Location', icon: '🗺️', description: 'Search for a city or area' },
        ]
      };
    } else if (currentStep === 1) {
      // Step 2: Guest Type
      return {
        id: 'guestType',
        title: '🧍 Who are you dining with?',
        subtitle: 'Step 1 of 3',
        options: guestTypeOptions
      };
    } else if (currentStep === 2) {
      // Step 3: Occasion (based on guest type)
      const guestType = answers.guestType as keyof typeof occasionOptions;
      return {
        id: 'occasion',
        title: '💫 What\'s the occasion?',
        subtitle: 'Step 2 of 3',
        options: occasionOptions[guestType] || []
      };
    } else if (currentStep === 3) {
      // Step 4: Budget (based on occasion)
      const occasion = answers.occasion as keyof typeof budgetOptions;
      return {
        id: 'budget',
        title: '💰 What\'s your budget?',
        subtitle: 'Step 3 of 3',
        options: budgetOptions[occasion] || []
      };
    }
    return null;
  };

  const currentQuestion = getCurrentQuestion();
  const totalSteps = 4;

  const handleLocationDetection = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);
    
    try {
      const coords = await getCurrentLocation();
      if (coords) {
        const address = await reverseGeocode(coords.lat, coords.lng);
        if (address) {
          const locationData: LocationData = {
            address: address,
            lat: coords.lat,
            lng: coords.lng
          };
          setLocationData(locationData);
          setAnswers(prev => ({ ...prev, location: address }));
          
          // Auto-advance to next question
          setTimeout(() => {
            if (currentStep < totalSteps - 1) {
              setCurrentStep(prev => prev + 1);
            }
          }, 1000);
        } else {
          setLocationError('Could not determine your address. Please try entering it manually.');
        }
      } else {
        setLocationError('Location access denied. Please enable location services or enter your address manually.');
      }
    } catch (error) {
      console.error('Location detection error:', error);
      setLocationError('Failed to detect location. Please try entering your address manually.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleManualLocation = () => {
    setShowManualInput(true);
  };

  const handleAddressInputChange = async (value: string) => {
    setManualAddress(value);
    setSelectedPlace(null);
    
    if (value.length >= 2) {
      setIsLoadingPredictions(true);
      try {
        const predictions = await getPlacePredictions(value, {
          types: ['(cities)']
        });
        setPlacePredictions(predictions);
        setSelectedPredictionIndex(-1);
      } catch (error) {
        console.error('Error getting place predictions:', error);
        setPlacePredictions([]);
      } finally {
        setIsLoadingPredictions(false);
      }
    } else {
      setPlacePredictions([]);
    }
  };

  const handlePlaceSelect = async (place: PlacePrediction) => {
    setSelectedPlace(place);
    setManualAddress(place.description);
    setPlacePredictions([]);
    
    try {
      // Get detailed place information
      const placeDetails = await getPlaceDetails(place.place_id);
      if (placeDetails) {
        const locationData: LocationData = {
          address: placeDetails.address,
          lat: placeDetails.lat,
          lng: placeDetails.lng
        };
        setLocationData(locationData);
        setAnswers(prev => ({ ...prev, location: placeDetails.address }));
        setShowManualInput(false);
        setManualAddress('');
        setSelectedPlace(null);
        
        // Auto-advance to next question
        setTimeout(() => {
          if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
          }
        }, 500);
      }
    } catch (error) {
      console.error('Error getting place details:', error);
      setLocationError('Could not get details for this location. Please try again.');
    }
  };

  const handleManualLocationSubmit = () => {
    if (selectedPlace) {
      handlePlaceSelect(selectedPlace);
    } else if (manualAddress && manualAddress.trim()) {
      // Fallback for manual entry without selection
      const locationData: LocationData = {
        address: manualAddress.trim(),
        lat: 0,
        lng: 0
      };
      setLocationData(locationData);
      setAnswers(prev => ({ ...prev, location: manualAddress.trim() }));
      setShowManualInput(false);
      setManualAddress('');
      
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(prev => prev + 1);
        }
      }, 500);
    }
  };

  const handleAnswer = (questionId: string, value: number | string) => {
    if (questionId === 'location') {
      if (value === 'current') {
        handleLocationDetection();
        return;
      } else if (value === 'manual') {
        handleManualLocation();
        return;
      }
    }

    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // If this is the last step, generate recommendations automatically
        generateRecommendationsAutomatically(questionId, value);
      }
    }, 600);
  };

  const generateRecommendationsAutomatically = async (lastQuestionId: string, lastValue: number | string) => {
    setIsGenerating(true);
    try {
      // Include the final answer in the preferences
      const finalAnswers = { ...answers, [lastQuestionId]: lastValue };
      
      // Prepare dining preferences with new structure
      const preferences: DiningPreferences = {
        location: finalAnswers.location!,
        guests: getGuestCount(finalAnswers.guestType as string),
        vibe: getVibeFromAnswers(finalAnswers),
        occasion: finalAnswers.occasion!,
        userId: user?.uid,
      };

      // Store preferences
      const preferenceId = storeDiningPreferences(preferences);
      console.log('Stored preference ID:', preferenceId);

      // Generate recommendations
      const recs = await generateRestaurantRecommendations(preferences);
      setRecommendations(recs);
      
      // Store recommendations for the user in Firebase
      if (user?.uid) {
        await storeRecommendations(user.uid, recs, preferences);
        console.log('Recommendations stored in Firebase successfully');
      }
      
      // Navigate to recommendations view
      router.push('/recommendations');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Could show error message to user here
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper functions to convert new flow answers to old format
  const getGuestCount = (guestType: string): number => {
    switch (guestType) {
      case 'single': return 1;
      case 'couple': return 2;
      case 'family': return 4;
      case 'friends': return 4;
      default: return 2;
    }
  };

  const getVibeFromAnswers = (answers: any): string => {
    const occasion = answers.occasion;
    const budget = answers.budget;
    
    // Map occasion and budget to vibe
    if (budget?.includes('luxury') || budget?.includes('exclusive') || budget?.includes('vip')) {
      return 'luxury';
    } else if (occasion?.includes('anniversary') || occasion?.includes('date-night')) {
      return 'romantic';
    } else if (answers.guestType === 'family' || occasion?.includes('family')) {
      return 'family';
    } else {
      return 'casual';
    }
  };

  const handleGetRecommendations = async () => {
    if (!isComplete) return;
    
    setIsGenerating(true);
    try {
      // Prepare dining preferences
      const preferences: DiningPreferences = {
        location: answers.location!,
        guests: answers.guests!,
        vibe: answers.vibe!,
        occasion: answers.occasion!,
        userId: user?.uid,
      };

      // Store preferences
      const preferenceId = storeDiningPreferences(preferences);
      console.log('Stored preference ID:', preferenceId);

      // Generate recommendations
      const recs = await generateRestaurantRecommendations(preferences);
      setRecommendations(recs);
      
      // Store recommendations for the user in Firebase
      if (user?.uid) {
        await storeRecommendations(user.uid, recs, preferences);
        console.log('Recommendations stored in Firebase successfully');
      }
      
      // Navigate to recommendations view
      router.push('/recommendations');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Could show error message to user here
    } finally {
      setIsGenerating(false);
    }
  };

  // Back button handler
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      
      // Clear the answer for the current step when going back
      const currentQuestion = getCurrentQuestion();
      if (currentQuestion) {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: null }));
      }
      
      // Special handling for going back from manual location input
      if (currentStep === 1 && showManualInput) {
        setShowManualInput(false);
        setManualAddress('');
        setPlacePredictions([]);
        setSelectedPlace(null);
        setLocationError(null);
      }
    }
  };

  const isComplete = answers.location && answers.guestType && answers.occasion && answers.budget;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75] as const
      }
    },
    exit: { 
      opacity: 0, 
      y: -50, 
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75] as const
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-roboto mb-6">
              Welcome back, 
              <span className="text-orange-500 block mt-2">
                {user?.displayName || user?.email?.split('@')[0] || 'Food Lover'}!
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Let's find your perfect dining experience. Answer a few quick questions to get personalized recommendations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Questionnaire Section */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-center items-center space-x-4 mb-4">
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index <= currentStep 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Question Cards */}
          <AnimatePresence mode="wait">
            {currentStep < totalSteps && currentQuestion && (
              <motion.div
                key={currentStep}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800"
              >
                {/* Back Button */}
                {currentStep > 0 && (
                  <div className="flex justify-start mb-6">
                    <motion.button
                      onClick={handleBack}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Back</span>
                    </motion.button>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-roboto text-white mb-2">
                    {currentQuestion.title}
                  </h2>
                  <p className="text-gray-400">
                    {currentQuestion.subtitle}
                  </p>
                  
                  {/* Location Status */}
                  {currentQuestion.id === 'location' && (
                    <div className="mt-4">
                      {isLoadingLocation && (
                        <div className="flex items-center justify-center text-orange-400">
                          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Detecting your location...
                        </div>
                      )}
                      {locationError && (
                        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                          {locationError}
                        </div>
                      )}
                      {locationData && (
                        <div className="text-green-400 text-sm bg-green-400/10 p-3 rounded-lg">
                          📍 {locationData.address}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      custom={index}
                      variants={optionVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        answers[currentQuestion.id] === option.value
                          ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                          : 'border-gray-700 hover:border-orange-400 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{option.icon}</span>
                        <div>
                          <h3 className="text-xl font-roboto text-white">
                            {option.label}
                          </h3>
                          {option.description && (
                            <p className="text-gray-400 text-sm mt-1">
                              {option.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Manual Location Input with Autocomplete */}
                {currentQuestion.id === 'location' && showManualInput && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 bg-gray-800 rounded-xl border border-gray-700"
                  >
                    <h3 className="text-white text-lg mb-3">Enter your location</h3>
                    <div className="relative">
                      <div className="flex gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={manualAddress}
                            onChange={(e) => handleAddressInputChange(e.target.value)}
                            placeholder="Type a city name like 'Bangalore', 'Mumbai', etc..."
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                setSelectedPredictionIndex(prev => 
                                  prev < placePredictions.length - 1 ? prev + 1 : prev
                                );
                              } else if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                setSelectedPredictionIndex(prev => prev > 0 ? prev - 1 : -1);
                              } else if (e.key === 'Enter') {
                                e.preventDefault();
                                if (selectedPredictionIndex >= 0 && placePredictions[selectedPredictionIndex]) {
                                  handlePlaceSelect(placePredictions[selectedPredictionIndex]);
                                } else {
                                  handleManualLocationSubmit();
                                }
                              } else if (e.key === 'Escape') {
                                setPlacePredictions([]);
                                setSelectedPredictionIndex(-1);
                              }
                            }}
                          />
                          
                          {/* Loading indicator */}
                          {isLoadingPredictions && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <svg className="animate-spin h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </div>
                          )}
                          
                          {/* Autocomplete Dropdown */}
                          {(placePredictions.length > 0 || (manualAddress.length >= 2 && !isLoadingPredictions && placePredictions.length === 0)) && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                              {placePredictions.length > 0 ? (
                                placePredictions.map((prediction, index) => (
                                  <button
                                    key={prediction.place_id}
                                    onClick={() => handlePlaceSelect(prediction)}
                                    className={`w-full px-4 py-3 text-left transition-colors duration-200 border-b border-gray-700 last:border-b-0 ${
                                      index === selectedPredictionIndex 
                                        ? 'bg-orange-500/20 border-orange-500' 
                                        : 'hover:bg-gray-800'
                                    }`}
                                  >
                                    <div className="text-white font-medium">
                                      {prediction.main_text}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                      {prediction.secondary_text}
                                    </div>
                                  </button>
                                ))
                              ) : (
                                <div className="px-4 py-3 text-gray-400 text-sm">
                                  No locations found. Try a different search term.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={handleManualLocationSubmit}
                          disabled={!selectedPlace && !manualAddress.trim()}
                          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300"
                        >
                          Confirm
                        </button>
                      </div>
                      
                      {/* Helper text */}
                      <p className="text-gray-400 text-sm mt-2">
                        {placePredictions.length > 0 
                          ? "Select a location from the dropdown above" 
                          : "Start typing to see location suggestions"
                        }
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generating Recommendations Screen */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center mt-12"
            >
              <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
                <div className="flex items-center justify-center mb-6">
                  <svg className="animate-spin h-8 w-8 text-orange-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <h3 className="text-2xl font-roboto text-white">Generating Your Perfect Recommendations</h3>
                </div>
                
                <p className="text-gray-400 mb-4">
                  🔍 Searching real restaurants in {answers.location}<br/>
                  🤖 Creating personalized recommendations with AI<br/>
                  ✨ Matching your {answers.guestType} {answers.occasion} preferences
                </p>
                
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainPage;