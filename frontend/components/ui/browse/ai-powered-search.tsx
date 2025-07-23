"use client";
import React, { useState, useEffect } from 'react';
import { Search, Zap, Sparkles, TrendingUp, Filter } from 'lucide-react';

type AISearchComponentProps = {
  onSearch: (query: string, isAiMode: boolean) => void;
  onSmartFilter: (suggestion: string) => void;
};

const AISearchComponent: React.FC<AISearchComponentProps> = ({ onSearch, onSmartFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated AI suggestions
  const smartSuggestions = [
    "Find mobile app projects under $5000",
    "Show me UI/UX tasks with tight deadlines",
    "React projects for senior developers",
    "Remote design work with good client ratings",
    "Fitness app related projects"
  ];

  const trendingSearches = [
    "Mobile App Design",
    "React Development", 
    "UI/UX Redesign",
    "Figma Projects",
    "Fitness Apps"
  ];

  useEffect(() => {
    if (searchQuery.length > 2 && isAiMode) {
      setIsLoading(true);
      // Simulate AI processing
      setTimeout(() => {
        setAiSuggestions(
          smartSuggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(searchQuery.toLowerCase())
          ).slice(0, 3)
        );
        setIsLoading(false);
      }, 500);
    } else {
      setAiSuggestions([]);
    }
  }, [searchQuery, isAiMode]);

  const handleSearch = (query = searchQuery) => {
    onSearch(query, isAiMode);
  };

  const handleAiFilter = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSmartFilter(suggestion);
  };

  return (
    <div className="relative">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={isAiMode ? "Describe what you're looking for..." : "Search tasks..."}
          className={`w-full pl-12 pr-20 py-4 border-2 rounded-xl text-lg transition-all ${
            isAiMode 
              ? 'border-purple-300 bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200' 
              : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        
        {/* AI Mode Toggle */}
        <button
          onClick={() => setIsAiMode(!isAiMode)}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all ${
            isAiMode
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Zap size={18} />
        </button>
      </div>

      {/* AI Mode Indicator */}
      {isAiMode && (
        <div className="flex items-center justify-center mt-3 text-purple-600">
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">AI-Powered Natural Language Search Active</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-3"></div>
            <span className="text-purple-700">AI is analyzing your search...</span>
          </div>
        </div>
      )}

      {/* AI Suggestions Dropdown */}
      {(aiSuggestions.length > 0 || (searchQuery.length === 0 && isAiMode)) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          {searchQuery.length === 0 && isAiMode && (
            <>
              {/* Smart Suggestions */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Smart Suggestions</h4>
                </div>
                <div className="space-y-2">
                  {smartSuggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleAiFilter(suggestion)}
                      className="block w-full text-left p-3 rounded-lg hover:bg-purple-50 text-gray-700 text-sm transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-4 h-4 text-orange-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Trending Searches</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(trend)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Dynamic AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="p-4">
              <div className="flex items-center mb-3">
                <Zap className="w-4 h-4 text-purple-600 mr-2" />
                <h4 className="font-semibold text-gray-900">AI Suggestions</h4>
              </div>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAiFilter(suggestion)}
                    className="block w-full text-left p-3 rounded-lg hover:bg-purple-50 text-gray-700 text-sm transition-colors border border-purple-100"
                  >
                    <Sparkles className="w-3 h-3 inline mr-2 text-purple-500" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

   
  
    </div>
  );
};

export default AISearchComponent;