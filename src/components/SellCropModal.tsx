import React, { useState } from 'react';
import { CropListing, CropCategory } from '../types';
import { X, Sparkles, Plus, Check } from 'lucide-react';

interface SellCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: CropListing) => void;
  language: 'en' | 'hi';
}

export const SellCropModal: React.FC<SellCropModalProps> = ({
  isOpen,
  onClose,
  onAddListing,
  language,
}) => {
  const isHi = language === 'hi';

  const [cropName, setCropName] = useState('Sharbati Wheat');
  const [variety, setVariety] = useState('C-306 Bold');
  const [category, setCategory] = useState<CropCategory>('cereals');
  const [quantityQuintals, setQuantityQuintals] = useState<number>(120);
  const [pricePerQuintal, setPricePerQuintal] = useState<number>(3480);
  const [moisturePercent, setMoisturePercent] = useState<number>(11.2);
  const [organicCertified, setOrganicCertified] = useState<boolean>(false);
  const [farmerName, setFarmerName] = useState('Baldev Singh');
  const [district, setDistrict] = useState('Hoshiarpur');
  const [state, setState] = useState('Punjab');
  const [phone, setPhone] = useState('+91 98150 12345');
  const [description, setDescription] = useState('Sun dried, machine harvested, sorted and bagged in 50kg jute bags.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCrop: CropListing = {
      id: `crop-${Date.now()}`,
      cropName,
      hindiName: cropName,
      variety,
      category,
      quantityQuintals: Number(quantityQuintals),
      pricePerQuintal: Number(pricePerQuintal),
      mandiBenchmarkPrice: Math.round(Number(pricePerQuintal) * 0.97),
      negotiable: true,
      qualityGrade: 'Grade A+ (Premium)',
      moisturePercent: Number(moisturePercent),
      organicCertified,
      harvestDate: 'This Week',
      farmerName,
      village: 'Gram Panchayat',
      district,
      state,
      distanceKm: 12,
      phone,
      imageUrl: '/src/assets/images/hero_farmer_harvest_wheat_1790577170296.jpg',
      verifiedKisan: true,
      minOrderQuintals: 20,
      description,
    };

    onAddListing(newCrop);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Direct Mandi Listing · 0% Commission</span>
        </div>

        <h3 className="text-xl font-bold font-display text-slate-900">
          {isHi ? 'अपनी फसल की बिक्री सूची बनाएं' : 'List Your Crop For Sale (Sell Crop)'}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {isHi
            ? 'सीधे सत्यापित खरीदारों से सर्वोत्तम मूल्य प्राप्त करें'
            : 'Post your farm inventory to thousands of verified millers, exporters, and wholesale buyers.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Crop Name / फसल नाम
              </label>
              <input
                type="text"
                required
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Variety / किस्म
              </label>
              <input
                type="text"
                required
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Quantity (Quintals)
              </label>
              <input
                type="number"
                required
                min="1"
                value={quantityQuintals}
                onChange={(e) => setQuantityQuintals(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Expected Price (₹ / Quintal)
              </label>
              <input
                type="number"
                required
                min="1"
                value={pricePerQuintal}
                onChange={(e) => setPricePerQuintal(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* AI Recommended Price Helper */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-medium">
              AI Market Benchmark for {cropName}:
            </span>
            <span className="font-mono font-bold text-emerald-800">
              ₹{(pricePerQuintal * 0.98).toFixed(0)} – ₹{(pricePerQuintal * 1.04).toFixed(0)} / Qtl
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Moisture %
              </label>
              <input
                type="number"
                step="0.1"
                value={moisturePercent}
                onChange={(e) => setMoisturePercent(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Farmer Contact Phone
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                District / जिला
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                State / राज्य
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={organicCertified}
              onChange={(e) => setOrganicCertified(e.target.checked)}
              className="rounded text-emerald-600"
            />
            <span className="text-xs text-slate-700 font-medium">
              This lot is NPOP / PGS-India Certified Organic (प्रमाणित जैविक)
            </span>
          </label>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Publish Crop Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
