import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminPinModal({ isOpen, onClose, onSuccess, currentPin = '1234' }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = (inputPin = pin) => {
    const expectedPin = (currentPin || '1234').toString().trim();
    if (inputPin.trim() === expectedPin) {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  const handleDigitClick = (digit) => {
    if (pin.length >= 6) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError(false);
    if (newPin.length === (currentPin || '1234').length) {
      handleVerify(newPin);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleVerify();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col p-6 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon */}
        <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all ${
          error ? 'bg-red-100 text-red-600 animate-shake' : 'bg-blue-100 text-blue-600'
        }`}>
          {error ? <AlertCircle className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
        </div>

        <h3 className="text-xl font-bold text-slate-800">Owner Access</h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          Enter 4-digit Master PIN to configure this NFC & QR Card
        </p>

        {/* PIN Dots Display */}
        <div className="flex justify-center items-center gap-3 mb-6">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-150 ${
                  error
                    ? 'bg-red-500 ring-4 ring-red-100'
                    : isFilled
                    ? 'bg-blue-600 scale-110 ring-4 ring-blue-100'
                    : 'bg-slate-200'
                }`}
              />
            );
          })}
        </div>

        {/* Hidden Input for Keyboard typing */}
        <input
          ref={inputRef}
          type="password"
          maxLength={6}
          inputMode="numeric"
          pattern="[0-9]*"
          value={pin}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPin(val);
            setError(false);
            if (val.length === (currentPin || '1234').length) {
              handleVerify(val);
            }
          }}
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute -z-10"
        />

        {error && (
          <p className="text-xs font-semibold text-red-600 mb-3 animate-shake">
            Incorrect PIN. Please try again.
          </p>
        )}

        {/* Numeric Onscreen Keypad for Easy Mobile Tap */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigitClick(num.toString())}
              className="py-3 bg-slate-100/80 hover:bg-slate-200/90 active:bg-blue-100 text-slate-800 font-bold text-lg rounded-2xl transition"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleDelete}
            className="py-3 bg-slate-100/60 hover:bg-slate-200 active:bg-slate-300 text-slate-500 font-medium text-xs rounded-2xl transition flex items-center justify-center"
          >
            Del
          </button>
          <button
            type="button"
            onClick={() => handleDigitClick('0')}
            className="py-3 bg-slate-100/80 hover:bg-slate-200/90 active:bg-blue-100 text-slate-800 font-bold text-lg rounded-2xl transition"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => handleVerify()}
            className="py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-2xl transition flex items-center justify-center shadow-md shadow-blue-500/20"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[11px] text-slate-400">
          Default Master PIN is <span className="font-mono font-bold text-slate-600">1234</span>
        </p>
      </div>
    </div>
  );
}

