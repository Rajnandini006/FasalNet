import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MandiBhavView } from './components/MandiBhavView';
import { MarketplaceView } from './components/MarketplaceView';
import { CropDoctorView } from './components/CropDoctorView';
import { KisanSathiChat } from './components/KisanSathiChat';
import { ColdStorageLogisticsView } from './components/ColdStorageLogisticsView';
import { SellCropModal } from './components/SellCropModal';
import { MakeOfferModal } from './components/MakeOfferModal';
import { Footer } from './components/Footer';
import { MANDI_PRICES, CROP_LISTINGS } from './data/mockData';
import { CropListing } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('mandi');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState<CropListing[]>(CROP_LISTINGS);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [offerCrop, setOfferCrop] = useState<CropListing | null>(null);

  const handleAddListing = (newCrop: CropListing) => {
    setListings((prev) => [newCrop, ...prev]);
    setActiveTab('marketplace');
  };

  const handleSelectCropToSellFromMandi = (commodity: string) => {
    setSellModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf7] text-slate-800">
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSellModal={() => setSellModalOpen(true)}
        language={language}
        setLanguage={setLanguage}
        bidsCount={listings.length}
      />

      {/* Main Campaign Hero Section */}
      <HeroSection
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        setActiveTab={setActiveTab}
        language={language}
      />

      {/* Viewport Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'mandi' && (
          <MandiBhavView
            mandiPrices={MANDI_PRICES}
            searchQuery={searchQuery}
            language={language}
            onSelectCropToSell={handleSelectCropToSellFromMandi}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            listings={listings}
            searchQuery={searchQuery}
            language={language}
            onMakeOffer={(crop) => setOfferCrop(crop)}
            onOpenSellModal={() => setSellModalOpen(true)}
          />
        )}

        {activeTab === 'doctor' && (
          <CropDoctorView language={language} />
        )}

        {activeTab === 'advisory' && (
          <KisanSathiChat language={language} />
        )}

        {activeTab === 'storage' && (
          <ColdStorageLogisticsView language={language} />
        )}
      </main>

      {/* Interactive Modals */}
      <SellCropModal
        isOpen={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        onAddListing={handleAddListing}
        language={language}
      />

      <MakeOfferModal
        crop={offerCrop}
        onClose={() => setOfferCrop(null)}
        language={language}
      />

      {/* Domain-Native Footer */}
      <Footer setActiveTab={setActiveTab} language={language} />
    </div>
  );
}
