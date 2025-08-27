'use client';

import { useEffect, useState } from 'react';
import { useGoogleMaps, useRestaurantSearch, useGeolocation } from '@/hooks/useGoogleMaps';
import { RestaurantLocation, addRestaurantMarkers } from '@/lib/googlemaps';

interface GoogleMapComponentProps {
  height?: string;
  width?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  enableGeolocation?: boolean;
  showRestaurants?: boolean;
  cuisine?: string;
  onRestaurantClick?: (restaurant: RestaurantLocation) => void;
}

export default function GoogleMapComponent({
  height = '400px',
  width = '100%',
  center,
  zoom = 13,
  enableGeolocation = false,
  showRestaurants = false,
  cuisine,
  onRestaurantClick,
}: GoogleMapComponentProps) {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantLocation | null>(null);

  const {
    map,
    isLoaded,
    error: mapError,
    userLocation,
    mapRef,
    centerOnLocation,
    centerOnUser,
  } = useGoogleMaps({
    center,
    zoom,
    enableGeolocation,
  });

  const {
    restaurants,
    isSearching,
    error: searchError,
    searchRestaurants,
    clearResults,
  } = useRestaurantSearch();

  const {
    location: geoLocation,
    isLoading: geoLoading,
    error: geoError,
    getCurrentLocation,
  } = useGeolocation();

  // Search for restaurants when map is loaded and showRestaurants is true
  useEffect(() => {
    if (map && showRestaurants && (userLocation || center)) {
      const searchLocation = userLocation || center;
      if (searchLocation) {
        searchRestaurants({
          location: searchLocation,
          radius: 2000,
          keyword: cuisine,
        });
      }
    }
  }, [map, showRestaurants, userLocation, center, cuisine]);

  // Add restaurant markers when restaurants are found
  useEffect(() => {
    if (map && restaurants.length > 0) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Add new markers
      addRestaurantMarkers(map, restaurants, (restaurant) => {
        setSelectedRestaurant(restaurant);
        if (onRestaurantClick) {
          onRestaurantClick(restaurant);
        }
      }).then(newMarkers => {
        setMarkers(newMarkers);
      });
    }
  }, [map, restaurants]);

  const handleFindMyLocation = async () => {
    await centerOnUser();
  };

  const handleSearchNearby = () => {
    if (map) {
      const center = map.getCenter();
      if (center) {
        searchRestaurants({
          location: {
            lat: center.lat(),
            lng: center.lng(),
          },
          radius: 1500,
          keyword: cuisine,
        });
      }
    }
  };

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg"
        style={{ height, width }}
      >
        <div className="text-center p-4">
          <p className="text-gray-600 mb-2">Google Maps API key not configured</p>
          <p className="text-sm text-gray-500">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div 
        className="flex items-center justify-center bg-red-50 border-2 border-red-200 rounded-lg"
        style={{ height, width }}
      >
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">Error loading map</p>
          <p className="text-sm text-red-500">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Map Container */}
      <div
        ref={mapRef}
        style={{ height, width }}
        className="rounded-lg overflow-hidden shadow-md"
      />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
          style={{ height, width }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Controls */}
      {isLoaded && (
        <div className="absolute top-4 left-4 space-y-2">
          {enableGeolocation && (
            <button
              onClick={handleFindMyLocation}
              disabled={geoLoading}
              className="bg-white hover:bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {geoLoading ? 'Finding...' : '📍 My Location'}
            </button>
          )}
          
          {showRestaurants && (
            <button
              onClick={handleSearchNearby}
              disabled={isSearching}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : '🍽️ Find Restaurants'}
            </button>
          )}
        </div>
      )}

      {/* Restaurant Count */}
      {restaurants.length > 0 && (
        <div className="absolute top-4 right-4 bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm">
          <p className="text-sm text-gray-700">
            {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} found
          </p>
        </div>
      )}

      {/* Error Messages */}
      {(searchError || geoError) && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-700">
            {searchError || geoError}
          </p>
        </div>
      )}

      {/* Selected Restaurant Info */}
      {selectedRestaurant && (
        <div className="absolute bottom-4 left-4 right-4 bg-white border border-gray-300 rounded-md p-4 shadow-lg">
          <h3 className="font-medium text-gray-900 mb-1">{selectedRestaurant.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{selectedRestaurant.address}</p>
          <div className="flex items-center space-x-4 text-sm">
            {selectedRestaurant.rating && (
              <span className="text-yellow-600">⭐ {selectedRestaurant.rating}/5</span>
            )}
            {selectedRestaurant.priceLevel && (
              <span className="text-green-600">{'$'.repeat(selectedRestaurant.priceLevel)}</span>
            )}
          </div>
          <button
            onClick={() => setSelectedRestaurant(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

// Simple Map Test Component
export function GoogleMapTest() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantLocation | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Google Maps Integration Test</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Map */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Map</h3>
            <GoogleMapComponent
              height="300px"
              enableGeolocation
            />
          </div>

          {/* Restaurant Map */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Restaurant Search</h3>
            <GoogleMapComponent
              height="300px"
              enableGeolocation
              showRestaurants
              onRestaurantClick={setSelectedRestaurant}
            />
          </div>
        </div>

        {/* Selected Restaurant Details */}
        {selectedRestaurant && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Selected Restaurant</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Name:</strong> {selectedRestaurant.name}</p>
                <p><strong>Address:</strong> {selectedRestaurant.address}</p>
                <p><strong>Coordinates:</strong> {selectedRestaurant.lat.toFixed(6)}, {selectedRestaurant.lng.toFixed(6)}</p>
              </div>
              <div>
                {selectedRestaurant.rating && <p><strong>Rating:</strong> ⭐ {selectedRestaurant.rating}/5</p>}
                {selectedRestaurant.priceLevel && <p><strong>Price:</strong> {'$'.repeat(selectedRestaurant.priceLevel)}</p>}
                {selectedRestaurant.phoneNumber && <p><strong>Phone:</strong> {selectedRestaurant.phoneNumber}</p>}
              </div>
            </div>
          </div>
        )}

        {/* API Status */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">API Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-blue-700">
                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 
                  '✅ Google Maps API configured' : 
                  '❌ Google Maps API not found'
                }
              </p>
            </div>
            <div>
              <p className="text-blue-700">
                {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? 
                  '✅ Gemini AI configured' : 
                  '❌ Gemini AI not found'
                }
              </p>
            </div>
            <div>
              <p className="text-blue-700">
                {process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ? 
                  '✅ Unsplash API configured' : 
                  '❌ Unsplash API not found'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
