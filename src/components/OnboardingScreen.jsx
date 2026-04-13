export default function OnboardingScreen({ onDone }) {
  const features = [
    { icon: "📡", text: "রিয়েল-টাইম USGS ভূমিকম্প ডেটা" },
    { icon: "🔔", text: "মাত্রা অনুযায়ী বাংলায় সতর্কতা" },
    { icon: "📍", text: "আপনার অবস্থান থেকে দূরত্ব" },
    { icon: "💾", text: "ইন্টারনেট ছাড়াও কাজ করে" },
    { icon: "📢", text: "Telegram চ্যানেলে স্বয়ংক্রিয় আলার্ট" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"
      style={{ fontFamily: "Noto Sans Bengali, sans-serif" }}
    >
      {/* Top section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-12">
        <div className="w-20 h-20 rounded-2xl bg-red-950/80 border-2 border-red-800/60 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-red-950/50">
          🌍
        </div>

        <h1 className="text-white text-3xl font-black text-center mb-2 leading-tight">
          ভূমিকম্প সতর্কতা
        </h1>
        <p className="text-slate-400 text-sm text-center mb-8 leading-relaxed">
          বাংলাদেশ ও আশেপাশের এলাকায় ভূমিকম্প হলে<br />
          আপনি সাথে সাথে জানতে পারবেন।
        </p>

        {/* Feature list */}
        <div className="w-full max-w-sm space-y-3 mb-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3"
            >
              <span className="text-xl shrink-0">{f.icon}</span>
              <span className="text-slate-300 text-sm">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={onDone}
          className="w-full bg-red-700 hover:bg-red-600 active:scale-98 text-white font-bold py-4 rounded-2xl text-base transition-all duration-150 shadow-lg shadow-red-950/50"
        >
          শুরু করুন →
        </button>
        <p className="text-slate-600 text-xs text-center">
          তথ্যসূত্র: USGS Earthquake Hazards Program
        </p>
      </div>
    </div>
  );
}