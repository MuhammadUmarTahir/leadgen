import { Neighborhood } from '../types';
import { getCityCoordinates } from './nominatim';
import { fetchNeighborhoods } from './overpass';
import { removeDuplicates, shuffleArray } from '../utils';

let cachedNeighborhoods: { [key: string]: Neighborhood[] } = {};

export async function searchNeighborhoods(city: string, state: string): Promise<Neighborhood[]> {
  const cacheKey = `${city.toLowerCase()}-${state.toLowerCase()}`;
  
  if (!cachedNeighborhoods[cacheKey]) {
    await getCityCoordinates(city, state);
    const neighborhoods = await fetchNeighborhoods(city);
    cachedNeighborhoods[cacheKey] = removeDuplicates(neighborhoods);
  }

  return shuffleArray([...cachedNeighborhoods[cacheKey]]);
}