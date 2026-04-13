export default function AboutPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto bg-slate-900 border-t border-slate-700/80 rounded-t-3xl p-6 pb-10"
        style={{ fontFamily: "Noto Sans Bengali, sans-serif" }}
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-6" />

        <h2 className="text-white font-extrabold text-lg mb-1">
          ভূমিকম্প সতর্কতা
        </h2>
        <p className="text-slate-500 text-xs mb-6">
          বাংলাদেশ · ৫০০ কিমি রেডিয়াস · USGS ডেটা
        </p>

        <div className="space-y-3 mb-6">
          <InfoRow label="ডেটা উৎস" value="USGS Earthquake Hazards Program" />
          <InfoRow label="আপডেট" value="প্রতি ৬০ সেকেন্ডে স্বয়ংক্রিয়" />
          <InfoRow label="সতর্কতা সীমা" value="মাত্রা ৪.০ এর উপরে" />
          <InfoRow label="পর্যবেক্ষণ এলাকা" value="বাংলাদেশ কেন্দ্র থেকে ৫০০ কিমি" />
          <InfoRow
            label="Telegram চ্যানেল"
            value="@bdquakealert"
            link="https://t.me/bdquakealert"
          />
        </div>

        <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-3 mb-6">
          <p className="text-amber-400 text-xs font-bold mb-1">⚠️ গুরুত্বপূর্ণ নোট</p>
          <p className="text-amber-600 text-xs leading-relaxed">
            এই অ্যাপ শুধুমাত্র তথ্যের জন্য। দুর্যোগ ব্যবস্থাপনায় সরকারি নির্দেশনা সর্বদা অনুসরণ করুন।
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-slate-300 font-bold py-3 rounded-xl text-sm transition-colors"
        >
          বন্ধ করুন
        </button>
      </div>
    </>
  );
}

function InfoRow({ label, value, link }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-3">
      <span className="text-slate-500 text-xs shrink-0">{label}</span>
      {link ? (
        
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-sky-400 text-xs font-medium text-right"
        >
          {value}
        </a>
      ) : (
        <span className="text-slate-300 text-xs font-medium text-right">{value}</span>
      )}
    </div>
  );
}