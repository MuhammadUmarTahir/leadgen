'use client';

import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <MapPin className="h-8 w-8" />
        <h1 className="text-4xl font-bold">Neighborhood Finder</h1>
      </div>
      <p className="text-muted-foreground">
        Search for neighborhoods in any US city and export the results
      </p>
    </div>
  );
}