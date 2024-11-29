import { Neighborhood } from './types';
import { shuffleArray } from './utils';

let cachedNeighborhoods: { [key: string]: Neighborhood[] } = {};

export async function searchNeighborhoods(city: string, state: string): Promise<Neighborhood[]> {
  const cacheKey = `${city.toLowerCase()}-${state.toLowerCase()}`;
  
  // Fetch new data if not cached
  if (!cachedNeighborhoods[cacheKey]) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
      city
    )}&state=${encodeURIComponent(state)}&country=USA&format=json`;

    const cityData = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'NeighborhoodFinder/1.0',
      },
    }).then((res) => res.json());

    if (!cityData?.[0]) {
      throw new Error('City not found');
    }

    const { lat, lon } = cityData[0];

    // Extended query to get more neighborhood data
    const query = `
      [out:json][timeout:25];
      area[name="${city}"][admin_level~"[48]"]->.searchArea;
      (
        way["place"="neighbourhood"](area.searchArea);
        relation["place"="neighbourhood"](area.searchArea);
        way["landuse"="residential"](area.searchArea);
        relation["landuse"="residential"](area.searchArea);
        way["place"="suburb"](area.searchArea);
        relation["place"="suburb"](area.searchArea);
      );
      out center;
    `;

    const overpassUrl = `https://overpass-api.de/api/interpreter`;
    const response = await fetch(overpassUrl, {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
    }).then((res) => res.json());

    const neighborhoods = response.elements
      .map((element: any) => ({
        name: element.tags.name || element.tags.description || `Area ${element.id}`,
        type: element.tags.place || element.tags.landuse || 'neighborhood',
        coordinates: element.center ? [element.center.lat, element.center.lon] : [element.lat, element.lon],
      }))
      .filter((n: Neighborhood) => n.name && !n.name.includes('undefined'));

    // Remove duplicates based on name and coordinates
    const uniqueNeighborhoods = Array.from(
      new Map(
        neighborhoods.map((n: Neighborhood) => [
          `${n.name}-${n.coordinates[0].toFixed(4)}-${n.coordinates[1].toFixed(4)}`,
          n
        ])
      ).values()
    );

    cachedNeighborhoods[cacheKey] = uniqueNeighborhoods;
  }

  // Return shuffled results
  return shuffleArray([...cachedNeighborhoods[cacheKey]]);
}
