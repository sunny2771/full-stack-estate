const CITY_COORDS = {
  houston: [29.7604, -95.3698],
  dallas: [32.7767, -96.797],
  austin: [30.2672, -97.7431],
  "new york": [40.7128, -74.006],
  "los angeles": [34.0522, -118.2437],
  chicago: [41.8781, -87.6298],
  miami: [25.7617, -80.1918],
  london: [51.5074, -0.1278],
  birmingham: [52.4797, -1.90269],
};

export function parseCoord(value) {
  const num = Number.parseFloat(value);
  return Number.isFinite(num) ? num : null;
}

export function coordsForCity(city) {
  if (!city) return [29.7604, -95.3698];
  const match = CITY_COORDS[String(city).trim().toLowerCase()];
  return match || [29.7604, -95.3698];
}

export function withMapCoords(post, index = 0) {
  if (!post) return post;
  let lat = parseCoord(post.latitude);
  let lng = parseCoord(post.longitude);
  if (lat === null || lng === null) {
    [lat, lng] = coordsForCity(post.city);
    lng += index * 0.012;
  }
  return {
    ...post,
    latitude: String(lat),
    longitude: String(lng),
  };
}
