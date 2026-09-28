import React from 'react';
import { FasalNetLogo } from './FasalNetLogo';
import { NavTab } from './Navbar';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  language: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, language }) => {
  const isHi = language === 'hi';

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <FasalNetLogo size="md" isDark={true} />
            <p className="text-slate-400 leading-relaxed text-xs">
              {isHi
                ? 'भारतीय किसानों के लिए डिजिटल कृषि बाज़ार एवं कृत्रिम बुद्धिमत्ता (AI) आधारित मंडी विश्लेषक।'
                : 'Direct digital agricultural marketplace connecting Indian Kisans with buyers, verified APMC mandi prices, and plant health AI.'}
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              {isHi ? 'मंडी एवं बाजार' : 'Market & Mandi'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('mandi')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Live APMC Mandi Bhav
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Farm Gate Direct Lots
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('storage')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Cold Storage Network
                </button>
              </li>
            </ul>
          </div>

          {/* AI Tools */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              {isHi ? 'कृषि तकनीक' : 'Agritech AI Tools'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('doctor')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Plant Disease Diagnostic
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('advisory')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  AI Kisan Sathi Assistant
                </button>
              </li>
              <li>
                <span className="text-slate-500">Mandi Price Prediction Model</span>
              </li>
            </ul>
          </div>

          {/* Kisan Helpline */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              {isHi ? 'किसान सहायता' : 'Kisan Support'}
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Toll-free Kisan Call Center integration: <br />
              <span className="font-mono text-white font-semibold text-sm">1800-180-1551</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Compliant with e-NAM digital market guidelines and Soil Health Card standards.
            </p>
          </div>
        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} FasalNet. All agricultural trademarks acknowledged.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Trade</span>
            <span aria-hidden="true">·</span>
            <span>Zero Brokerage</span>
            <span aria-hidden="true">·</span>
            <span>Made for Bharat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
