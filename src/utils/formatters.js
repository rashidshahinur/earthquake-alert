// Time and number formatting utilities

export function timeAgoInBangla(timestampMs) {
  const now = Date.now();
  const diffMs = now - timestampMs;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);

  if (diffMin < 1) return 'এইমাত্র';
  if (diffMin < 60) return `${toBanglaNumber(diffMin)} মিনিট আগে`;
  if (diffHr < 24) return `${toBanglaNumber(diffHr)} ঘণ্টা আগে`;
  return `${toBanglaNumber(Math.floor(diffHr / 24))} দিন আগে`;
}

export function toBanglaNumber(num) {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num)
    .split('')
    .map((d) => (isNaN(d) ? d : banglaDigits[parseInt(d)]))
    .join('');
}

export function formatMagnitude(mag) {
  return mag ? mag.toFixed(1) : '?';
}

export function formatDistance(km) {
  return `${Math.round(km)} কিমি`;
}

export function formatDepth(km) {
  return `${Math.round(km)} কিমি গভীরে`;
}

export function getLastUpdatedText(date) {
  if (!date) return '';
  return `সর্বশেষ আপডেট: ${date.toLocaleTimeString('bn-BD')}`;
}