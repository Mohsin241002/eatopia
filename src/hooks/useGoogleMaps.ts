'use client';

import { useEffect, useState, useRef } from 'react';
import {
  loadGoogleMaps,
  initializeMap,
  getCurrentLocation,
  searchRestaurants,
  RestaurantLocation,
  MapSearchOptions,
} from '@/lib/googlemaps';

export interface UseGoogleMapsOptions {
  center?: { lat: number; lng: number };
  zoom?: number;
  enableGeolocation?: boolean;
}

export interface UseGoogleMapsReturn {
  map: google.maps.Map | null;
  isLoaded: boolean;
  error: string | null;
  userLocation: { lat: number; lng: number } | null;
  mapRef: React.RefObject<HTMLDivElement>;
  searchRestaurants: (options: Partial<MapSearchOptions>) => Promise<RestaurantLocation[]>;
  centerOnLocation: (location: { lat: number; lng: number }) => void;
  centerOnUser: () => Promise<void>;
}

export function useGoogleMaps(options: UseGoogleMapsOptions = {}): UseGoogleMapsReturn {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    async function initMap() {
      try {
        if (!mapRef.current) {
          console.warn('Map container ref is not available');
          return;
        }

        setError(null);
        
        // Get user location if enabled
        let center = options.center || { lat: 40.7831, lng: -73.9712 }; // Default to NYC
        
        if (options.enableGeolocation) {
          const location = await getCurrentLocation();
          if (location) {
            center = location;
            setUserLocation(location);
          }
        }

        // Initialize the map
        const mapInstance = await initializeMap(mapRef.current, {
          center,
          zoom: options.zoom || 13,
        });

        setMap(mapInstance);
        setIsLoaded(true);
      } catch (err: any) {
        console.error('Error initializing Google Maps:', err);
        setError(err.message || 'Failed to initialize Google Maps');
        setIsLoaded(false);
      }
    }

    initMap();
  }, [options.center?.lat, options.center?.lng, options.zoom, options.enableGeolocation]);

  // Search restaurants function
  const handleSearchRestaurants = async (searchOptions: Partial<MapSearchOptions>): Promise<RestaurantLocation[]> => {
    try {
      if (!map) {
        throw new Error('Map not initialized');
      }

      const center = searchOptions.location || userLocation || options.center || { lat: 40.7831, lng: -73.9712 };
      
      const restaurants = await searchRestaurants({
        location: center,
        radius: 1000,
        type: 'restaurant',
        maxResults: 20,
        ...searchOptions,
      });

      return restaurants;
    } catch (err: any) {
      console.error('Error searching restaurants:', err);
      setError(err.message || 'Failed to search restaurants');
      return [];
    }
  };

  // Center map on location
  const centerOnLocation = (location: { lat: number; lng: number }) => {
    if (map) {
      map.setCenter(location);
      map.setZoom(15);
    }
  };

  // Center map on user location
  const centerOnUser = async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        setUserLocation(location);
        centerOnLocation(location);
      } else {
        setError('Unable to get your location');
      }
    } catch (err: any) {
      console.error('Error getting user location:', err);
      setError(err.message || 'Failed to get your location');
    }
  };

  return {
    map,
    isLoaded,
    error,
    userLocation,
    mapRef,
    searchRestaurants: handleSearchRestaurants,
    centerOnLocation,
    centerOnUser,
  };
}

// Hook for restaurant search
export interface UseRestaurantSearchOptions {
  autoSearch?: boolean;
  location?: { lat: number; lng: number };
  radius?: number;
  cuisine?: string;
}

export interface UseRestaurantSearchReturn {
  restaurants: RestaurantLocation[];
  isSearching: boolean;
  error: string | null;
  searchRestaurants: (options?: Partial<MapSearchOptions>) => Promise<void>;
  clearResults: () => void;
}

export function useRestaurantSearch(options: UseRestaurantSearchOptions = {}): UseRestaurantSearchReturn {
  const [restaurants, setRestaurants] = useState<RestaurantLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto search on mount if enabled
  useEffect(() => {
    if (options.autoSearch && options.location) {
      handleSearchRestaurants({
        location: options.location,
        radius: options.radius,
        keyword: options.cuisine,
      });
    }
  }, [options.autoSearch, options.location?.lat, options.location?.lng, options.radius, options.cuisine]);

  const handleSearchRestaurants = async (searchOptions: Partial<MapSearchOptions> = {}) => {
    try {
      setIsSearching(true);
      setError(null);

      const location = searchOptions.location || options.location;
      if (!location) {
        throw new Error('Location is required for restaurant search');
      }

      const results = await searchRestaurants({
        location,
        radius: options.radius || 1000,
        keyword: options.cuisine,
        type: 'restaurant',
        maxResults: 50,
        ...searchOptions,
      });

      setRestaurants(results);
    } catch (err: any) {
      console.error('Error searching restaurants:', err);
      setError(err.message || 'Failed to search restaurants');
      setRestaurants([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearResults = () => {
    setRestaurants([]);
    setError(null);
  };

  return {
    restaurants,
    isSearching,
    error,
    searchRestaurants: handleSearchRestaurants,
    clearResults,
  };
}

// Hook for geolocation
export interface UseGeolocationReturn {
  location: { lat: number; lng: number } | null;
  isLoading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<void>;
}

export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userLocation = await getCurrentLocation();
      if (userLocation) {
        setLocation(userLocation);
      } else {
        setError('Unable to get your location');
      }
    } catch (err: any) {
      console.error('Error getting location:', err);
      setError(err.message || 'Failed to get your location');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    location,
    isLoading,
    error,
    getCurrentLocation: handleGetCurrentLocation,
  };
}
