'use client';

import RestaurantImage from './RestaurantImage';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  imageQuery: string;
}

const sampleRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "The Garden Bistro",
    cuisine: "French",
    rating: 4.8,
    priceRange: "$$$",
    imageQuery: "french restaurant elegant dining"
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    rating: 4.7,
    priceRange: "$$",
    imageQuery: "japanese sushi restaurant"
  },
  {
    id: 3,
    name: "Nonna's Kitchen",
    cuisine: "Italian",
    rating: 4.6,
    priceRange: "$$",
    imageQuery: "italian restaurant pasta pizza"
  },
  {
    id: 4,
    name: "The Steakhouse",
    cuisine: "American",
    rating: 4.9,
    priceRange: "$$$$",
    imageQuery: "steakhouse restaurant grilled meat"
  },
  {
    id: 5,
    name: "Spice Route",
    cuisine: "Indian",
    rating: 4.5,
    priceRange: "$$",
    imageQuery: "indian restaurant curry spices"
  },
  {
    id: 6,
    name: "Café Luna",
    cuisine: "Cafe",
    rating: 4.4,
    priceRange: "$",
    imageQuery: "coffee shop cafe interior"
  }
];

export default function RestaurantGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleRestaurants.map((restaurant, index) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <RestaurantImage
              query={restaurant.imageQuery}
              width={400}
              height={250}
              className="w-full"
              alt={`${restaurant.name} restaurant interior`}
              index={index}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
              <p className="text-gray-600 mb-2">{restaurant.cuisine} Cuisine</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm text-gray-600">{restaurant.rating}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{restaurant.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
