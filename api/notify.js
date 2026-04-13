export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

  if (!BOT_TOKEN || !CHANNEL_ID) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  const { magnitude, place, distance, depth, time } = req.body;

  // Only alert for magnitude 4.0+
  if (!magnitude || magnitude < 4.0) {
    return res.status(200).json({ skipped: true, reason: 'Below threshold' });
  }

  // Build the alert message
  function getAlertEmoji(mag) {
    if (mag < 4.0) return '🟡';
    if (mag < 5.0) return '🟠';
    if (mag < 6.0) return '🔴';
    return '🚨';
  }

  function getAlertLevel(mag) {
    if (mag < 4.0) return 'হালকা';
    if (mag < 5.0) return 'মাঝারি';
    if (mag < 6.0) return 'শক্তিশালী';
    return 'বিপজ্জনক';
  }

  function getAction(mag) {
    if (mag < 4.0) return 'শান্ত থাকুন।';
    if (mag < 5.0) return 'সতর্ক থাকুন। টেবিলের নিচে যান।';
    if (mag < 6.0) return 'নিরাপদ স্থানে যান। বিল্ডিং থেকে বের হন।';
    return 'এখনই আশ্রয় নিন! লিফট ব্যবহার করবেন না।';
  }

  const emoji = getAlertEmoji(magnitude);
  const level = getAlertLevel(magnitude);
  const action = getAction(magnitude);
  const timeAgo = Math.round((Date.now() - time) / 60000);
  const isShallow = depth <= 70;

  const message = `
${emoji} *ভূমিকম্প সতর্কতা | BD Earthquake Alert*

📊 *মাত্রা:* ${magnitude.toFixed(1)} (${level})
📍 *স্থান:* ${place || 'অজানা'}
📏 *ঢাকা থেকে দূরত্ব:* ${Math.round(distance)} কিমি
⬇️ *গভীরতা:* ${Math.round(depth)} কিমি ${isShallow ? '⚠️ অগভীর' : ''}
🕐 *সময়:* ${timeAgo} মিনিট আগে

👉 *করণীয়:* ${action}

🌐 [অ্যাপ খুলুন](https://earthquake-alert-iota.vercel.app/)
📢 @bdquakealert
`.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHANNEL_ID,
          text: message,
          parse_mode: 'Markdown',
          disable_web_page_preview: false,
        }),
      }
    );

    const data = await response.json();

    if (!data.ok) {
      return res.status(500).json({ error: data.description });
    }

    return res.status(200).json({ success: true, message_id: data.result.message_id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}