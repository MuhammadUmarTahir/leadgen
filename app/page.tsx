'use client';

import { useState } from 'react';
import { SearchForm } from '@/app/components/search-form';
import { ResultsDisplay } from '@/app/components/results-display';
import { Header } from '@/app/components/header';
import { searchNeighborhoods } from '@/lib/api';
import { Neighborhood } from '@/lib/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<{
    neighborhoods: Neighborhood[];
    city: string;
    state: string;
  } | null>(null);

  const handleSearch = async (city: string, state: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const neighborhoods = await searchNeighborhoods(city, state);
      setSearchResults({ neighborhoods, city, state });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4 space-y-8">
      <Header />
      <div className="max-w-2xl mx-auto">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </div>
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg max-w-2xl mx-auto">
          {error}
        </div>
      )}
      {searchResults && (
        <ResultsDisplay
          neighborhoods={searchResults.neighborhoods}
          city={searchResults.city}
          state={searchResults.state}
        />
      )}
    </main>
  );
}