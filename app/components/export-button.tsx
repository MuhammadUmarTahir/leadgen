'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Neighborhood } from '@/lib/types';

interface ExportButtonProps {
  neighborhoods: Neighborhood[];
  city: string;
  state: string;
}

export function ExportButton({ neighborhoods, city, state }: ExportButtonProps) {
  const handleExport = () => {
    const csv = [
      ['Neighborhood Name', 'Type', 'Latitude', 'Longitude'].join(','),
      ...neighborhoods.map((n) => [n.name, n.type, n.coordinates[0], n.coordinates[1]].join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${city}-${state}-neighborhoods-page${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Export Current Page
    </Button>
  );
}