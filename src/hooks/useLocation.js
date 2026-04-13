import { useState, useEffect } from 'react';

export function useLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationStatus, setLocationStatus] = useState('pending');
  // pending | granted | denied | unsupported

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      setLocationError('আপনার ডিভাইস লোকেশন সাপোর্ট করে না।');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLocationStatus('granted');
        setLocationError(null);
      },
      (err) => {
        setLocationStatus('denied');
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setLocationError('permission_denied');
            break;
          case err.POSITION_UNAVAILABLE:
            setLocationError('position_unavailable');
            break;
          case err.TIMEOUT:
            setLocationError('timeout');
            break;
          default:
            setLocationError('unknown');
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache location for 5 minutes
      }
    );
  }, []);

  return { userLocation, locationError, locationStatus };
}
