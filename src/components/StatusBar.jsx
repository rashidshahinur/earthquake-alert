export default function StatusBar({ lastUpdated, countdown, onRefresh }) {
  const progress = ((60 - countdown) / 60) * 100;
  const isAlmostDone = countdown <= 10;
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "";

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/60 border-b border-slate-700/50 text-xs">
        <span className="text-slate-500">
          {timeStr ? (
            <>সর্বশেষ: <span className="text-slate-400">{timeStr}</span></>
          ) : "লোড হচ্ছে..."}
        </span>

        <div className="flex items-center gap-2">
          {/* Countdown badge */}
          <div className={
            "flex items-center gap-1 px-2.5 py-1 rounded-full border font-bold tabular-nums transition-all duration-300 " +
            (isAlmostDone
              ? "bg-amber-500/20 border-amber-500/60 text-amber-400 scale-110"
              : "bg-slate-700/60 border-slate-600/50 text-slate-300")
          }>
            <span className={isAlmostDone ? "animate-pulse" : ""}>⏱</span>
            <span>{countdown}s</span>
          </div>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-bold px-3 py-1 rounded-full transition-all duration-150 shadow-md shadow-sky-900/50"
          >
            ↻ রিফ্রেশ
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <div
          className={"h-full transition-all duration-1000 " +
            (isAlmostDone
              ? "bg-gradient-to-r from-amber-600 to-amber-400"
              : "bg-gradient-to-r from-sky-600 to-sky-400")}
          style={{ width: progress + "%" }}
        />
      </div>
    </div>
  );
}