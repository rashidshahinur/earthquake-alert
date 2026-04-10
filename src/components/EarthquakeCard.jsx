import { getAlertInfo, getDepthLabel } from "../utils/banglaMessages";
import { formatMagnitude, formatDistance, timeAgoInBangla } from "../utils/formatters";

const LEFT_BAR_COLOR = {
  green:  "bg-green-500",
  yellow: "bg-yellow-400",
  orange: "bg-orange-500",
  red:    "bg-red-500",
};

export default function EarthquakeCard({ quake }) {
  const info = getAlertInfo(quake.magnitude);
  const depth = getDepthLabel(quake.depth);
  const bar = LEFT_BAR_COLOR[info.color] || "bg-slate-500";

  return (
    <div className="flex rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
      <div className={"w-1 shrink-0 " + bar} />
      <div className="flex-1 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={"text-2xl font-black " + info.textClass}>
              {formatMagnitude(quake.magnitude)}
            </div>
            <div>
              <div className="text-slate-300 text-xs font-medium leading-tight line-clamp-1">
                {quake.place || "অজানা স্থান"}
              </div>
              <div className="text-slate-500 text-xs mt-0.5">
                {timeAgoInBangla(quake.time)}
              </div>
            </div>
          </div>
          <div className="text-right shrink-0 ml-2">
            <div className="text-slate-300 text-sm font-semibold">
              {formatDistance(quake.distanceFromDhaka)}
            </div>
            <div className="text-slate-600 text-xs">ঢাকা থেকে</div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className={"text-xs px-2 py-0.5 rounded-full border " +
            (depth.warning
              ? "bg-red-950/60 text-red-400 border-red-800/60"
              : "bg-slate-700/60 text-slate-400 border-slate-700")}>
            {depth.label}
          </span>
          {quake.felt && (
            <span className="text-xs text-slate-600">{quake.felt} জন অনুভব করেছেন</span>
          )}
        </div>
      </div>
    </div>
  );
}
