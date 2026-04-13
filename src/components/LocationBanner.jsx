export default function LocationBanner({ locationStatus, locationError }) {
  if (locationStatus === 'granted' || locationStatus === 'pending') return null;

  const messages = {
    permission_denied: {
      title: 'লোকেশন অ্যাক্সেস বন্ধ আছে',
      body: 'আপনি লোকেশন পারমিশন দেননি। এই কারণে দূরত্ব আপনার অবস্থান থেকে না দেখিয়ে ঢাকা থেকে দেখানো হচ্ছে। সঠিক দূরত্ব দেখতে ব্রাউজার সেটিংস থেকে লোকেশন অন করুন।',
      how: 'Chrome → Settings → Privacy → Location → Allow',
    },
    position_unavailable: {
      title: 'লোকেশন পাওয়া যাচ্ছে না',
      body: 'আপনার ডিভাইসের GPS সিগন্যাল পাওয়া যাচ্ছে না। ঢাকা থেকে দূরত্ব দেখানো হচ্ছে।',
      how: null,
    },
    timeout: {
      title: 'লোকেশন লোড হয়নি',
      body: 'লোকেশন নিতে অনেক সময় লাগছে। ঢাকা থেকে দূরত্ব দেখানো হচ্ছে।',
      how: null,
    },
    unsupported: {
      title: 'লোকেশন সাপোর্ট নেই',
      body: 'আপনার ব্রাউজার বা ডিভাইস লোকেশন সাপোর্ট করে না। ঢাকা থেকে দূরত্ব দেখানো হচ্ছে।',
      how: null,
    },
  };

  const content = messages[locationError] || messages['unsupported'];

  return (
    <div className="mx-4 mt-3 rounded-xl border border-slate-700/50 bg-slate-800/40 p-3">
      <div className="flex items-start gap-2">
        <span className="text-base shrink-0">📍</span>
        <div>
          <p className="text-slate-300 text-xs font-bold mb-0.5">{content.title}</p>
          <p className="text-slate-500 text-xs leading-relaxed">{content.body}</p>
          {content.how && (
            <p className="text-slate-600 text-xs mt-1 font-mono">{content.how}</p>
          )}
        </div>
      </div>
    </div>
  );
}