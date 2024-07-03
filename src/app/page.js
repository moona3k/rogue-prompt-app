'use client';

import React, { useState } from 'react';
import { ArrowRight, Zap, Copy, Check, AlertCircle } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [roguePrompt, setRoguePrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRoguePrompt('');
    setError('');
    try {
      const response = await fetch(`/api/generate-rogue-prompt?query=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setRoguePrompt(data.roguePrompt);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(roguePrompt);
      setIsCopied(true);
      setShowTooltip(true);
      setTimeout(() => {
        setIsCopied(false);
        setShowTooltip(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy text. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <main className="w-full max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Prompt Liberator
        </h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 bg-gray-900 border-2 border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
              placeholder="Enter your prompt"
              required
            />
            <Zap className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
          </div>
          <button 
            type="submit" 
            className="w-full p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 text-lg font-semibold"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Liberating...' : 'Liberate'}</span>
            {!isLoading && <ArrowRight size={24} />}
          </button>
        </form>

        {error && (
          <div className="mb-8 p-4 bg-red-900/50 text-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle size={24} />
            <span>{error}</span>
          </div>
        )}

        {roguePrompt && (
          <div className="mt-8 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800 relative">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">Liberated Prompt:</h2>
            <p className="text-gray-300 whitespace-pre-wrap pr-10 mb-4">{roguePrompt}</p>
            <div className="absolute top-4 right-4">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300"
                title="Copy to clipboard"
              >
                {isCopied ? <Check size={24} className="text-green-400" /> : <Copy size={24} />}
              </button>
              {showTooltip && (
                <div className="absolute right-0 mt-2 py-1 px-2 bg-green-500 text-white text-xs rounded shadow-lg">
                  Copied!
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}