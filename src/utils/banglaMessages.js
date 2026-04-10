// All Bangla text and alert logic lives here
// Change text here, UI stays the same

export function getAlertInfo(magnitude) {
  if (magnitude < 3.0) {
    return {
      level: 'safe',
      color: 'green',
      emoji: '✅',
      headline: 'অনুভব করা কঠিন',
      message: 'অনুভব করা কঠিন, চিন্তার কিছু নেই',
      action: 'স্বাভাবিক কার্যক্রম চালিয়ে যান।',
      bgClass: 'from-green-900 to-green-800',
      borderClass: 'border-green-500',
      textClass: 'text-green-400',
    };
  } else if (magnitude < 4.0) {
    return {
      level: 'minor',
      color: 'yellow',
      emoji: '⚠️',
      headline: 'হালকা কম্পন',
      message: 'হালকা কম্পন অনুভূত হতে পারে',
      action: 'শান্ত থাকুন। বাইরে যাওয়ার দরকার নেই।',
      bgClass: 'from-yellow-900 to-yellow-800',
      borderClass: 'border-yellow-400',
      textClass: 'text-yellow-400',
    };
  } else if (magnitude < 5.0) {
    return {
      level: 'moderate',
      color: 'orange',
      emoji: '🟠',
      headline: 'মাঝারি ভূমিকম্প',
      message: 'মাঝারি ভূমিকম্প। সতর্ক থাকুন',
      action: 'টেবিলের নিচে যান। জানালা থেকে দূরে থাকুন।',
      bgClass: 'from-orange-900 to-orange-800',
      borderClass: 'border-orange-400',
      textClass: 'text-orange-400',
    };
  } else if (magnitude < 6.0) {
    return {
      level: 'strong',
      color: 'red',
      emoji: '🔴',
      headline: 'শক্তিশালী ভূমিকম্প',
      message: 'শক্তিশালী ভূমিকম্প। নিরাপদ স্থানে যান',
      action: 'এখনই খোলা জায়গায় যান। বিল্ডিং থেকে বের হন।',
      bgClass: 'from-red-900 to-red-800',
      borderClass: 'border-red-500',
      textClass: 'text-red-400',
    };
  } else {
    return {
      level: 'major',
      color: 'red',
      emoji: '🚨',
      headline: 'বিপজ্জনক ভূমিকম্প!',
      message: 'বিপজ্জনক ভূমিকম্প! এখনই আশ্রয় নিন',
      action: 'মাথা ঢাকুন। খোলা মাঠে যান। লিফট ব্যবহার করবেন না।',
      bgClass: 'from-red-950 to-rose-900',
      borderClass: 'border-rose-400',
      textClass: 'text-rose-400',
    };
  }
}

export function getDepthLabel(depthKm) {
  if (depthKm <= 70) return { label: 'অগভীর (বিপজ্জনক)', warning: true };
  if (depthKm <= 300) return { label: 'মধ্যবর্তী', warning: false };
  return { label: 'গভীর (কম বিপজ্জনক)', warning: false };
}

export const SAFETY_TIPS = {
  during: [
    'টেবিল বা শক্ত আসবাবের নিচে আশ্রয় নিন',
    'মাথা ও ঘাড় দুই হাত দিয়ে ঢাকুন',
    'জানালা, আয়না ও ভারী আসবাব থেকে দূরে থাকুন',
    'লিফট ব্যবহার করবেন না',
    'কম্পন থামা পর্যন্ত ভেতরে থাকুন',
  ],
  after: [
    'গ্যাস লিক হলে জানালা খুলুন ও বের হন',
    'ক্ষতিগ্রস্ত বিল্ডিং থেকে বের হন',
    'বন্যা বা সুনামি সতর্কতা শুনুন',
    'ফোন শুধু জরুরি প্রয়োজনে ব্যবহার করুন',
    'আহতদের প্রাথমিক চিকিৎসা দিন',
  ],
};

export const EMERGENCY_NUMBERS = [
  { label: 'ফায়ার সার্ভিস', number: '199' },
  { label: 'পুলিশ', number: '999' },
  { label: 'অ্যাম্বুলেন্স', number: '199' },
  { label: 'ডিজাস্টার ম্যানেজমেন্ট', number: '1090' },
];