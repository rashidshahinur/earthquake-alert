import { getAlertInfo, getDepthLabel } from "../utils/banglaMessages";
import { formatMagnitude, formatDistance, timeAgoInBangla } from "../utils/formatters";

const GLOW = {
  green:  "shadow-[0_0_32px_rgba(34,197,94,0.15)]",
  yellow: "shadow-[0_0_32px_rgba(234,179,8,0.15)]",
  orange: "shadow-[0_0_32px_rgba(249,115,22,0.18)]",
  red:    "shadow-[0_0_32px_rgba(239,68,68,0.2)]",
};

export default function AlertBanner({ topQuake }) {
  if (!topQuake) {
    return (
      <div className="mx-4 mt-4 rounded-2xl border border-green-800/60 bg-gradient-to-br from-green-950/80 to-slate-900/80 p-6 text-center fade-in-up">
        <div className="w-16 h-16 rounded-full bg-green-900/60 border-2 border-green-600/60 flex items-center justify-center mx-auto mb-4 text-3xl">
          ✅
        </div>
        <h2 className="text-green-400 text-xl font-bold mb-2">এলাকা নিরাপদ</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          গত ১ ঘণ্টায় বাংলাদেশের ৫০০ কিমি এলাকায় কোনো ভূমিকম্প রেকর্ড হয়নি।
        </p>
      </div>
    );
  }

  const info = getAlertInfo(topQuake.magnitude);
  const depth = getDepthLabel(topQuake.depth);
  const isPulsing = topQuake.magnitude >= 5.0;
  const glow = GLOW[info.color] || GLOW.green;

  return (
    <div className={"mx-4 mt-4 rounded-2xl border " + info.borderClass + " bg-gradient-to-br " + info.bgClass + "/30 p-5 " + glow + " fade-in-up " + (isPulsing ? "alert-pulse" : "")}>
      <div className="flex items-start gap-4 mb-5">
        <div className={"shrink-0 w-20 h-20 rounded-2xl border-2 " + info.borderClass + " bg-black/40 flex flex-col items-center justify-center"}>
          <span className={"text-3xl font-black leading-none " + info.textClass}>
            {formatMagnitude(topQuake.magnitude)}
          </span>
          <span className="text-slate-500 text-xs mt-1">মাত্রা</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{info.emoji}</span>
            <span className={"text-xs font-semibold uppercase tracking-widest " + info.textClass}>
              {info.level}
            </span>
          </div>
          <h2 className="text-white text-xl font-extrabold leading-snug mb-1">{info.headline}</h2>
          <p className="text-slate-400 text-sm">{info.message}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <StatBox label="ঢাকা থেকে" value={formatDistance(topQuake.distanceFromDhaka)} />
        <StatBox label="গভীরতা" value={Math.round(topQuake.depth) + " কিমি"} highlight={depth.warning} />
        <StatBox label="কতক্ষণ আগে" value={timeAgoInBangla(topQuake.time)} />
      </div>

      <div className={"rounded-xl border " + info.borderClass + "/40 bg-black/30 p-3"}>
        <p className="text-white font-semibold text-sm">
          <span className={info.textClass}>👉</span> {info.action}
        </p>
      </div>

      {topQuake.place && (
        <p className="text-slate-600 text-xs mt-3 text-center truncate">{topQuake.place}</p>
      )}
    </div>
  );
}

function StatBox({ label, value, highlight }) {
  return (
    <div className={"rounded-xl p-3 text-center " + (highlight ? "bg-red-950/60 border border-red-800/50" : "bg-black/30")}>
      <div className={"text-sm font-bold " + (highlight ? "text-red-400" : "text-white")}>{value}</div>
      <div className="text-slate-500 text-xs mt-0.5">{label}</div>
    </div>
  );
}
