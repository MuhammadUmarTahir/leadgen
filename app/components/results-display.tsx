'use client';

import { Neighborhood } from '@/lib/types';
import { ExportButton } from './export-button';
import { NeighborhoodCard } from './neighborhood-card';

interface ResultsDisplayProps {
  neighborhoods: Neighborhood[];
  city: string;
  state: string;
}

export function ResultsDisplay({ neighborhoods, city, state }: ResultsDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Neighborhoods in {city}, {state}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Found {neighborhoods.length} neighborhoods. Results are randomly shuffled each time you search.
          </p>
        </div>
        <ExportButton neighborhoods={neighborhoods} city={city} state={state} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {neighborhoods.map((neighborhood) => (
          <NeighborhoodCard
            key={`${neighborhood.name}-${neighborhood.coordinates.join()}-${Math.random()}`}
            neighborhood={neighborhood}
          />
        ))}
      </div>
    </div>
  );
}