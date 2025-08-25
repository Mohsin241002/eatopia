'use client';

import { useState } from 'react';
import { generateText, generateRestaurantRecommendations } from '@/lib/gemini';

export default function GeminiTest() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateText = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError('');
      const result = await generateText(prompt);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantRecommendation = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await generateRestaurantRecommendations(
        'I love spicy food, vegetarian options, and cozy atmosphere',
        'New York City'
      );
      setResponse(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gemini AI Integration Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter a prompt for Gemini AI:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={3}
            placeholder="Ask anything about restaurants, food, or anything else..."
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleGenerateText}
            disabled={loading || !prompt.trim()}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Response'}
          </button>

          <button
            onClick={handleRestaurantRecommendation}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Test Restaurant Recommendations'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">Error: {error}</p>
          </div>
        )}

        {response && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="font-medium text-gray-900 mb-2">Gemini Response:</h3>
            <div className="text-gray-700 whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-medium text-blue-900 mb-2">API Status:</h3>
        <p className="text-blue-700 text-sm">
          {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? 
            '✅ Gemini API key is configured' : 
            '❌ Gemini API key not found'
          }
        </p>
      </div>
    </div>
  );
}
