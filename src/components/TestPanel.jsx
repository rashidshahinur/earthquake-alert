export default function TestPanel({ onTest, onReset, isTestActive }) {
  function handleSliderTest(e) {
    const mag = parseFloat(e.target.value);
    onTest(mag);
  }

  return (
    <div className="mx-4 mt-4 rounded-2xl border border-purple-700/60 bg-purple-950/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧪</span>
          <div>
            <p className="text-purple-300 font-bold text-sm">টেস্ট মোড</p>
            <p className="text-purple-500 text-xs">শুধুমাত্র পরীক্ষার জন্য</p>
          </div>
        </div>
        {isTestActive && (
          <button
            onClick={onReset}
            className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded-full transition-colors font-medium"
          >
            ✕ বাতিল করুন
          </button>
        )}
      </div>

      <p className="text-purple-400 text-xs mb-3">
        নিচের বাটন চাপুন — অ্যাপ সেই মাত্রার ভূমিকম্প দেখাবে:
      </p>

      {/* Magnitude buttons */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {[
          { mag: 2.5, label: "২.৫", color: "bg-green-800/60 border-green-600/60 text-green-400 hover:bg-green-700/60" },
          { mag: 3.5, label: "৩.৫", color: "bg-yellow-800/60 border-yellow-600/60 text-yellow-400 hover:bg-yellow-700/60" },
          { mag: 4.5, label: "৪.৫", color: "bg-orange-800/60 border-orange-600/60 text-orange-400 hover:bg-orange-700/60" },
          { mag: 5.8, label: "৫.৮", color: "bg-red-800/60 border-red-600/60 text-red-400 hover:bg-red-700/60" },
          { mag: 6.5, label: "৬.৫", color: "bg-rose-900/60 border-rose-600/60 text-rose-400 hover:bg-rose-800/60" },
        ].map(({ mag, label, color }) => (
          <button
            key={mag}
            onClick={() => onTest(mag)}
            className={"border rounded-xl py-2 text-center font-black text-sm transition-all active:scale-95 " + color}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Labels row */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {["নিরাপদ", "হালকা", "মাঝারি", "শক্তিশালী", "বিপজ্জনক"].map((label) => (
          <p key={label} className="text-center text-purple-600 text-xs">{label}</p>
        ))}
      </div>

      {/* Custom slider */}
      <div className="border-t border-purple-800/50 pt-3">
        <p className="text-purple-500 text-xs mb-2">অথবা নিজে বেছে নিন:</p>
        <div className="flex items-center gap-3">
          <span className="text-purple-400 text-xs">১.০</span>
          <input
            type="range"
            min="1.0"
            max="8.0"
            step="0.1"
            defaultValue="4.0"
            onChange={handleSliderTest}
            className="flex-1 accent-purple-500"
          />
          <span className="text-purple-400 text-xs">৮.০</span>
        </div>
      </div>

      {isTestActive && (
        <div className="mt-3 flex items-center gap-2 bg-purple-900/40 border border-purple-700/50 rounded-xl px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <p className="text-purple-300 text-xs font-medium">
            টেস্ট ডেটা দেখানো হচ্ছে — রিয়েল ডেটা নয়
          </p>
        </div>
      )}
    </div>
  );
}