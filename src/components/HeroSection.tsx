import React from 'react';
import { Search, Sparkles, TrendingUp, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { NavTab } from './Navbar';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  setActiveTab: (tab: NavTab) => void;
  language: 'en' | 'hi';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  searchQuery,
  setActiveTab,
  language,
}) => {
  const isHi = language === 'hi';

  const quickCrops = [
    { name: 'Wheat (गेहूं)', code: 'Wheat' },
    { name: 'Basmati Paddy (बासमती)', code: 'Basmati' },
    { name: 'Mustard (सरसों)', code: 'Mustard' },
    { name: 'Soybean (सोयाबीन)', code: 'Soybean' },
    { name: 'Onion (प्याज)', code: 'Onion' },
    { name: 'Cotton (कपास)', code: 'Cotton' },
  ];

  return (
    <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white overflow-hidden">
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Search & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet Metadata Kicker - No pills */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300 font-medium">
              <span>National Mandi Network</span>
              <span aria-hidden="true">·</span>
              <span>100% Direct Farm Gate</span>
              <span aria-hidden="true">·</span>
              <span>AI Crop Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              {isHi ? (
                <>
                  किसान का सच्चा साथी, <br />
                  <span className="text-emerald-400">सीधा सौदा, सही दाम।</span>
                </>
              ) : (
                <>
                  Direct Farm Trade & <br />
                  <span className="text-emerald-400">Real-Time Mandi Bhav.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/85 max-w-xl leading-relaxed">
              {isHi
                ? 'देशभर की 2,400+ APMC मंडियों के सटीक भाव, AI मूल्य पूर्वानुमान, रोग पहचान और सीधे खरीदारों से 0% कमीशन पर व्यापार।'
                : 'Connect directly with verified buyers across India. Access live APMC rates, AI price trajectory forecasts, and instantaneous crop disease diagnosis.'}
            </p>

            {/* Direct Search Input */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-emerald-500/30 overflow-hidden">
                <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder={
                    isHi
                      ? 'फसल का नाम या मंडी खोजें (उदा: गेहूं, नासिक, बासमती)...'
                      : 'Search crop, APMC mandi, or state (e.g. Wheat, Nashik, Basmati)...'
                  }
                  className="w-full py-3.5 pl-3 pr-4 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearch('')}
                    className="mr-3 text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Quick Search Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-emerald-200/90">
                <span className="font-semibold text-emerald-300">
                  {isHi ? 'लोकप्रिय:' : 'Trending:'}
                </span>
                {quickCrops.map((crop) => (
                  <button
                    key={crop.code}
                    onClick={() => onSearch(crop.code)}
                    className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {crop.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('mandi')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-sm transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{isHi ? 'लाइव मंडी भाव देखें' : 'View Mandi Bhav'}</span>
              </button>
              <button
                onClick={() => setActiveTab('doctor')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>{isHi ? 'AI फसल डॉक्टर' : 'AI Crop Doctor'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/20 bg-slate-800">
              <img
                src="/src/assets/images/hero_farmer_harvest_wheat_1790577170296.jpg"
                alt="Indian farmer inspecting golden harvest wheat"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6">
                {/* Live Micro Ticker */}
                <div className="flex items-center justify-between text-xs text-emerald-300 font-medium mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Live APMC Sync</span>
                  </div>
                  <span>Updated 12 mins ago</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {isHi ? 'मध्य प्रदेश शरबती गेहूं ₹3,680 / क्विंटल' : 'Madhya Pradesh Sharbati Wheat ₹3,680 / Qtl'}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {isHi ? 'पिछले सप्ताह से +4.2% की वृद्धि दर्ज की गई' : 'AI Model forecasts +4.2% demand surge over the next 10 days'}
                </p>
              </div>
            </div>

            {/* Quick Proof Metrics adjacent to image */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center border-t border-emerald-800/40">
              <div>
                <p className="text-xs text-emerald-300 font-medium">Daily Mandis</p>
                <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-white">2,480+</p>
              </div>
              <div className="border-x border-emerald-800/40">
                <p className="text-xs text-emerald-300 font-medium">Verified Kisans</p>
                <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-white">18,500+</p>
              </div>
              <div>
                <p className="text-xs text-emerald-300 font-medium">Farmer Savings</p>
                <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-white">0% Comm.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
