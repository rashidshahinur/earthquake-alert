import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getDistanceKm, BANGLADESH_CENTER, ALERT_RADIUS_KM } from '../utils/distance';

const HOUR_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
const DAY_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

const REFRESH_INTERVAL = 60000;
const CACHE_KEY_NEARBY = 'cached_nearby_quakes';
const CACHE_KEY_RECENT = 'cached_recent_quakes';
const CACHE_KEY_TIME = 'cached_quakes_time';

async function sendTelegramAlert(quake) {
  try {
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        magnitude: quake.magnitude,
        place: quake.place,
        distance: quake.distanceFromDhaka,
        depth: quake.depth,
        time: quake.time,
      }),
    });
  } catch (err) {
    console.error('Alert failed:', err);
  }
}

function parseFeature(feature) {
  const { properties, geometry } = feature;
  const lon = geometry.coordinates[0];
  const lat = geometry.coordinates[1];
  const depth = geometry.coordinates[2];

  const distanceFromDhaka = getDistanceKm(
    BANGLADESH_CENTER.lat,
    BANGLADESH_CENTER.lon,
    lat,
    lon
  );

  return {
    id: feature.id,
    magnitude: properties.mag,
    place: properties.place,
    time: properties.time,
    felt: properties.felt,
    alert: properties.alert,
    lat,
    lon,
    depth,
    distanceFromDhaka,
  };
}

function saveToCache(nearby, recent) {
  try {
    localStorage.setItem(CACHE_KEY_NEARBY, JSON.stringify(nearby));
    localStorage.setItem(CACHE_KEY_RECENT, JSON.stringify(recent));
    localStorage.setItem(CACHE_KEY_TIME, Date.now().toString());
  } catch (err) {
    console.error('Cache save failed:', err);
  }
}

function loadFromCache() {
  try {
    const nearby = JSON.parse(localStorage.getItem(CACHE_KEY_NEARBY) || '[]');
    const recent = JSON.parse(localStorage.getItem(CACHE_KEY_RECENT) || '[]');
    const time = parseInt(localStorage.getItem(CACHE_KEY_TIME) || '0');
    return { nearby, recent, time };
  } catch (err) {
    return { nearby: [], recent: [], time: 0 };
  }
}

export function useEarthquakeData() {
  const [nearbyQuakes, setNearbyQuakes] = useState([]);
  const [recentQuakes, setRecentQuakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isFromCache, setIsFromCache] = useState(false);
  const [cacheTime, setCacheTime] = useState(null);

  // Listen for online/offline events
  useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
      fetchData();
    }
    function handleOffline() {
      setIsOffline(true);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchData = useCallback(async () => {
    // If offline, load from cache immediately
    if (!navigator.onLine) {
      const cache = loadFromCache();
      if (cache.nearby.length > 0 || cache.recent.length > 0) {
        setNearbyQuakes(cache.nearby);
        setRecentQuakes(cache.recent);
        setCacheTime(new Date(cache.time));
        setIsFromCache(true);
      }
      setLoading(false);
      setIsOffline(true);
      return;
    }

    try {
      setError(null);
      setIsOffline(false);

      const [hourRes, dayRes] = await Promise.all([
        axios.get(HOUR_URL),
        axios.get(DAY_URL),
      ]);

      const nearby = hourRes.data.features
        .map(parseFeature)
        .filter((q) => q.distanceFromDhaka <= ALERT_RADIUS_KM)
        .sort((a, b) => b.magnitude - a.magnitude);

      const recent = dayRes.data.features
        .map(parseFeature)
        .filter((q) => q.distanceFromDhaka <= ALERT_RADIUS_KM)
        .sort((a, b) => b.time - a.time);

      // Save fresh data to cache
      saveToCache(nearby, recent);
      setIsFromCache(false);
      setCacheTime(null);

      // Send Telegram alert if new significant quake found
      if (nearby.length > 0 && nearby[0].magnitude >= 4.0) {
        const topQuake = nearby[0];
        const lastAlertedId = sessionStorage.getItem('lastAlertedQuakeId');
        if (lastAlertedId !== topQuake.id) {
          sessionStorage.setItem('lastAlertedQuakeId', topQuake.id);
          sendTelegramAlert(topQuake);
        }
      }

      setNearbyQuakes(nearby);
      setRecentQuakes(recent);
      setLastUpdated(new Date());
      setCountdown(60);
    } catch (err) {
      // Network failed — try cache
      const cache = loadFromCache();
      if (cache.nearby.length > 0 || cache.recent.length > 0) {
        setNearbyQuakes(cache.nearby);
        setRecentQuakes(cache.recent);
        setCacheTime(new Date(cache.time));
        setIsFromCache(true);
        setError(null);
      } else {
        setError('তথ্য লোড করতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন।');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdated]);

  const topQuake = nearbyQuakes.length > 0 ? nearbyQuakes[0] : null;

  return {
    nearbyQuakes,
    recentQuakes,
    topQuake,
    loading,
    error,
    lastUpdated,
    countdown,
    isOffline,
    isFromCache,
    cacheTime,
    refresh: fetchData,
  };
}