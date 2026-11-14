import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Star, 
  Copy, 
  RotateCw, 
  ChevronDown, 
  ChevronUp, 
  Check 
} from 'lucide-react';
import { BUSINESS_CATEGORIES } from '../data/categories';
import { generateSmartReviews, generateGeminiReview } from '../utils/reviewGenerator';
import { copyToClipboard, triggerHapticFeedback, triggerConfetti, getGoogleReviewUrl } from '../utils/googleReview';
import ReviewModal from './ReviewModal';
import PrivateFeedbackModal from './PrivateFeedbackModal';

export default function CustomerReviewFlow(props) {
  const config = props.config || {};
  const onOpenAdmin = props.onOpenAdmin;
  // Find category
  const currentCategory = useMemo(() => {
    return BUSINESS_CATEGORIES.find((c) => c.id === config.category) || BUSINESS_CATEGORIES[0];
  }, [config.category]);

  // Star rating state (defaults to 5)
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Selected category tag IDs
  const [selectedTags, setSelectedTags] = useState(() => {
    // Pre-select the top 2 tags for instant gratification
    return currentCategory.defaultTags.slice(0, 2).map((t) => t.id);
  });

  // Tone of review
  const [tone, setTone] = useState('enthusiastic'); // 'enthusiastic' | 'short' | 'warm'

  // Optional details
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [highlight, setHighlight] = useState('');
  const [staffName, setStaffName] = useState('');

  // Generated reviews state
  const [drafts, setDrafts] = useState([]);
  const [selectedDraftIndex, setSelectedDraftIndex] = useState(0);
  const [editedText, setEditedText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // Modals
  const [showReviewSuccessModal, setShowReviewSuccessModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Secret multi-tap gesture for Owner/Admin access (taps 5 times within 2.5 seconds)
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef(null);

  const handleSecretTap = () => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);

    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      triggerHapticFeedback();
      onOpenAdmin();
    } else {
      tapTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 2500);
    }
  };

  // When category changes, reset tags
  useEffect(() => {
    setSelectedTags(currentCategory.defaultTags.slice(0, 2).map((t) => t.id));
  }, [currentCategory]);

  // Regenerate reviews when inputs change
  useEffect(() => {
    const generated = generateSmartReviews({
      category: currentCategory,
      selectedTagIds: selectedTags,
      businessName: config.businessName,
      tone,
      highlight,
      staffName,
      count: 3
    });
    setDrafts(generated);
    setSelectedDraftIndex(0);
    if (generated[0]) {
      setEditedText(generated[0].text);
    }
  }, [currentCategory, selectedTags, config.businessName, tone, highlight, staffName]);

  // When user switches draft tabs, keep whatever they typed in the previous draft
  const handleSelectDraft = (index) => {
    if (index === selectedDraftIndex) return;
    setDrafts((prev) =>
      prev.map((draft, i) => (i === selectedDraftIndex ? { ...draft, text: editedText } : draft))
    );
    setSelectedDraftIndex(index);
    if (drafts[index]) {
      setEditedText(drafts[index].text);
    }
  };

  // Toggle tag
  const handleToggleTag = (tagId) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
    triggerHapticFeedback();
  };

  // Handle star rating click
  const handleStarClick = (num) => {
    setRating(num);
    triggerHapticFeedback();
    if (num <= 3) {
      // Trigger Negative Review Shield!
      setShowFeedbackModal(true);
    }
  };

  // Closing the shield resets the rating so the stars shown always match the 5-star draft being copied
  const handleFeedbackClose = () => {
    setShowFeedbackModal(false);
    setRating(5);
  };

  // Shuffle / Regenerate fresh reviews
  const handleRegenerate = () => {
    triggerHapticFeedback();
    const generated = generateSmartReviews({
      category: currentCategory,
      selectedTagIds: selectedTags,
      businessName: config.businessName,
      tone,
      highlight,
      staffName,
      count: 3
    });
    setDrafts(generated);
    setSelectedDraftIndex(0);
    if (generated[0]) {
      setEditedText(generated[0].text);
    }
  };

  // Generate with Gemini AI (if key provided)
  const handleGeminiAiGenerate = async () => {
    if (!config.geminiApiKey) {
      handleRegenerate();
      return;
    }

    try {
      setIsAiLoading(true);
      triggerHapticFeedback();
      const selectedLabels = currentCategory.defaultTags
        .filter((t) => selectedTags.includes(t.id))
        .map((t) => t.label);

      const aiReview = await generateGeminiReview({
        apiKey: config.geminiApiKey,
        category: currentCategory,
        selectedTagLabels: selectedLabels,
        businessName: config.businessName,
        highlight,
        staffName,
        tone
      });

      setAiError('');
      setEditedText(aiReview);
      setDrafts((prev) => [{ id: `ai-${Date.now()}`, text: aiReview, tone }, ...prev]);
      setSelectedDraftIndex(0);
    } catch (err) {
      console.error('AI generation error:', err);
      setAiError(err.message || 'AI generation failed — showing a locally generated draft instead.');
      handleRegenerate();
    } finally {
      setIsAiLoading(false);
    }
  };

  // Primary Action: Copy & Open Google Reviews
  const handleCopyAndOpenGoogle = async () => {
    const textToCopy = editedText.trim();
    if (!textToCopy) return;

    triggerHapticFeedback();
    const success = await copyToClipboard(textToCopy);

    if (success) {
      triggerConfetti();
      setShowReviewSuccessModal(true);
    } else {
      // Direct open if copy failed
      const googleUrl = getGoogleReviewUrl({
        placeId: config.placeId,
        customReviewUrl: config.customReviewUrl,
        businessName: config.businessName
      });
      window.open(googleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const googleReviewUrl = getGoogleReviewUrl({
    placeId: config.placeId,
    hex: config.hex,
    cid: config.cid,
    customReviewUrl: config.customReviewUrl,
    businessName: config.businessName
  });

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col items-center justify-start pb-28 pt-2 px-3 sm:px-4">
      {/* Centered Mobile Card Wrapper */}
      <main className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col">
        {/* Top Google & Business Header */}
        <header className="p-5 bg-gradient-to-b from-blue-50/60 to-white border-b border-slate-100 flex flex-col items-center text-center relative">
          {/* Subtle Google Rating Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200/80 text-[11px] font-semibold text-slate-700 mb-3">
            <div className="flex items-center gap-0.5">
              <span className="font-bold text-blue-600">G</span>
              <span className="font-bold text-red-500">o</span>
              <span className="font-bold text-amber-500">o</span>
              <span className="font-bold text-blue-600">g</span>
              <span className="font-bold text-emerald-600">l</span>
              <span className="font-bold text-red-500">e</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-amber-500 flex items-center">
              <Star className="w-3 h-3 fill-current inline mr-0.5" /> 4.9
            </span>
            <span className="text-slate-400 font-normal">Verified Reviews</span>
          </div>

          {/* Business Name */}
          <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
            {config.businessName || 'Welcome!'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xs font-medium">
            Tap the highlights of your visit — we'll craft your review in 1 second!
          </p>
        </header>

        <div className="p-5 space-y-6 flex-1">
          {/* Step 1: Star Rating */}
          <section className="text-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              1. Tap your overall rating
            </span>
            <div className="flex items-center justify-center gap-2 pt-0.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-slate-200 hover:scale-115 transition-transform duration-150 focus:outline-none"
                    aria-label={`${star} Star`}
                  >
                    <Star
                      className={`w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-150 ${
                        isActive
                          ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                          : 'text-slate-200 fill-slate-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-semibold text-amber-600">
              {rating === 5 && '⭐⭐⭐⭐⭐ Loved it! (5 Stars)'}
              {rating === 4 && '⭐⭐⭐⭐ Great experience! (4 Stars)'}
              {rating === 3 && '⭐⭐⭐ Average (3 Stars)'}
              {rating <= 2 && 'Needs improvement'}
            </p>
          </section>

          {/* Step 2: Category Tag Chips */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                2. What impressed you? (Select tags)
              </span>
              <span className="text-[11px] text-blue-600 font-medium">
                {selectedTags.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentCategory.defaultTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleToggleTag(tag.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 active:scale-95 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold ring-2 ring-blue-600 ring-offset-1'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                    }`}
                  >
                    <span>{tag.emoji}</span>
                    <span>{tag.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Optional Details Accordion */}
          <div className="border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => setShowOptionalDetails(!showOptionalDetails)}
              className="w-full flex items-center justify-between text-xs font-medium text-slate-500 hover:text-slate-800 transition py-1"
            >
              <span>Want to mention a specific dish, service, or staff member?</span>
              {showOptionalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showOptionalDetails && (
              <div className="mt-3 space-y-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70 animate-in fade-in duration-150">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Favorite Item / Service
                  </label>
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    placeholder={currentCategory.placeholders.dishOrDetail}
                    className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Staff Member's Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    placeholder={currentCategory.placeholders.staffName}
                    className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Review Preview & Tone */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                3. Your Generated 5-Star Review
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={config.geminiApiKey ? handleGeminiAiGenerate : handleRegenerate}
                  disabled={isAiLoading}
                  className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition"
                  title="Generate new variation"
                >
                  <RotateCw className={`w-3 h-3 ${isAiLoading ? 'animate-spin' : ''}`} />
                  <span>{config.geminiApiKey ? 'AI Shuffle' : 'Shuffle'}</span>
                </button>
              </div>
            </div>

            {/* Tone Selector Pills */}
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
              {[
                { id: 'enthusiastic', label: 'Enthusiastic ✨' },
                { id: 'short', label: 'Short & Sweet ⚡' },
                { id: 'warm', label: 'Detailed 📝' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                    tone === t.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {aiError && (
              <p className="text-[11px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-2.5 py-1.5">
                {aiError}
              </p>
            )}

            {/* Review Drafts Variations Tabs */}
            {drafts.length > 1 && (
              <div className="flex gap-2">
                {drafts.map((d, idx) => (
                  <button
                    key={d.id || idx}
                    type="button"
                    onClick={() => handleSelectDraft(idx)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition ${
                      selectedDraftIndex === idx
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Draft {idx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Editable Text Area */}
            <div className="relative">
              <textarea
                rows={4}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Your review draft will appear here..."
                className="w-full p-3.5 text-xs sm:text-sm text-slate-800 bg-amber-50/30 border border-amber-200/80 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none resize-none leading-relaxed shadow-inner"
              />
              <span className="absolute bottom-2.5 right-3 text-[10px] text-slate-400 font-medium">
                Tap box to edit
              </span>
            </div>
          </section>
        </div>

        {/* Card Footer Info (Clean & 100% Customer Facing) */}
        <footer className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 select-none">
          <div
            onClick={handleSecretTap}
            className="flex items-center gap-1.5 cursor-default active:opacity-80 transition"
            title="Verified Google Review Assistant"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-500">{config.agencyBrand || 'Verified Review Partner'}</span>
          </div>
          <span className="text-[10px] text-slate-400">
            Fast 5★ Review
          </span>
        </footer>
      </main>

      {/* Sticky Bottom Giant Action Button (Mobile-first Floating Bar) */}
      <div className="fixed bottom-0 inset-x-0 p-3 bg-white/90 backdrop-blur-md border-t border-slate-200/80 flex flex-col items-center shadow-2xl z-40">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={handleCopyAndOpenGoogle}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98] animate-pulse-subtle"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Copy className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm sm:text-base font-extrabold flex items-center gap-1.5">
                <span>Copy Review & Open Google</span>
                <span className="text-amber-300">⭐⭐⭐⭐⭐</span>
              </div>
              <div className="text-[11px] text-blue-100 font-normal">
                Copies your review • then opens Google to paste
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Review Copied Success Modal */}
      <ReviewModal
        isOpen={showReviewSuccessModal}
        onClose={() => setShowReviewSuccessModal(false)}
        reviewText={editedText}
        googleUrl={googleReviewUrl}
        businessName={config.businessName}
      />

      {/* Private Feedback Shield Modal (1-3 stars) */}
      <PrivateFeedbackModal
        isOpen={showFeedbackModal}
        onClose={handleFeedbackClose}
        rating={rating}
        businessName={config.businessName}
        managerPhone={config.whatsapp}
        googleUrl={googleReviewUrl}
        onResetRating={() => {
          setRating(5);
          setShowFeedbackModal(false);
        }}
      />
    </div>
  );
}
