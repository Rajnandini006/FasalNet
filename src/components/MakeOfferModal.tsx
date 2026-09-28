import React, { useState } from 'react';
import { CropListing } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Scale } from 'lucide-react';

interface MakeOfferModalProps {
  crop: CropListing | null;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  crop,
  onClose,
  language,
}) => {
  const isHi = language === 'hi';
  if (!crop) return null;

  const [orderQuantity, setOrderQuantity] = useState<number>(crop.minOrderQuintals);
  const [offeredRate, setOfferedRate] = useState<number>(crop.pricePerQuintal);
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivered'>('pickup');
  const [dealStatus, setDealStatus] = useState<'idle' | 'submitted' | 'countered'>('idle');

  const totalValue = orderQuantity * offeredRate;
  const askingTotal = orderQuantity * crop.pricePerQuintal;
  const savings = askingTotal - totalValue;

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    setDealStatus('submitted');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>FasalNet Direct Trade Agreement</span>
        </div>

        <h3 className="text-xl font-bold font-display text-slate-900">
          {isHi ? 'सौदा प्रस्ताव भेजें (Bargain / Make Offer)' : 'Submit Direct Trade Offer'}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Listing: <span className="font-semibold text-slate-800">{crop.cropName}</span> ({crop.variety}) by {crop.farmerName}
        </p>

        {dealStatus === 'submitted' ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-display">
              {isHi ? 'प्रस्ताव सफलतापूर्वक भेजा गया!' : 'Trade Offer Dispatched to Farmer!'}
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              SMS and WhatsApp notification sent to <span className="font-semibold">{crop.farmerName}</span> with your bid of{' '}
              <strong className="font-mono">₹{offeredRate}/Qtl</strong> for{' '}
              <strong className="font-mono">{orderQuantity} Quintals</strong> (Total ₹{totalValue.toLocaleString('en-IN')}).
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 max-w-xs mx-auto">
              Farmer usually confirms within 30 minutes. You will receive an SMS prompt to authorize payment into escrow.
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendOffer} className="space-y-4 text-xs sm:text-sm">
            {/* Lot Availability & Asking Price */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block">Farmer Asking Rate</span>
                <span className="text-base font-bold font-mono tabular-nums text-slate-800">
                  ₹{crop.pricePerQuintal}
                  <span className="text-xs font-normal text-slate-500"> / Qtl</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Available In Lot</span>
                <span className="text-base font-bold font-mono tabular-nums text-slate-800">
                  {crop.quantityQuintals} Quintals
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <label>Order Quantity (Quintals)</label>
                <span className="text-slate-400">Min: {crop.minOrderQuintals} Qtl</span>
              </div>
              <input
                type="number"
                min={crop.minOrderQuintals}
                max={crop.quantityQuintals}
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <label>Your Counter Price (₹ / Quintal)</label>
                <span className="text-emerald-700 font-semibold font-mono">
                  {savings > 0 ? `₹${savings.toLocaleString('en-IN')} below asking` : 'At asking rate'}
                </span>
              </div>
              <input
                type="number"
                min={Math.round(crop.pricePerQuintal * 0.7)}
                max={Math.round(crop.pricePerQuintal * 1.3)}
                value={offeredRate}
                onChange={(e) => setOfferedRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Delivery Terms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Fulfillment Logistics
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMode('pickup')}
                  className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                    deliveryMode === 'pickup'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Self Farm Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMode('delivered')}
                  className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                    deliveryMode === 'delivered'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Farmer Mandi Dispatch
                </button>
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-baseline justify-between">
              <div>
                <span className="text-xs text-emerald-900 font-medium block">Total Trade Consideration:</span>
                <span className="text-xs text-emerald-700">0% buyer fee · Escrow protected</span>
              </div>
              <span className="text-xl font-bold font-mono tabular-nums text-emerald-950">
                ₹{totalValue.toLocaleString('en-IN')}
              </span>
            </div>

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
                Transmit Deal Offer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
