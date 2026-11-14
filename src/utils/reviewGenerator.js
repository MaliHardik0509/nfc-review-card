// Smart Review Generation Engine
// Combines combinatorial natural language generation with optional Gemini AI integration

function getRandomItem(array) {
  if (!array || array.length === 0) return '';
  return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate high-variety, authentic-sounding 5-star reviews
 */
export function generateSmartReviews({
  category,
  selectedTagIds = [],
  businessName = 'this place',
  tone = 'enthusiastic',
  highlight = '',
  staffName = '',
  count = 3
}) {
  const phrases = category?.phrases || {};
  const openers = phrases.openers || [
    "Had an amazing experience!",
    "Absolutely wonderful service!",
    "Can't say enough good things about our visit!"
  ];
  const closers = phrases.closers || [
    "Highly recommended!",
    "Will definitely be returning!",
    "A well-deserved 5 stars!"
  ];
  const tagSentences = phrases.tagSentences || {};

  const reviews = [];
  const nameToUse = businessName && businessName !== 'this place' ? businessName : 'this place';

  for (let i = 0; i < count; i++) {
    const parts = [];

    // 1. Opener
    let opener = getRandomItem(openers);
    // Occasionally personalize opener with business name
    if (nameToUse !== 'this place' && Math.random() > 0.4) {
      const customOpeners = [
        `Visited ${nameToUse} recently and had an absolutely fantastic experience!`,
        `Hands down one of the best visits I've had — ${nameToUse} never disappoints!`,
        `${nameToUse} truly exceeded all our expectations today!`,
        `Such a wonderful experience at ${nameToUse}!`,
      ];
      opener = getRandomItem(customOpeners);
    }
    parts.push(opener);

    // 2. Highlight/Dish or Staff mention if provided
    if (highlight && highlight.trim()) {
      const highlightPhrases = [
        `Specifically, the ${highlight.trim()} was incredible and made the entire visit worthwhile.`,
        `A special shout-out for the ${highlight.trim()} — it was definitely a highlight!`,
        `You have to try the ${highlight.trim()}, absolutely top tier.`,
      ];
      parts.push(getRandomItem(highlightPhrases));
    }

    if (staffName && staffName.trim()) {
      const staffPhrases = [
        `Special thanks to ${staffName.trim()} for their exceptional kindness and attentive care!`,
        `Kudos to ${staffName.trim()} who provided outstanding service with a great smile.`,
        `${staffName.trim()} went above and beyond to make our visit memorable.`,
      ];
      parts.push(getRandomItem(staffPhrases));
    }

    // 3. Category Tags Body
    if (selectedTagIds.length > 0) {
      // Pick sentences for the selected tags in shuffled order
      const shuffledTags = shuffleArray(selectedTagIds);
      
      shuffledTags.forEach((tagId, index) => {
        const pool = tagSentences[tagId];
        if (pool && pool.length > 0) {
          let sentence = getRandomItem(pool);
          
          // Add natural transitional words for variety
          if (index === 1 && Math.random() > 0.5) {
            sentence = "In addition, " + sentence.charAt(0).toLowerCase() + sentence.slice(1);
          } else if (index === 2 && Math.random() > 0.5) {
            sentence = "On top of that, " + sentence.charAt(0).toLowerCase() + sentence.slice(1);
          }
          
          parts.push(sentence);
        }
      });
    } else {
      // Default generic praise if no tags selected
      parts.push("The quality, attention to detail, and overall atmosphere were second to none.");
    }

    // 4. Closer
    const closer = getRandomItem(closers);
    parts.push(closer);

    // Filter tone adjustments
    let finalReview = parts.join(' ');

    if (tone === 'short') {
      // Short & sweet: opener, the customer's own details, one tag, closer.
      const shortParts = [opener];
      if (highlight && highlight.trim()) {
        shortParts.push(`The ${highlight.trim()} was a standout.`);
      }
      if (staffName && staffName.trim()) {
        shortParts.push(`Thanks to ${staffName.trim()} for the great service.`);
      }
      if (selectedTagIds.length > 0) {
        const firstTagPool = tagSentences[selectedTagIds[0]];
        if (firstTagPool) shortParts.push(getRandomItem(firstTagPool));
      }
      shortParts.push(closer);
      finalReview = shortParts.join(' ');
    } else if (tone === 'enthusiastic') {
      finalReview = finalReview.replace(/!/g, '! ⭐');
    }

    reviews.push({
      id: `draft-${i + 1}-${Date.now()}`,
      text: finalReview,
      tone: tone,
    });
  }

  return reviews;
}

/**
 * Call Gemini AI (Optional for deep AI personalization if user provides API key)
 */
export async function generateGeminiReview({
  apiKey,
  category,
  selectedTagLabels = [],
  businessName,
  highlight,
  staffName,
  tone = 'enthusiastic'
}) {
  if (!apiKey) {
    throw new Error('Gemini API key is required for AI generation');
  }

  const prompt = `Write a realistic, natural, authentic-sounding 5-star Google review for a business named "${businessName || 'this local business'}".
Business Type: ${category?.name || 'Local business'}
Aspects the customer loved: ${selectedTagLabels.join(', ') || 'Overall excellence'}
Special details/highlight: ${highlight || 'None'}
Staff name: ${staffName || 'None'}
Tone: ${tone}

Rules:
1. Make it sound like a real, enthusiastic human customer wrote it on Google Maps on their smartphone.
2. Keep it between 2 to 4 sentences (under 75 words).
3. Do NOT use cheesy corporate buzzwords or quotes. Do NOT write "Title:" or headings.
4. Output ONLY the raw review text ready to be pasted into Google Reviews.`;

  // Alias that always points at the current stable Flash model, so retired
  // model IDs (e.g. gemini-1.5-flash, shut down Sept 2025) cannot break this.
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Sent as a header rather than a query string so the key stays out of
      // URLs, logs and browser history.
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.85,
        maxOutputTokens: 150,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to generate review with Gemini API');
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

  if (!text) {
    throw new Error('The AI returned an empty review. Please try again.');
  }

  return text.replace(/^["']|["']$/g, '');
}

