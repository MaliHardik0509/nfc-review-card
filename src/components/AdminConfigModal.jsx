import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  Download, 
  Copy, 
  ExternalLink, 
  Smartphone, 
  Check, 
  Sparkles, 
  Building2, 
  ShieldAlert, 
  Users, 
  Plus, 
  Trash2, 
  Briefcase,
  Store
} from 'lucide-react';
import { BUSINESS_CATEGORIES } from '../data/categories';
import { copyToClipboard } from '../utils/googleReview';

const DEFAULT_CLIENTS = [
  {
    id: 'client-1',
    businessName: 'The Artisan Bistro & Cafe',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    category: 'restaurant',
    whatsapp: '+14155552671',
    customReviewUrl: '',
  },
  {
    id: 'client-2',
    businessName: 'Luxe Hair & Day Spa',
    placeId: 'ChIJ2eUgeAK6j4ARbn5u_wAGqWA',
    category: 'salon',
    whatsapp: '+14155558932',
    customReviewUrl: '',
  },
  {
    id: 'client-3',
    businessName: 'Downtown Dental Care',
    placeId: 'ChIJrTLr-GyuEmsRBfy61i59si0',
    category: 'clinic',
    whatsapp: '+14155554312',
    customReviewUrl: '',
  }
];

export default function AdminConfigModal({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) {
  // Load saved clients directory for distributors
  const [clients, setClients] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nfc_distributor_clients');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Failed reading distributor clients', e);
      }
    }
    return DEFAULT_CLIENTS;
  });

  const [selectedClientId, setSelectedClientId] = useState('client-1');
  const [formData, setFormData] = useState(() => {
    const match = clients.find((c) => c.id === 'client-1') || clients[0];
    return {
      businessName: match ? match.businessName : config.businessName,
      placeId: match ? (match.placeId || '') : (config.placeId || ''),
      category: match ? (match.category || 'restaurant') : (config.category || 'restaurant'),
      whatsapp: match ? (match.whatsapp || '') : (config.whatsapp || ''),
      customReviewUrl: match ? (match.customReviewUrl || '') : (config.customReviewUrl || ''),
      geminiApiKey: config.geminiApiKey || '',
      agencyBrand: config.agencyBrand || 'Verified Review Partner',
      adminPin: config.adminPin || '1234',
    };
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedClientId, setCopiedClientId] = useState(null);
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'qr' | 'clients' | 'nfc-guide'
  const qrRef = useRef(null);

  if (!isOpen) return null;

  // Build the live card URL with query parameters for portability
  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://example.com';
  
  const buildCardUrl = (client) => {
    const q = new URLSearchParams();
    if (client.businessName) q.set('name', client.businessName);
    if (client.placeId) q.set('placeId', client.placeId);
    if (client.customReviewUrl) q.set('url', client.customReviewUrl);
    if (client.category) q.set('cat', client.category);
    if (client.whatsapp) q.set('wa', client.whatsapp);
    if (formData.agencyBrand && formData.agencyBrand !== 'Verified Review Partner') {
      q.set('brand', formData.agencyBrand);
    }
    return `${baseUrl}${q.toString() ? '?' + q.toString() : ''}`;
  };

  const currentCardUrl = buildCardUrl(formData);

  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId);
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setFormData((prev) => ({
        businessName: client.businessName,
        placeId: client.placeId || '',
        category: client.category || 'restaurant',
        whatsapp: client.whatsapp || '',
        customReviewUrl: client.customReviewUrl || '',
        geminiApiKey: prev.geminiApiKey || '',
        agencyBrand: prev.agencyBrand || 'Verified Review Partner',
        adminPin: prev.adminPin || '1234',
      }));
    }
  };

  const handleAddNewClient = () => {
    const newId = `client-${Date.now()}`;
    const newClient = {
      id: newId,
      businessName: 'New Client Business',
      placeId: '',
      category: 'restaurant',
      whatsapp: '',
      customReviewUrl: '',
    };
    const updated = [...clients, newClient];
    setClients(updated);
    setSelectedClientId(newId);
    setFormData((prev) => ({
      businessName: newClient.businessName,
      placeId: '',
      category: 'restaurant',
      whatsapp: '',
      customReviewUrl: '',
      geminiApiKey: prev.geminiApiKey || '',
      agencyBrand: prev.agencyBrand || 'Verified Review Partner',
      adminPin: prev.adminPin || '1234',
    }));
    try {
      localStorage.setItem('nfc_distributor_clients', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteClient = (clientId) => {
    if (clients.length <= 1) return;
    const updated = clients.filter((c) => c.id !== clientId);
    setClients(updated);
    setSelectedClientId(updated[0].id);
    handleSelectClient(updated[0].id);
    try {
      localStorage.setItem('nfc_distributor_clients', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Update active client in clients directory
    const updatedClients = clients.map((c) =>
      c.id === selectedClientId
        ? {
            ...c,
            businessName: formData.businessName,
            placeId: formData.placeId,
            category: formData.category,
            whatsapp: formData.whatsapp,
            customReviewUrl: formData.customReviewUrl,
          }
        : c
    );
    setClients(updatedClients);
    try {
      localStorage.setItem('nfc_distributor_clients', JSON.stringify(updatedClients));
    } catch (err) {
      console.error(err);
    }

    onSaveConfig(formData);
    onClose();
  };

  const handleCopyUrl = async (url) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyTableUrl = async (clientId, url) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedClientId(clientId);
      setTimeout(() => setCopiedClientId(null), 2000);
    }
  };

  const handleDownloadQR = (businessName = formData.businessName) => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 1000;
    canvas.height = 1000;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 50, 50, 900, 900);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${(businessName || 'nfc-card').replace(/\s+/g, '-').toLowerCase()}-qr-code.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">NFC Card Distributor Hub</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Multi-Business
                </span>
              </div>
              <p className="text-xs text-slate-400">Configure & encode unlimited cards for any client</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Configure Business
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'qr'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            NFC URL & QR Code
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'clients'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All Clients Directory ({clients.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('nfc-guide')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'nfc-guide'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            NFC Writing Guide
          </button>
        </div>

        {/* Multi-Client Switcher Ribbon */}
        {activeTab !== 'clients' && (
          <div className="bg-blue-50/70 border-b border-blue-100/80 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Store className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-700">Active Client:</span>
              <select
                value={selectedClientId}
                onChange={(e) => handleSelectClient(e.target.value)}
                className="text-xs font-semibold bg-white border border-blue-200 text-slate-800 rounded-lg py-1 px-2.5 outline-none focus:ring-2 focus:ring-blue-500/30 flex-1 truncate"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.businessName} ({c.category})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAddNewClient}
                className="inline-flex items-center gap-1 py-1 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Client</span>
              </button>
              {clients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteClient(selectedClientId)}
                  className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete this client"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'settings' && (
            <form id="admin-form" onSubmit={handleSave} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Client Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g., Bella Napoli Italian Bistro"
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center justify-between">
                      <span>Google Place ID</span>
                      <a
                        href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-0.5 font-normal text-[11px]"
                      >
                        Find Place ID <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </label>
                    <input
                      type="text"
                      value={formData.placeId}
                      onChange={(e) => setFormData({ ...formData, placeId: e.target.value })}
                      placeholder="e.g., ChIJN1t_tDeuEmsRUsoyG83frY4"
                      className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition font-mono text-xs"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Directly opens Google review box without extra search!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Business Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
                    >
                      {BUSINESS_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Customizes review tag chips (Food, Service, Hygiene, etc.)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Alternative Custom Google Review Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.customReviewUrl}
                    onChange={(e) => setFormData({ ...formData, customReviewUrl: e.target.value })}
                    placeholder="https://g.page/r/your-id/review"
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition text-xs"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    If this client already has a shortlink from Google Business Profile.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Negative Review Shield (1-3 Star Protection)
                    </span>
                  </div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Manager WhatsApp Phone Number (with Country Code)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g., +14155552671 or +919876543210"
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    When an unhappy customer taps 1, 2, or 3 stars, they are sent to a private feedback form that alerts this WhatsApp number instead of posting publicly to Google!
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Distributor Agency Branding (White-Label)
                    </span>
                  </div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Your Agency Brand Name on Card Footer
                  </label>
                  <input
                    type="text"
                    value={formData.agencyBrand || 'Verified Review Partner'}
                    onChange={(e) => setFormData({ ...formData, agencyBrand: e.target.value })}
                    placeholder="e.g., Powered by SmartCards Agency"
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Displays at the bottom of customer cards. Free advertising for your card distribution business!
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Gemini AI Integration (Optional)
                    </span>
                  </div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Google Gemini API Key (Free)
                  </label>
                  <input
                    type="password"
                    value={formData.geminiApiKey || ''}
                    onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
                    placeholder="AIzaSy..."
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 outline-none transition font-mono text-xs"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Leaves infinite creative review variations. (If left blank, the app uses its built-in smart phrase combinatorial engine with zero API required!)
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Owner Security & Master PIN
                    </span>
                  </div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Admin Access PIN (4-6 digits)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.adminPin || '1234'}
                    onChange={(e) => setFormData({ ...formData, adminPin: e.target.value.replace(/\D/g, '') })}
                    placeholder="1234"
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition font-mono tracking-widest text-sm"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Protects these settings from customers. To unlock setup, tap the bottom footer badge 5 times or add <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-mono">?admin=1</code> to the web address.
                  </p>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                <div ref={qrRef} className="p-3 bg-white rounded-2xl shadow-sm border border-blue-100 flex-shrink-0">
                  <QRCodeSVG
                    value={currentCardUrl}
                    size={160}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-bold text-slate-800 text-sm">{formData.businessName}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold uppercase">
                      {formData.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Encode this exact link into this client's physical NFC chip and print this QR code on their card stand:
                  </p>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-2 text-xs font-mono text-slate-700 break-all">
                    <span className="truncate flex-1">{currentCardUrl}</span>
                    <button
                      onClick={() => handleCopyUrl(currentCardUrl)}
                      className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg flex-shrink-0 transition"
                      title="Copy URL"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => handleDownloadQR(formData.businessName)}
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download QR PNG</span>
                    </button>
                    <a
                      href={currentCardUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Test Client Page</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
                <p className="font-semibold text-slate-800">💡 Distributor Scaling Guide:</p>
                <p>
                  Because all business details are packed into each card's unique URL query string (<code>?name=...&placeId=...&cat=...&wa=...</code>), <strong>1 single hosted site serves unlimited clients!</strong> Each client's card opens their own branded review page independently.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Your Saved Client Businesses</h3>
                  <p className="text-xs text-slate-500">Manage all clients and copy their card URLs</p>
                </div>
                <button
                  onClick={handleAddNewClient}
                  className="inline-flex items-center gap-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Client</span>
                </button>
              </div>

              <div className="space-y-3">
                {clients.map((client) => {
                  const url = buildCardUrl(client);
                  const isCurrent = client.id === selectedClientId;
                  return (
                    <div
                      key={client.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-blue-50/50 border-blue-300 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-sm">{client.businessName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase">
                            {client.category}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              handleSelectClient(client.id);
                              setActiveTab('settings');
                            }}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition"
                          >
                            Configure
                          </button>
                          <button
                            onClick={() => {
                              handleSelectClient(client.id);
                              setActiveTab('qr');
                            }}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1"
                          >
                            <span>QR Code</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/70 rounded-xl p-2 text-xs font-mono text-slate-600">
                        <span className="truncate flex-1">{url}</span>
                        <button
                          onClick={() => handleCopyTableUrl(client.id, url)}
                          className="p-1 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-md border border-slate-200 flex-shrink-0 transition"
                          title="Copy Link"
                        >
                          {copiedClientId === client.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
                        <span>Place ID: {client.placeId ? '✓ Linked' : '⚠️ Missing'}</span>
                        <span>Shield: {client.whatsapp ? '✓ WhatsApp Active' : 'No Phone'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'nfc-guide' && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>How to Program NFC Cards for Clients in 30s</span>
                </h3>
                <p className="text-xs text-indigo-800 mt-1">
                  You can program standard blank NFC chips (NTAG213, NTAG215, NTAG216) with any smartphone.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Select Client & Copy Their URL</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Select the business from the client list, go to <strong>NFC URL & QR Code</strong>, and click <strong>Copy URL</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Open "NFC Tools" App on Phone</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Open the free <strong>NFC Tools</strong> app (iOS / Android), go to the <strong>Write</strong> tab, and tap <strong>Add a record</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Select "Custom URL / URI" & Paste</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Paste the client's URL and tap OK.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Tap "Write" & Touch Blank Card</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Tap Write on your screen, hold the physical card to your phone. It writes in 1 second!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Active Client: <strong className="text-slate-800">{formData.businessName}</strong>
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-medium text-slate-600 hover:text-slate-800 transition"
            >
              Close
            </button>
            <button
              type="submit"
              form="admin-form"
              className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-500/20 transition"
            >
              Save Client Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
