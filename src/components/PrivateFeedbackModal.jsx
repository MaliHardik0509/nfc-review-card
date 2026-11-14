import React, { useState } from 'react';
import { AlertCircle, Send, CheckCircle2, X, Copy } from 'lucide-react';
import { getWhatsAppFeedbackUrl, copyToClipboard } from '../utils/googleReview';

export default function PrivateFeedbackModal({
  isOpen,
  onClose,
  rating,
  businessName,
  managerPhone,
  googleUrl,
  onResetRating
}) {
  const [feedback, setFeedback] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const feedbackSummary = [
    `Feedback for ${businessName || 'the business'} (${rating}/5 stars)`,
    feedback,
    customerName ? `Name: ${customerName}` : '',
    customerContact ? `Contact: ${customerContact}` : '',
  ].filter(Boolean).join('\n');

  const handleCopy = async () => {
    const success = await copyToClipboard(feedbackSummary);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    // Nothing is actually delivered by this app: without a WhatsApp number
    // there is no channel to send to, so copy the text instead of claiming
    // it was submitted.
    if (!managerPhone) {
      handleCopy();
      return;
    }

    const waUrl = getWhatsAppFeedbackUrl({
      phone: managerPhone,
      businessName,
      rating,
      feedback,
      customerName,
      customerContact
    });

    if (!waUrl) {
      handleCopy();
      return;
    }

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setWhatsAppUrl(waUrl);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setCopied(false);
    setWhatsAppUrl('');
    setFeedback('');
    setCustomerName('');
    setCustomerContact('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100/80 text-slate-500 hover:text-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Your Feedback Is Ready to Send</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              WhatsApp has opened with your message pre-filled for {businessName || 'the management team'}. Tap <strong>Send</strong> there to deliver it privately.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nothing is posted publicly, and nothing is delivered until you tap Send in WhatsApp.
            </p>
            <div className="pt-4 space-y-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3 px-6 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition"
              >
                WhatsApp didn't open? Tap here
              </a>
              <button
                onClick={handleClose}
                className="w-full py-3 px-6 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-amber-500/10 border-b border-amber-500/20 p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">We Value Your Experience</h2>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                We're sorry your visit was a {rating}-star experience. Please let management know directly so we can resolve this right away.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {!managerPhone && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-800">
                  This business hasn't added a private WhatsApp feedback number, so this form can't deliver your message automatically. Use the button below to copy it and share it with the staff directly.
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  What could we have done better? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Please share details about your experience..."
                  className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none resize-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Phone / Email (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerContact}
                    onChange={(e) => setCustomerContact(e.target.value)}
                    placeholder="For follow up"
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  {managerPhone ? (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </>
                  ) : copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy My Feedback</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={onResetRating}
                    className="hover:text-slate-600 underline"
                  >
                    Change Star Rating
                  </button>

                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-slate-600 underline"
                  >
                    Continue to Google Review
                  </a>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
