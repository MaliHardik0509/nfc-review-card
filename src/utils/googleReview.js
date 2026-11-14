import confetti from 'canvas-confetti';

/**
 * Builds the direct Google Review URL
 * Google's official direct review URL format is:
 * https://search.google.com/local/writereview?placeid={PLACE_ID}
 */
/**
 * Converts Google Maps Hex coordinates (e.g. 0x395e9bff4826bdf3:0xddce6a8104be22aa)
 * into Google's official canonical Place ID (e.g. ChIJ870mSP-bXjkRqiK-BIFqzt0)
 */
export function convertHexToPlaceId(hex1, hex2) {
  try {
    const val1 = BigInt(hex1);
    const val2 = BigInt(hex2);
    const buf = new Uint8Array(20);
    buf[0] = 0x0a;
    buf[1] = 0x12;
    buf[2] = 0x09;
    
    let temp1 = val1;
    for (let i = 0; i < 8; i++) {
      buf[3 + i] = Number(temp1 & 0xffn);
      temp1 >>= 8n;
    }
    
    buf[11] = 0x11;
    
    let temp2 = val2;
    for (let i = 0; i < 8; i++) {
      buf[12 + i] = Number(temp2 & 0xffn);
      temp2 >>= 8n;
    }
    
    let binary = '';
    for (let i = 0; i < buf.length; i++) {
      binary += String.fromCharCode(buf[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    return null;
  }
}

/**
 * Builds the direct Google Review URL
 * Google's official direct review URL format is:
 * https://search.google.com/local/writereview?placeid={PLACE_ID}
 * This DIRECTLY pops open the 5-star review modal!
 */
export function getGoogleReviewUrl({ placeId, hex, cid, customReviewUrl, businessName }) {
  // 1. If explicit placeId is provided
  if (placeId && placeId.trim()) {
    const cleanId = placeId.trim();
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(cleanId)}`;
  }

  // 2. If hex is provided (e.g. 0x395e9bff4826bdf3:0xddce6a8104be22aa)
  if (hex && hex.trim()) {
    const parts = hex.trim().split(':');
    if (parts.length === 2 && parts[0].startsWith('0x') && parts[1].startsWith('0x')) {
      const computedPlaceId = convertHexToPlaceId(parts[0], parts[1]);
      if (computedPlaceId) {
        return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(computedPlaceId)}`;
      }
    }
  }

  // 3. If a full Google Maps URL is provided in customReviewUrl, auto-extract hex and convert to direct review box!
  if (customReviewUrl && customReviewUrl.trim().startsWith('http')) {
    const trimmed = customReviewUrl.trim();
    if (trimmed.includes('/writereview?placeid=')) {
      return trimmed;
    }
    const hexMatch = trimmed.match(/0x[0-9a-fA-F]+:0x[0-9a-fA-F]+/);
    if (hexMatch) {
      const parts = hexMatch[0].split(':');
      const computedPlaceId = convertHexToPlaceId(parts[0], parts[1]);
      if (computedPlaceId) {
        return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(computedPlaceId)}`;
      }
    }
    return trimmed;
  }

  // 4. If CID is provided
  if (cid && cid.trim()) {
    return `https://www.google.com/maps?cid=${encodeURIComponent(cid.trim())}`;
  }

  if (businessName && businessName.trim()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessName.trim())}`;
  }

  return 'https://www.google.com/maps';
}

/**
 * Generates a WhatsApp direct message URL for private feedback (1-3 stars)
 */
export function getWhatsAppFeedbackUrl({ phone, businessName, rating, feedback, customerName, customerContact }) {
  if (!phone) return null;
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  if (!cleanPhone) return null;

  const text = `*New Customer Feedback for ${businessName || 'Business'}*
⭐ Rating: ${rating} / 5 Stars
📝 Feedback: "${feedback || 'No comments'}"
👤 Customer: ${customerName || 'Anonymous'}
📞 Contact: ${customerContact || 'Not provided'}
_Submitted via NFC Feedback Shield_`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Copies text to clipboard with modern API & legacy fallback
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.warn('Clipboard copy error:', err);
    return false;
  }
}

/**
 * Trigger mobile haptic feedback if supported
 */
export function triggerHapticFeedback() {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([40, 50, 40]);
    } catch {
      // Ignore vibration errors on unsupported devices
    }
  }
}

/**
 * Trigger celebratory confetti animation
 */
export function triggerConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'], // Google colors!
    });
  } catch {
    // Ignore confetti errors
  }
}

