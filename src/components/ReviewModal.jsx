import React from 'react';
import { CheckCircle2, ExternalLink, Star } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, reviewText, googleUrl, businessName }) {
  if (!isOpen) return null;

  // Browsers block window.open() calls that are not triggered by a real user
  // tap, so the redirect has to happen from this click handler only.
  const handleOpenNow = () => {
    window.open(googleUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mb-3 ring-8 ring-white/10 animate-bounce">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight">Review Copied!</h2>
          <p className="text-blue-100 text-sm mt-1 font-medium">
            Ready to paste in Google Reviews for {businessName || 'this business'}
          </p>
        </div>

        {/* 3 Step Visual Guide */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 text-center">
              Simple 3-Step Process (Takes 5 seconds)
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <div className="flex-1 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  <span>Select 5 Stars</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <div className="flex-1 text-sm font-medium text-slate-700">
                  <span className="text-blue-600 font-semibold">Paste</span> your copied review into the box
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <div className="flex-1 text-sm font-medium text-slate-700">
                  Tap <span className="font-semibold text-slate-900">"Post"</span> to submit!
                </div>
              </div>
            </div>
          </div>

          {/* Copied Text Snippet Preview */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-xs text-slate-600 italic line-clamp-2">
            "{reviewText}"
          </div>

          {/* Action Button */}
          <div className="pt-2 space-y-3">
            <button
              onClick={handleOpenNow}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span className="text-base">Open Google Reviews</span>
              <ExternalLink className="w-5 h-5" />
            </button>

            <p className="text-center text-[11px] text-slate-400">
              Your review is already on your clipboard — just tap the button above when you're ready.
            </p>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              Close & Edit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
