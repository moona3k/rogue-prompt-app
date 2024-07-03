'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [roguePrompt, setRoguePrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/generate-rogue-prompt?query=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRoguePrompt(data.roguePrompt);
      router.push(`?query=${encodeURIComponent(query)}`, { shallow: true });
    } catch (error) {
      console.error('Error generating rogue prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 sm:p-6 md:p-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Prompt Alchemist
        </h1>
        
        <p className="text-center mb-8 text-gray-300">
          Transform ordinary queries into extraordinary prompts
        </p>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your query..."
              required
            />
            <Zap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Generating...' : 'Transform'}</span>
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        {roguePrompt && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Alchemized Prompt:</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{roguePrompt}</p>
          </div>
        )}
      </main>
    </div>
  );
}