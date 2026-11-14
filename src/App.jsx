import React, { useState, useEffect } from 'react';
import CustomerReviewFlow from './components/CustomerReviewFlow';
import AdminConfigModal from './components/AdminConfigModal';
import AdminPinModal from './components/AdminPinModal';

const DEFAULT_CONFIG = {
  businessName: 'Your Business Name',
  placeId: '', // e.g. ChIJN1t_tDeuEmsRUsoyG83frY4
  customReviewUrl: '',
  category: 'restaurant',
  whatsapp: '',
  geminiApiKey: '',
  adminPin: '1234',
  agencyBrand: 'Verified Review Partner',
};

export default function App() {
  const [config, setConfig] = useState(() => {
    // 1. Device-level defaults & stored settings
    let stored = DEFAULT_CONFIG;
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nfc_card_config');
        if (saved) {
          stored = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error('Failed reading config from localStorage', e);
      }

      // 2. Multi-tenant Distributor URL parameters:
      // When a card is tapped/scanned, URL parameters strictly isolate each business
      // so one business NEVER inherits another business's details!
      const params = new URLSearchParams(window.location.search);
      const name = params.get('name') || params.get('biz');
      const placeId = params.get('placeId') || params.get('placeid') || params.get('pid');
      const customReviewUrl = params.get('url');
      const category = params.get('cat') || params.get('category');
      const whatsapp = params.get('wa') || params.get('phone');
      const brand = params.get('brand');

      if (name || placeId || customReviewUrl || category || whatsapp || brand) {
        return {
          ...stored,
          businessName: name || 'Welcome!',
          placeId: placeId || '',
          customReviewUrl: customReviewUrl || '',
          category: category || 'restaurant',
          whatsapp: whatsapp || '',
          agencyBrand: brand || stored.agencyBrand || 'Verified Review Partner',
        };
      }
    }

    return stored;
  });

  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check if URL requests admin access (?admin=1 or ?setup=1)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('setup') === '1' || params.get('admin') === '1') {
        setIsPinModalOpen(true);
        params.delete('setup');
        params.delete('admin');
        const query = params.toString();
        window.history.replaceState(
          {},
          '',
          window.location.pathname + (query ? `?${query}` : '') + window.location.hash
        );
      }
    }
  }, []);

  const handleAdminRequested = () => {
    setIsPinModalOpen(true);
  };

  const handlePinSuccess = () => {
    setIsPinModalOpen(false);
    setIsAdminOpen(true);
  };

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('nfc_card_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }

    // Saved settings must win over the card URL on reload, otherwise an owner
    // saving from their own card link would see every change reverted.
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState(
        {},
        '',
        window.location.pathname + window.location.hash
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans">
      <CustomerReviewFlow
        config={config}
        onOpenAdmin={handleAdminRequested}
      />

      <AdminPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handlePinSuccess}
        currentPin={config.adminPin || '1234'}
      />

      <AdminConfigModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
