import { useState } from "react";
import { useEarthquakeData } from "./hooks/useEarthquakeData";
import AlertBanner from "./components/AlertBanner";
import EarthquakeList from "./components/EarthquakeList";
import SafetyTips from "./components/SafetyTips";
import StatusBar from "./components/StatusBar";
import TestPanel from "./components/TestPanel";
import OfflineBanner from "./components/OfflineBanner";
import LocationBanner from "./components/LocationBanner";
import { useLocation } from "./hooks/useLocation";


const IS_DEV = import.meta.env.DEV;

function makeTestQuake(magnitude) {
  return {
    id: "test-quake",
    magnitude,
    place: "টেস্ট · ঢাকার কাছে (কাল্পনিক)",
    time: Date.now(),
    felt: 42,
    alert: magnitude >= 6 ? "red" : magnitude >= 5 ? "orange" : "green",
    lat: 23.8103,
    lon: 90.4125,
    depth: 15,
    distanceFromDhaka: 12,
  };
}

function SkeletonBlock({ h = "h-6", w = "w-full", rounded = "rounded-lg" }) {
  return <div className={"shimmer " + h + " " + w + " " + rounded} />;
}

function LoadingSkeleton() {
  return (
    <div className="mx-4 mt-4 space-y-4">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-5 space-y-4">
        <div className="flex gap-4">
          <SkeletonBlock h="h-20" w="w-20" rounded="rounded-2xl" />
          <div className="flex-1 space-y-2 pt-1">
            <SkeletonBlock h="h-3" w="w-24" />
            <SkeletonBlock h="h-6" w="w-40" />
            <SkeletonBlock h="h-3" w="w-32" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <SkeletonBlock h="h-14" />
          <SkeletonBlock h="h-14" />
          <SkeletonBlock h="h-14" />
        </div>
        <SkeletonBlock h="h-12" rounded="rounded-xl" />
      </div>
      <div className="space-y-3">
        <SkeletonBlock h="h-16" rounded="rounded-xl" />
        <SkeletonBlock h="h-16" rounded="rounded-xl" />
        <SkeletonBlock h="h-16" rounded="rounded-xl" />
      </div>
    </div>
  );
}

export default function App() {
  const {
    topQuake,
    recentQuakes,
    loading,
    error,
    lastUpdated,
    countdown,
    refresh,
    isOffline,
    isFromCache,
    cacheTime,
  } = useEarthquakeData();

  const { userLocation, locationError, locationStatus } = useLocation();
  const [testQuake, setTestQuake] = useState(null);
  const isTestActive = testQuake !== null;
  const displayQuake = isTestActive ? testQuake : topQuake;

  function handleTest(magnitude) {
    setTestQuake(makeTestQuake(magnitude));
  }

  function handleReset() {
    setTestQuake(null);
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white"
      style={{ fontFamily: "Noto Sans Bengali, sans-serif" }}
    >
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/80">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-lg">
              🌍
            </div>
            <div>
              <h1 className="text-white font-extrabold text-base leading-tight tracking-tight">
                ভূমিকম্প সতর্কতা
              </h1>
              <p className="text-slate-500 text-xs">বাংলাদেশ · ৫০০ কিমি রেডিয়াস</p>
            </div>
          </div>
          <div className={
            "flex items-center gap-1.5 rounded-full px-3 py-1 border " +
            (isOffline
              ? "bg-amber-950/60 border-amber-700/50"
              : "bg-green-950/60 border-green-800/50")
          }>
            <div className={
              "w-1.5 h-1.5 rounded-full animate-pulse " +
              (isOffline ? "bg-amber-400" : "bg-green-400")
            } />
            <span className={
              "text-xs font-semibold " +
              (isOffline ? "text-amber-400" : "text-green-400")
            }>
              {isTestActive ? "🧪 টেস্ট" : isOffline ? "অফলাইন" : "লাইভ"}
            </span>
          </div>
        </div>
        {lastUpdated && (
          <StatusBar lastUpdated={lastUpdated} countdown={countdown} onRefresh={refresh} />
        )}
      </header>

      <main className="max-w-lg mx-auto pb-12">
        {loading && <LoadingSkeleton />}

        {error && !loading && (
          <div className="mx-4 mt-4 rounded-2xl border border-red-800/60 bg-red-950/40 p-6 text-center">
            <div className="text-4xl mb-3">📡</div>
            <p className="text-red-400 font-bold mb-2">সংযোগ সমস্যা</p>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">{error}</p>
            <button
              onClick={refresh}
              className="bg-red-800/60 hover:bg-red-700/60 border border-red-700/60 text-white px-5 py-2 rounded-xl text-sm transition-colors font-medium"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <OfflineBanner
              isOffline={isOffline}
              isFromCache={isFromCache}
              cacheTime={cacheTime}
            />

            <LocationBanner
              locationStatus={locationStatus}
              locationError={locationError}
            />
            <AlertBanner
              topQuake={displayQuake}
              userLocation={userLocation}
            />

            <div className="mx-4 mt-6">
              <SafetyTips magnitude={displayQuake ? displayQuake.magnitude : null} />
            </div>

            <div className="mx-4 mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-slate-300 font-bold text-sm">
                  গত ২৪ ঘণ্টার ভূমিকম্প
                </h2>
                {recentQuakes.length > 0 && (
                  <span className="text-xs bg-slate-700/80 border border-slate-600/50 text-slate-400 px-2.5 py-0.5 rounded-full">
                    {recentQuakes.length}টি
                  </span>
                )}
              </div>
              <EarthquakeList quakes={recentQuakes} />
            </div>

            {IS_DEV && (
              <div className="mx-4 mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px flex-1 bg-slate-800" />
                  <span className="text-slate-600 text-xs">শিক্ষামূলক টেস্ট জোন</span>
                  <div className="h-px flex-1 bg-slate-800" />
                </div>
                <p className="text-slate-600 text-xs text-center mb-3">
                  নিচের টুলটি শুধুমাত্র শেখার জন্য। বাস্তব সতর্কতা নয়।
                </p>
                <TestPanel
                  onTest={handleTest}
                  onReset={handleReset}
                  isTestActive={isTestActive}
                />
              </div>
            )}

            <div className="mx-4 mt-8 pb-2 border-t border-slate-800/80 pt-5 text-center space-y-1">
              <p className="text-slate-600 text-xs">তথ্যসূত্র: USGS Earthquake Hazards Program</p>
              <p className="text-slate-700 text-xs">এই অ্যাপ শুধুমাত্র তথ্যের জন্য।</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}