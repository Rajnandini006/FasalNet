import React, { useState, useMemo } from 'react';
import { CropListing, CropCategory } from '../types';
import { ShieldCheck, MapPin, Phone, Sparkles, Scale, Check, ChevronRight, X, ArrowUpRight, MessageSquare } from 'lucide-react';

interface MarketplaceViewProps {
  listings: CropListing[];
  searchQuery: string;
  language: 'en' | 'hi';
  onMakeOffer: (crop: CropListing) => void;
  onOpenSellModal: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  listings,
  searchQuery,
  language,
  onMakeOffer,
  onOpenSellModal,
}) => {
  const isHi = language === 'hi';
  const [selectedCategory, setSelectedCategory] = useState<CropCategory>('all');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [selectedListing, setSelectedListing] = useState<CropListing | null>(null);

  const categories: { id: CropCategory; label: string; hiLabel: string }[] = [
    { id: 'all', label: 'All Crops', hiLabel: 'सभी फसलें' },
    { id: 'cereals', label: 'Cereals & Grains', hiLabel: 'अनाज (गेहूं/धान)' },
    { id: 'oilseeds', label: 'Oilseeds', hiLabel: 'तिलहन (सरसों/सोया)' },
    { id: 'vegetables', label: 'Vegetables', hiLabel: 'सब्जियां (प्याज/आलू)' },
    { id: 'fruits', label: 'Fruits', hiLabel: 'फल (आम/केला)' },
  ];

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesOrganic = !organicOnly || item.organicCertified;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.cropName.toLowerCase().includes(q) ||
        item.hindiName.includes(q) ||
        item.variety.toLowerCase().includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.farmerName.toLowerCase().includes(q);
      return matchesCategory && matchesOrganic && matchesSearch;
    });
  }, [listings, selectedCategory, organicOnly, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Category Bar and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            {isHi ? 'किसान डायरेक्ट मार्केटप्लेस' : 'Direct Kisan Crop Lots'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isHi
              ? 'बिचौलियों के बिना सीधे खेत से सत्यापित फसल लॉट खरीदें। 0% प्लेटफॉर्म फीस।'
              : 'Direct from farm gate. Verified moisture tests, transparent grading, and zero middleman fee.'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Categories */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {isHi ? cat.hiLabel : cat.label}
              </button>
            ))}
          </div>

          {/* Organic Filter Switch */}
          <button
            onClick={() => setOrganicOnly(!organicOnly)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              organicOnly
                ? 'bg-emerald-800 text-white border-emerald-800'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isHi ? 'केवल जैविक (Organic)' : 'Organic Certified Only'}
          </button>
        </div>
      </div>

      {/* Product Cards Grid - 3 columns desktop, generous spacing */}
      {filteredListings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 font-medium">
            {isHi ? 'कोई फसल लॉट नहीं मिला।' : 'No crop lots found matching your filter.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setOrganicOnly(false);
            }}
            className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((crop) => {
            const priceSpread = crop.pricePerQuintal - crop.mandiBenchmarkPrice;
            const isFavorable = priceSpread >= 0;

            return (
              <div
                key={crop.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Visual Header - 65% height presence */}
                <div className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropName}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Overlay gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      {crop.qualityGrade}
                    </span>
                    {crop.organicCertified && (
                      <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded backdrop-blur-xs border border-emerald-500/30">
                        Organic Certified
                      </span>
                    )}
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs text-emerald-300 font-medium">
                      {crop.variety}
                    </div>
                    <h3 className="text-lg font-bold font-display leading-tight">
                      {isHi ? crop.hindiName : crop.cropName}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Metrics */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Farmer & Location Metadata (Zero-pill text separators) */}
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{crop.farmerName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-semibold">Verified Kisan</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {crop.village}, {crop.district}, {crop.state} ({crop.distanceKm} km away)
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Moisture Stats */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Total Lot Size</span>
                      <span className="font-mono tabular-nums font-bold text-slate-800 text-sm">
                        {crop.quantityQuintals} Quintals
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Moisture Content</span>
                      <span className="font-mono tabular-nums font-bold text-slate-800 text-sm">
                        {crop.moisturePercent}%
                      </span>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Asking Price</div>
                      <div className="text-xl font-bold font-mono tabular-nums text-slate-900">
                        ₹{crop.pricePerQuintal.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-slate-500 ml-1">/ Quintal</span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-500">
                      <span>Mandi Benchmark</span>
                      <div className="font-mono tabular-nums font-semibold text-slate-700">
                        ₹{crop.mandiBenchmarkPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedListing(crop)}
                      className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      {isHi ? 'विवरण देखें' : 'View Details'}
                    </button>
                    <button
                      onClick={() => onMakeOffer(crop)}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>{isHi ? 'सौदा करें' : 'Make Offer'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Lot Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedListing(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Kisan Direct Listing</span>
              <span aria-hidden="true">·</span>
              <span>{selectedListing.qualityGrade}</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900">
              {isHi ? selectedListing.hindiName : selectedListing.cropName}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Variety: {selectedListing.variety} · Harvest: {selectedListing.harvestDate}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="rounded-xl overflow-hidden h-48 bg-slate-100">
                <img
                  src={selectedListing.imageUrl}
                  alt={selectedListing.cropName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block">Farmer Contact & Address</span>
                  <p className="font-bold text-slate-800 text-sm">{selectedListing.farmerName}</p>
                  <p className="text-slate-600">
                    {selectedListing.village}, {selectedListing.district}, {selectedListing.state}
                  </p>
                  <p className="font-mono font-semibold text-slate-700 mt-1">{selectedListing.phone}</p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block">Total Lot Volume</span>
                  <p className="font-mono font-bold text-slate-900 text-base">
                    {selectedListing.quantityQuintals} Quintals{' '}
                    <span className="text-xs font-normal text-slate-500">
                      (Min order: {selectedListing.minOrderQuintals} Qtl)
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block">Moisture Level</span>
                  <p className="font-mono font-bold text-slate-900 text-sm">
                    {selectedListing.moisturePercent}% (Verified Safe Storage)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quality & Inspection Notes
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedListing.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500">Asking Price</span>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  ₹{selectedListing.pricePerQuintal.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-slate-500">/ Quintal</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${selectedListing.phone}`}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors"
                >
                  Call Farmer
                </a>
                <button
                  onClick={() => {
                    const c = selectedListing;
                    setSelectedListing(null);
                    onMakeOffer(c);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors text-center"
                >
                  Initiate Trade Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
