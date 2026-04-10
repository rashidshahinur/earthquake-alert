import { SAFETY_TIPS, EMERGENCY_NUMBERS } from "../utils/banglaMessages";

export default function SafetyTips({ magnitude }) {
  const showTips = magnitude && magnitude >= 4.0;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <div className="grid grid-cols-2 gap-2">
          {EMERGENCY_NUMBERS.map((item) => {
            const num = item.number;
            const lbl = item.label;
            return (
              <a key={num} href={"tel:" + num} className="flex items-center justify-between bg-slate-900 rounded-lg px-3 py-2">
                <span className="text-slate-400 text-xs">{lbl}</span>
                <span className="text-sky-400 font-bold text-sm">{num}</span>
              </a>
            );
          })}
        </div>
      </div>
      {showTips && (
        <>
          <TipSection tips={SAFETY_TIPS.during} />
          <TipSection tips={SAFETY_TIPS.after} />
        </>
      )}
    </div>
  );
}

function TipSection({ tips }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
