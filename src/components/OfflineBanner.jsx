export default function OfflineBanner({ isOffline, isFromCache, cacheTime }) {
  if (!isOffline && !isFromCache) return null;

  const timeStr = cacheTime
    ? cacheTime.toLocaleTimeString('bn-BD', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className={
      "mx-4 mt-4 rounded-xl border px-4 py-3 flex items-start gap-3 " +
      (isOffline
        ? "bg-amber-950/50 border-amber-700/60"
        : "bg-slate-800/60 border-slate-600/50")
    }>
      <span className="text-xl shrink-0">{isOffline ? "📡" : "🕐"}</span>
      <div>
        <p className={
          "text-sm font-bold " +
          (isOffline ? "text-amber-400" : "text-slate-300")
        }>
          {isOffline
            ? "ইন্টারনেট সংযোগ নেই"
            : "সর্বশেষ সংরক্ষিত তথ্য দেখানো হচ্ছে"}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {isOffline
            ? "সংযোগ ফিরলে স্বয়ংক্রিয়ভাবে আপডেট হবে। নিচের তথ্য সর্বশেষ সংরক্ষিত ডেটা।"
            : timeStr
              ? `সংরক্ষিত সময়: ${timeStr}`
              : "তথ্য লোড হচ্ছে..."}
        </p>
      </div>
    </div>
  );
}