// Google Maps TypeScript declarations for better type support

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

// Extend the existing Google Maps types with additional properties
declare namespace google.maps {
  interface MapOptions {
    mapId?: string;
    gestureHandling?: 'auto' | 'cooperative' | 'greedy' | 'none';
    restriction?: {
      latLngBounds: LatLngBounds;
      strictBounds?: boolean;
    };
  }

  interface MarkerOptions {
    animation?: Animation;
    clickable?: boolean;
    crossOnDrag?: boolean;
    cursor?: string;
    draggable?: boolean;
    icon?: string | Icon | Symbol;
    label?: string | MarkerLabel;
    map?: Map | StreetViewPanorama;
    opacity?: number;
    optimized?: boolean;
    position?: LatLng | LatLngLiteral;
    shape?: MarkerShape;
    title?: string;
    visible?: boolean;
    zIndex?: number;
  }

  namespace places {
    interface PlaceResult {
      business_status?: BusinessStatus;
      formatted_address?: string;
      geometry?: PlaceGeometry;
      icon?: string;
      icon_background_color?: string;
      icon_mask_base_uri?: string;
      name?: string;
      opening_hours?: PlaceOpeningHours;
      photos?: PlacePhoto[];
      place_id?: string;
      price_level?: number;
      rating?: number;
      types?: string[];
      user_ratings_total?: number;
      vicinity?: string;
      website?: string;
      formatted_phone_number?: string;
      international_phone_number?: string;
      reviews?: PlaceReview[];
      url?: string;
      utc_offset_minutes?: number;
      scope?: string;
      plus_code?: PlusCode;
      permanently_closed?: boolean;
      editorial_summary?: PlaceEditorialSummary;
    }

    interface PlaceSearchRequest {
      bounds?: LatLngBounds | LatLngBoundsLiteral;
      location?: LatLng | LatLngLiteral;
      radius?: number;
      keyword?: string;
      name?: string;
      openNow?: boolean;
      rankBy?: RankBy;
      type?: string;
      minPriceLevel?: number;
      maxPriceLevel?: number;
    }

    interface TextSearchRequest {
      bounds?: LatLngBounds | LatLngBoundsLiteral;
      location?: LatLng | LatLngLiteral;
      radius?: number;
      query: string;
      type?: string;
    }

    interface PlaceDetailsRequest {
      placeId: string;
      fields?: string[];
      sessionToken?: AutocompleteSessionToken;
      region?: string;
      language?: string;
    }

    interface AutocompleteOptions {
      bounds?: LatLngBounds | LatLngBoundsLiteral;
      componentRestrictions?: ComponentRestrictions;
      fields?: string[];
      origin?: LatLng | LatLngLiteral;
      sessionToken?: AutocompleteSessionToken;
      strictBounds?: boolean;
      types?: string[];
    }

    interface ComponentRestrictions {
      country?: string | string[];
    }

    interface PlaceEditorialSummary {
      overview?: string;
    }

    interface PlusCode {
      compound_code?: string;
      global_code?: string;
    }

    enum BusinessStatus {
      CLOSED_PERMANENTLY = 'CLOSED_PERMANENTLY',
      CLOSED_TEMPORARILY = 'CLOSED_TEMPORARILY',
      OPERATIONAL = 'OPERATIONAL',
    }

    enum RankBy {
      DISTANCE = 0,
      PROMINENCE = 1,
    }
  }
}

// Restaurant-specific type extensions
export interface ExtendedRestaurantData {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  price_level?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: string[];
  }>;
  opening_hours?: {
    open_now: boolean;
    periods: Array<{
      close: { day: number; time: string };
      open: { day: number; time: string };
    }>;
    weekday_text: string[];
  };
  reviews?: Array<{
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }>;
  types: string[];
  user_ratings_total?: number;
  vicinity?: string;
  website?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  url?: string;
  utc_offset_minutes?: number;
  business_status?: google.maps.places.BusinessStatus;
}

// Map event types
export interface MapClickEvent {
  latLng: google.maps.LatLng;
  pixel: google.maps.Point;
}

export interface MarkerClickEvent {
  marker: google.maps.Marker;
  restaurant?: ExtendedRestaurantData;
}

// Search and filter types
export interface RestaurantSearchFilters {
  cuisine?: string[];
  priceLevel?: number[];
  rating?: number;
  openNow?: boolean;
  distance?: number;
  sortBy?: 'distance' | 'rating' | 'price' | 'popularity';
}

export interface LocationBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface SearchArea {
  center: { lat: number; lng: number };
  radius: number;
  bounds?: LocationBounds;
}

// Geolocation types
export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
}

// Direction and route types
export interface RouteOptions {
  origin: string | { lat: number; lng: number };
  destination: string | { lat: number; lng: number };
  waypoints?: Array<{
    location: string | { lat: number; lng: number };
    stopover?: boolean;
  }>;
  travelMode?: google.maps.TravelMode;
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  optimizeWaypoints?: boolean;
}

export interface DistanceResult {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
}

// Component prop types
export interface MapComponentProps {
  height?: string | number;
  width?: string | number;
  center?: { lat: number; lng: number };
  zoom?: number;
  mapType?: google.maps.MapTypeId;
  gestureHandling?: 'auto' | 'cooperative' | 'greedy' | 'none';
  zoomControl?: boolean;
  mapTypeControl?: boolean;
  streetViewControl?: boolean;
  fullscreenControl?: boolean;
  onMapClick?: (event: MapClickEvent) => void;
  onMapReady?: (map: google.maps.Map) => void;
}

export interface RestaurantMapProps extends MapComponentProps {
  restaurants?: ExtendedRestaurantData[];
  selectedRestaurant?: ExtendedRestaurantData | null;
  onRestaurantSelect?: (restaurant: ExtendedRestaurantData) => void;
  showUserLocation?: boolean;
  enableSearch?: boolean;
  searchFilters?: RestaurantSearchFilters;
  customMarkerIcon?: string | google.maps.Icon | google.maps.Symbol;
}

// Error types
export interface MapError {
  code: 'LOAD_ERROR' | 'GEOCODING_ERROR' | 'PLACES_ERROR' | 'GEOLOCATION_ERROR';
  message: string;
  details?: any;
}

export type {};
