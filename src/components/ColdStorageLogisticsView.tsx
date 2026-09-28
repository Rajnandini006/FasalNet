import React, { useState } from 'react';
import { COLD_STORAGE_FACILITIES } from '../data/mockData';
import { ColdStorageItem } from '../types';
import { Warehouse, Truck, ShieldCheck, Thermometer, Phone, CheckCircle, Calculator, MapPin } from 'lucide-react';

interface ColdStorageLogisticsViewProps {
  language: 'en' | 'hi';
}

export const ColdStorageLogisticsView: React.FC<ColdStorageLogisticsViewProps> = ({ language }) => {
  const isHi = language === 'hi';
  const [bookedStoreId, setBookedStoreId] = useState<string | null>(null);

  // Freight Estimator State
  const [vehicleType, setVehicleType] = useState<'ace' | 'bolero' | 'truck'>('bolero');
  const [distanceKm, setDistanceKm] = useState<number>(45);

  const vehicleRates = {
    ace: { name: 'Tata Ace (1.5 Ton / 15 Quintals)', baseRate: 600, perKm: 18 },
    bolero: { name: 'Bolero Maxi Truck (2.5 Ton / 25 Quintals)', baseRate: 950, perKm: 24 },
    truck: { name: 'Eicher 14ft (6 Ton / 60 Quintals)', baseRate: 1800, perKm: 38 },
  };

  const selectedVehicle = vehicleRates[vehicleType];
  const totalFreight = selectedVehicle.baseRate + distanceKm * selectedVehicle.perKm;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
          {isHi ? 'ग्रामीण कोल्ड स्टोरेज एवं मंडी परिवहन' : 'Kisan Cold Storage & Mandi Logistics'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {isHi
            ? 'फसल को कम दाम में बेचने की मजबूरी खत्म करें। निकटतम प्रमाणित शीतगृह में सुरक्षित रखें एवं सीधे मंडी हेतु वाहन बुक करें।'
            : 'Prevent distress selling during market dips. Reserve temperature-controlled warehouse space and book farm-to-mandi transit.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Cold Storage Directory */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Warehouse className="w-4 h-4 text-emerald-700" />
            <span>{isHi ? 'सत्यापित शीतगृह सुविधाएं' : 'Verified Cold Storages Near You'}</span>
          </h3>

          <div className="space-y-4">
            {COLD_STORAGE_FACILITIES.map((facility) => {
              const isBooked = bookedStoreId === facility.id;

              return (
                <div
                  key={facility.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-display">
                        {facility.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {facility.district}, {facility.state} ({facility.distanceKm} km away)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-mono tabular-nums font-bold text-slate-900">
                        ₹{facility.ratePerBagMonth}
                      </span>
                      <span className="text-xs text-slate-400 block">/ bag / month</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Available Space</span>
                      <span className="font-mono font-bold text-emerald-700">
                        {facility.availableCapacityBags.toLocaleString('en-IN')} Bags
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Temp Range</span>
                      <span className="font-mono font-semibold text-slate-700">
                        {facility.temperatureRange}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Insurance</span>
                      <span className="font-semibold text-slate-700">100% Covered</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>CCTV Monitored</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${facility.phone}`}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Call Facility
                      </a>
                      <button
                        onClick={() => setBookedStoreId(facility.id)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          isBooked
                            ? 'bg-emerald-800 text-white'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                      >
                        {isBooked ? 'Slot Reserved!' : 'Reserve Space'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Freight & Transport Estimator */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-5 h-fit">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>{isHi ? 'मंडी परिवहन भाड़ा अनुमान' : 'Mandi Freight & Mini-Truck Booking'}</span>
          </div>

          <h3 className="text-lg font-bold font-display text-slate-900">
            {isHi ? 'किराया कैलकुलेटर' : 'Freight Rate Estimator'}
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isHi ? 'वाहन प्रकार चुनें:' : 'Select Vehicle Class:'}
              </label>
              <div className="space-y-2">
                {(['ace', 'bolero', 'truck'] as const).map((type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      vehicleType === type
                        ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="vehicle"
                        checked={vehicleType === type}
                        onChange={() => setVehicleType(type)}
                        className="text-emerald-600"
                      />
                      <span className="font-semibold text-slate-800">
                        {vehicleRates[type].name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>{isHi ? 'खेत से मंडी दूरी:' : 'Distance to Mandi:'}</span>
                <span className="font-mono text-emerald-700">{distanceKm} km</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Estimated Total Breakdown */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Base Loading & Trip Charge:</span>
                <span className="font-mono">₹{selectedVehicle.baseRate}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Transit Distance Charge ({distanceKm} km × ₹{selectedVehicle.perKm}):</span>
                <span className="font-mono">₹{distanceKm * selectedVehicle.perKm}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-800 text-sm">Estimated Total Freight:</span>
                <span className="text-xl font-bold font-mono tabular-nums text-emerald-800">
                  ₹{totalFreight.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Vehicle booking request registered for ${selectedVehicle.name}! Our rural dispatch team will call you within 15 minutes.`)}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-xs"
            >
              {isHi ? 'ड्राइवर से संपर्क करें' : 'Book Local Agrilogistics Truck'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
