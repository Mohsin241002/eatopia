import { Loader } from '@googlemaps/js-api-loader';

// Google Maps API configuration
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Google Maps API key not found. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.');
}

// Initialize Google Maps loader
export const mapsLoader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY || '',
  version: 'weekly',
  libraries: ['places', 'geometry', 'geocoding'],
});

// Types for restaurant locations
export interface RestaurantLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  priceLevel?: number;
  cuisine?: string;
  phoneNumber?: string;
  website?: string;
  photos?: string[];
  openingHours?: string[];
  reviews?: any[];
}

export interface MapSearchOptions {
  location: { lat: number; lng: number };
  radius?: number; // in meters, default 1000
  keyword?: string;
  type?: string; // restaurant, cafe, etc.
  minRating?: number;
  maxResults?: number;
}

// Load Google Maps API
export async function loadGoogleMaps(): Promise<typeof google> {
  try {
    const google = await mapsLoader.load();
    return google;
  } catch (error) {
    console.error('Error loading Google Maps:', error);
    throw error;
  }
}

// Initialize a map
export async function initializeMap(
  container: HTMLElement,
  options: google.maps.MapOptions
): Promise<google.maps.Map> {
  try {
    const google = await loadGoogleMaps();
    const map = new google.maps.Map(container, {
      zoom: 13,
      center: { lat: 40.7831, lng: -73.9712 }, // Default to NYC
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      ...options,
    });
    return map;
  } catch (error) {
    console.error('Error initializing map:', error);
    throw error;
  }
}

// Geocode an address to get coordinates
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const google = await loadGoogleMaps();
    const geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          console.error('Geocoding failed:', status);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

// Reverse geocode coordinates to get address
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const google = await loadGoogleMaps();
    const geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          resolve(results[0].formatted_address);
        } else {
          console.error('Reverse geocoding failed:', status);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}

// Search for restaurants using Places API
export async function searchRestaurants(options: MapSearchOptions): Promise<RestaurantLocation[]> {
  try {
    const google = await loadGoogleMaps();
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    
    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(options.location.lat, options.location.lng),
      radius: options.radius || 1000,
      type: options.type || 'restaurant',
      keyword: options.keyword,
    };

    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const restaurants: RestaurantLocation[] = results
            .filter(place => {
              if (options.minRating && place.rating && place.rating < options.minRating) {
                return false;
              }
              return true;
            })
            .slice(0, options.maxResults || 20)
            .map(place => ({
              id: place.place_id || '',
              name: place.name || '',
              address: place.vicinity || '',
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              rating: place.rating,
              priceLevel: place.price_level,
              photos: place.photos?.map(photo => photo.getUrl({ maxWidth: 400 })) || [],
            }));
          
          resolve(restaurants);
        } else {
          console.error('Places search failed:', status);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Error searching restaurants:', error);
    return [];
  }
}

// Get detailed information about a specific restaurant
export async function getRestaurantDetails(placeId: string): Promise<RestaurantLocation | null> {
  try {
    const google = await loadGoogleMaps();
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    
    return new Promise((resolve, reject) => {
      service.getDetails(
        {
          placeId: placeId,
          fields: [
            'name',
            'formatted_address',
            'geometry',
            'rating',
            'price_level',
            'formatted_phone_number',
            'website',
            'photos',
            'opening_hours',
            'reviews',
          ],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const restaurant: RestaurantLocation = {
              id: placeId,
              name: place.name || '',
              address: place.formatted_address || '',
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              rating: place.rating,
              priceLevel: place.price_level,
              phoneNumber: place.formatted_phone_number,
              website: place.website,
              photos: place.photos?.map(photo => photo.getUrl({ maxWidth: 800 })) || [],
              openingHours: place.opening_hours?.weekday_text || [],
              reviews: place.reviews || [],
            };
            resolve(restaurant);
          } else {
            console.error('Place details request failed:', status);
            resolve(null);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error getting restaurant details:', error);
    return null;
  }
}

// Add markers to a map for restaurants
export async function addRestaurantMarkers(
  map: google.maps.Map,
  restaurants: RestaurantLocation[],
  onMarkerClick?: (restaurant: RestaurantLocation) => void
): Promise<google.maps.Marker[]> {
  try {
    const google = await loadGoogleMaps();
    const markers: google.maps.Marker[] = [];

    restaurants.forEach(restaurant => {
      const marker = new google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: map,
        title: restaurant.name,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
          scaledSize: new google.maps.Size(32, 32),
        },
      });

      if (onMarkerClick) {
        marker.addListener('click', () => onMarkerClick(restaurant));
      }

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px;">${restaurant.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${restaurant.address}</p>
            ${restaurant.rating ? `<p style="margin: 0; font-size: 12px;">⭐ ${restaurant.rating}/5</p>` : ''}
            ${restaurant.priceLevel ? `<p style="margin: 0; font-size: 12px;">${'$'.repeat(restaurant.priceLevel)}</p>` : ''}
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });

    return markers;
  } catch (error) {
    console.error('Error adding restaurant markers:', error);
    return [];
  }
}

// Get user's current location
export async function getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting current location:', error);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

// Calculate distance between two points
export async function calculateDistance(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): Promise<{ distance: string; duration: string } | null> {
  try {
    const google = await loadGoogleMaps();
    const service = new google.maps.DistanceMatrixService();

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [new google.maps.LatLng(origin.lat, origin.lng)],
          destinations: [new google.maps.LatLng(destination.lat, destination.lng)],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          if (status === 'OK' && response && response.rows[0]?.elements[0]) {
            const element = response.rows[0].elements[0];
            if (element.status === 'OK') {
              resolve({
                distance: element.distance?.text || '',
                duration: element.duration?.text || '',
              });
            } else {
              resolve(null);
            }
          } else {
            console.error('Distance calculation failed:', status);
            resolve(null);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error calculating distance:', error);
    return null;
  }
}

// Autocomplete for restaurant/address search
export async function initializeAutocomplete(
  inputElement: HTMLInputElement,
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void,
  options?: {
    types?: string[];
    bounds?: google.maps.LatLngBounds;
    componentRestrictions?: google.maps.places.ComponentRestrictions;
  }
): Promise<google.maps.places.Autocomplete> {
  try {
    const google = await loadGoogleMaps();
    
    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      types: options?.types || ['establishment'],
      bounds: options?.bounds,
      componentRestrictions: options?.componentRestrictions,
    });

    if (onPlaceSelected) {
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      });
    }

    return autocomplete;
  } catch (error) {
    console.error('Error initializing autocomplete:', error);
    throw error;
  }
}

// Restaurant-specific utility functions
export const RestaurantMapUtils = {
  // Search for restaurants near a location
  async findRestaurantsNearby(
    location: { lat: number; lng: number },
    radius: number = 1000,
    cuisine?: string
  ): Promise<RestaurantLocation[]> {
    return searchRestaurants({
      location,
      radius,
      keyword: cuisine,
      type: 'restaurant',
      maxResults: 50,
    });
  },

  // Get restaurants along a route (for road trips)
  async findRestaurantsAlongRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    maxDetour: number = 5000 // meters
  ): Promise<RestaurantLocation[]> {
    // This is a simplified version - in practice you'd use the Directions API
    // to get the route and search for restaurants along waypoints
    const midpoint = {
      lat: (origin.lat + destination.lat) / 2,
      lng: (origin.lng + destination.lng) / 2,
    };
    
    return searchRestaurants({
      location: midpoint,
      radius: maxDetour,
      type: 'restaurant',
      maxResults: 20,
    });
  },

  // Filter restaurants by criteria
  filterRestaurants(
    restaurants: RestaurantLocation[],
    filters: {
      minRating?: number;
      maxPriceLevel?: number;
      cuisine?: string;
      openNow?: boolean;
    }
  ): RestaurantLocation[] {
    return restaurants.filter(restaurant => {
      if (filters.minRating && restaurant.rating && restaurant.rating < filters.minRating) {
        return false;
      }
      if (filters.maxPriceLevel && restaurant.priceLevel && restaurant.priceLevel > filters.maxPriceLevel) {
        return false;
      }
      if (filters.cuisine && !restaurant.name.toLowerCase().includes(filters.cuisine.toLowerCase())) {
        return false;
      }
      return true;
    });
  },
};

export default {
  loadGoogleMaps,
  initializeMap,
  geocodeAddress,
  reverseGeocode,
  searchRestaurants,
  getRestaurantDetails,
  addRestaurantMarkers,
  getCurrentLocation,
  calculateDistance,
  initializeAutocomplete,
  RestaurantMapUtils,
};
