'use client';

import { Neighborhood } from '@/lib/types';
import { formatCoordinates } from '@/lib/utils';

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

export function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold line-clamp-2">{neighborhood.name}</h3>
      <p className="text-xs text-muted-foreground mt-1">{neighborhood.type}</p>
      <p className="text-sm text-muted-foreground mt-2">
        {formatCoordinates(neighborhood.coordinates[0], neighborhood.coordinates[1])}
      </p>
    </div>
  );
}