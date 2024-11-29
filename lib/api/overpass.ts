import { Neighborhood } from '../types';

export async function fetchNeighborhoods(city: string): Promise<Neighborhood[]> {
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

  return response.elements
    .map((element: any) => ({
      name: element.tags.name || element.tags.description || `Area ${element.id}`,
      type: element.tags.place || element.tags.landuse || 'neighborhood',
      coordinates: element.center ? [element.center.lat, element.center.lon] : [element.lat, element.lon],
    }))
    .filter((n: Neighborhood) => n.name && !n.name.includes('undefined'));
}