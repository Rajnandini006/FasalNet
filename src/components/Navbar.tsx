import React from 'react';
import { FasalNetLogo } from './FasalNetLogo';
import { PlusCircle, Globe, Sparkles } from 'lucide-react';

export type NavTab = 'mandi' | 'marketplace' | 'doctor' | 'advisory' | 'storage';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenSellModal: () => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  bidsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSellModal,
  language,
  setLanguage,
  bidsCount,
}) => {
  const isHi = language === 'hi';

  const navItems: { id: NavTab; label: string; hiLabel: string }[] = [
    { id: 'mandi', label: 'Mandi Bhav', hiLabel: 'मंडी भाव' },
    { id: 'marketplace', label: 'Marketplace', hiLabel: 'फसल बाजार' },
    { id: 'doctor', label: 'Crop Doctor', hiLabel: 'रोग निदान' },
    { id: 'advisory', label: 'AI Advisory', hiLabel: 'किसान साथी' },
    { id: 'storage', label: 'Cold Storage', hiLabel: 'कोल्ड स्टोरेज' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single Element Brand Wordmark */}
        <button
          onClick={() => setActiveTab('mandi')}
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5"
          aria-label="FasalNet Home"
        >
          <FasalNetLogo size="md" showSubtitle={true} />
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {isHi ? item.hiLabel : item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors whitespace-nowrap"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Sell Crop Button */}
          <button
            onClick={onOpenSellModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-lg shadow-sm active:scale-98 transition-all whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isHi ? 'फसल बेचें' : 'Sell Crop'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-100 px-3 py-1.5 overflow-x-auto gap-1 bg-slate-50/80">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-emerald-800 bg-emerald-100/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHi ? item.hiLabel : item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
