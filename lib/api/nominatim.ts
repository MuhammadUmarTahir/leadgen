export async function getCityCoordinates(city: string, state: string) {
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

  return {
    lat: cityData[0].lat,
    lon: cityData[0].lon,
  };
}