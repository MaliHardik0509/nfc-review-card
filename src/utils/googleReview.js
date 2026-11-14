import confetti from 'canvas-confetti';

/**
 * Builds the direct Google Review URL
 * Google's official direct review URL format is:
 * https://search.google.com/local/writereview?placeid={PLACE_ID}
 */
export function getGoogleReviewUrl({ placeId, hex, cid, customReviewUrl, businessName }) {
  // If user passed a full Google Maps link containing a hex ID, auto-upgrade it to direct write-review popup!
  if (customReviewUrl && customReviewUrl.trim().startsWith('http')) {
    const trimmed = customReviewUrl.trim();
    if (trimmed.includes('#lrd=') || trimmed.includes('/writereview')) {
      return trimmed;
    }
    const hexMatch = trimmed.match(/(0x[0-9a-fA-F]+:0x[0-9a-fA-F]+)/);
    if (hexMatch) {
      return `https://www.google.com/search?q=${encodeURIComponent(businessName || 'Review')}#lrd=${hexMatch[1]},3`;
    }
    return trimmed;
  }

  // If direct hex ID is provided (e.g. 0x395e9bff4826bdf3:0xddce6a8104be22aa)
  if (hex && hex.trim()) {
    const cleanHex = hex.trim().replace(/^#lrd=/, '').replace(/,3$/, '');
    return `https://www.google.com/search?q=${encodeURIComponent(businessName || 'Review')}#lrd=${encodeURIComponent(cleanHex)},3`;
  }

  // If official Place ID is provided
  if (placeId && placeId.trim()) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId.trim())}`;
  }

  // If CID is provided
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

