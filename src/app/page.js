'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [query, setQuery] = useState('');
  const [roguePrompt, setRoguePrompt] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/generate-rogue-prompt?query=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('this is response', response)
      const data = await response.json();
      setRoguePrompt(data.roguePrompt);
      router.push(`?query=${encodeURIComponent(query)}`, { shallow: true });
    } catch (error) {
      console.error('Error generating rogue prompt:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Bypass Any Language Model</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="query" className="block mb-2">Enter your query:</label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded">
            Generate
          </button>
        </form>

        {roguePrompt && (
          <div className="mt-8 p-4 bg-gray-800 rounded">
            <h2 className="text-xl font-semibold mb-2">Generated Rogue Prompt:</h2>
            <p>{roguePrompt}</p>
          </div>
        )}
      </main>
    </div>
  );
}

