// Haversine formula — calculates real-world distance between two GPS points
// Returns distance in kilometers

export function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

// Bangladesh center point — used for filtering
export const BANGLADESH_CENTER = {
  lat: 23.685,
  lon: 90.3563,
};

// Key cities we monitor
export const MONITORED_CITIES = [
  { name: 'ঢাকা', lat: 23.8103, lon: 90.4125 },
  { name: 'সিলেট', lat: 24.8949, lon: 91.8687 },
  { name: 'চট্টগ্রাম', lat: 22.3569, lon: 91.7832 },
  { name: 'মানিকগঞ্জ', lat: 23.8633, lon: 90.0052 },
];

export const ALERT_RADIUS_KM = 500;