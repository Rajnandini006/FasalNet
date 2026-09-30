import React, { useState, useMemo } from 'react';
import { MandiPrice } from '../types';
import { TrendingUp, TrendingDown, Minus, Sparkles, Filter, Calculator, ArrowUpDown, ChevronRight, X, LineChart as LineChartIcon, Table as TableIcon } from 'lucide-react';
import { PriceTrendsChart } from './PriceTrendsChart';

interface MandiBhavViewProps {
  mandiPrices: MandiPrice[];
  searchQuery: string;
  language: 'en' | 'hi';
  onSelectCropToSell?: (commodity: string) => void;
}

export const MandiBhavView: React.FC<MandiBhavViewProps> = ({
  mandiPrices,
  searchQuery,
  language,
  onSelectCropToSell,
}) => {
  const isHi = language === 'hi';
  const [selectedState, setSelectedState] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'arrivals'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeMandiForecast, setActiveMandiForecast] = useState<MandiPrice | null>(null);
  const [selectedTrendCommodityId, setSelectedTrendCommodityId] = useState<string>('mp-1');
  const [activeSubView, setActiveSubView] = useState<'all' | 'chart' | 'table'>('all');

  // Profit Calculator State
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcQuantity, setCalcQuantity] = useState<number>(100); // Quintals
  const [calcDistance, setCalcDistance] = useState<number>(35); // Km

  const states = useMemo(() => {
    const list = Array.from(new Set(mandiPrices.map((p) => p.state)));
    return ['all', ...list];
  }, [mandiPrices]);

  const filteredPrices = useMemo(() => {
    return mandiPrices
      .filter((item) => {
        const matchesState = selectedState === 'all' || item.state === selectedState;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          item.commodity.toLowerCase().includes(q) ||
          item.hindiName.includes(q) ||
          item.mandiName.toLowerCase().includes(q) ||
          item.district.toLowerCase().includes(q) ||
          item.state.toLowerCase().includes(q);
        return matchesState && matchesSearch;
      })
      .sort((a, b) => {
        let valA = a.modalPrice;
        let valB = b.modalPrice;
        if (sortBy === 'change') {
          valA = a.changePercent;
          valB = b.changePercent;
        } else if (sortBy === 'arrivals') {
          valA = a.arrivalsMetricTon;
          valB = b.arrivalsMetricTon;
        }
        return sortOrder === 'desc' ? valB - valA : valA - valB;
      });
  }, [mandiPrices, selectedState, searchQuery, sortBy, sortOrder]);

  const toggleSort = (field: 'price' | 'change' | 'arrivals') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleRowClick = (item: MandiPrice) => {
    setSelectedTrendCommodityId(item.id);
    setActiveMandiForecast(item);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <span>{isHi ? 'लाइव एपीएमसी मंडी भाव एवं मूल्य रुझान' : 'Live APMC Mandi Bhav & Price Trends'}</span>
            <span className="text-xs font-mono font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Agmarknet Synced
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isHi
              ? 'दैनिक आवक, 7-दिवसीय मूल्य ग्राफिक्स, न्यूनतम/अधिकतम भाव एवं कृत्रिम बुद्धिमत्ता (AI) द्वारा बिक्री सलाह'
              : 'Interactive 7-day fluctuation charts, daily arrivals, modal benchmark rates & AI sell/hold timing advisor'}
          </p>
        </div>

        {/* Action Controls & View Mode Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Subview Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveSubView('all')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeSubView === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHi ? 'चार्ट + तालिका' : 'Overview (Both)'}
            </button>
            <button
              onClick={() => setActiveSubView('chart')}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeSubView === 'chart'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHi ? 'मूल्य रुझान चार्ट' : 'Price Trends Chart'}</span>
            </button>
            <button
              onClick={() => setActiveSubView('table')}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeSubView === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-slate-600" />
              <span>{isHi ? 'मंडी तालिका' : 'Mandi Table'}</span>
            </button>
          </div>

          {/* State Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0">
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedState === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {st === 'all' ? (isHi ? 'सभी राज्य' : 'All States') : st}
              </button>
            ))}
          </div>

          {/* Profit Net Calculator Button */}
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200/80 rounded-lg transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{isHi ? 'मुनाफा कैलकुलेटर' : 'Net Margin Tool'}</span>
          </button>
        </div>
      </div>

      {/* Recharts Price Trends Visualization Section */}
      {(activeSubView === 'all' || activeSubView === 'chart') && (
        <PriceTrendsChart
          language={language}
          initialCommodityId={selectedTrendCommodityId}
          onSellCommodity={onSelectCropToSell}
        />
      )}

      {/* Interactive Mandi Net Revenue Calculator (Optional Dropdown) */}
      {showCalculator && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-6 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
                {isHi ? 'किसान नेट आय कैलकुलेटर' : 'Kisan Net Profit & Mandi Freight Arbitrage'}
              </h3>
            </div>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-emerald-800 mb-4">
            {isHi
              ? 'अपनी फसल की मात्रा और दूरी दर्ज करके वास्तविक मुनाफा जांचें (परिवहन लागत ₹3.5/क्विंटल/किमी)'
              : 'Calculate your actual take-home revenue after freight deduction (assumed ~₹3.5 per quintal per km).'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isHi ? 'फसल मात्रा (क्विंटल)' : 'Crop Lot Size (Quintals)'}
              </label>
              <input
                type="number"
                value={calcQuantity}
                onChange={(e) => setCalcQuantity(Number(e.target.value))}
                min="1"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono tabular-nums focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isHi ? 'मंडी से दूरी (किमी)' : 'Distance to Mandi (km)'}
              </label>
              <input
                type="number"
                value={calcDistance}
                onChange={(e) => setCalcDistance(Number(e.target.value))}
                min="1"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono tabular-nums focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div className="bg-white p-3 rounded-lg border border-emerald-300 flex flex-col justify-center">
              <span className="text-[11px] text-slate-500 font-medium">Estimated Freight Cost</span>
              <span className="text-base font-bold font-mono tabular-nums text-slate-800">
                ₹{(calcQuantity * calcDistance * 3.5).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* High Density Mandi Price Table */}
      {(activeSubView === 'all' || activeSubView === 'table') && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">
              {isHi ? 'दैनिक एपीएमसी मंडी दरें (क्लिक करके चार्ट देखें)' : 'Daily APMC Mandi Rates (Click row to inspect trend)'}
            </h3>
            <span className="text-xs text-slate-500">
              {filteredPrices.length} {isHi ? 'मंडियां सूचीबद्ध' : 'Mandis listed'}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/90 text-slate-600 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">{isHi ? 'फसल एवं किस्म' : 'Commodity & Variety'}</th>
                  <th className="py-3 px-4">{isHi ? 'मंडी एवं राज्य' : 'APMC Mandi & State'}</th>
                  <th className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleSort('price')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                    >
                      <span>{isHi ? 'मॉडल भाव (₹/क्विंटल)' : 'Modal Price (₹/Qtl)'}</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell">
                    {isHi ? 'न्यूनतम - अधिकतम' : 'Min - Max (₹)'}
                  </th>
                  <th className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleSort('change')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                    >
                      <span>{isHi ? '24 घंटे बदलाव' : '24h Change'}</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 text-right hidden md:table-cell">
                    <button
                      onClick={() => toggleSort('arrivals')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                    >
                      <span>{isHi ? 'दैनिक आवक (MT)' : 'Arrivals (MT)'}</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 text-center">{isHi ? 'AI पूर्वानुमान' : 'AI Forecast'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPrices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      {isHi ? 'कोई मंडी भाव नहीं मिला।' : 'No mandi prices found matching your search.'}
                    </td>
                  </tr>
                ) : (
                  filteredPrices.map((item) => {
                    const isBullish = item.change > 0;
                    const isBearish = item.change < 0;
                    const isCurrentChartSelected = selectedTrendCommodityId === item.id;

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                          isCurrentChartSelected ? 'bg-emerald-50/40' : ''
                        }`}
                        onClick={() => handleRowClick(item)}
                      >
                        {/* Commodity */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{isHi ? item.hindiName : item.commodity}</span>
                            {isCurrentChartSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" title="Active on Chart" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {item.variety}
                          </div>
                        </td>

                        {/* Mandi & State */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{item.mandiName}</div>
                          <div className="text-xs text-slate-500">
                            {item.district}, {item.state}
                          </div>
                        </td>

                        {/* Modal Price */}
                        <td className="py-3.5 px-4 text-right">
                          <span className="font-mono tabular-nums text-base font-extrabold text-slate-900">
                            ₹{item.modalPrice.toLocaleString('en-IN')}
                          </span>
                          <div className="text-[11px] text-slate-400">per Quintal</div>
                        </td>

                        {/* Min - Max Price */}
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums text-xs text-slate-600 hidden sm:table-cell">
                          ₹{item.minPrice} - ₹{item.maxPrice}
                        </td>

                        {/* 24h Change */}
                        <td className="py-3.5 px-4 text-right">
                          <div
                            className={`inline-flex items-center gap-1 font-mono tabular-nums text-xs font-bold ${
                              isBullish
                                ? 'text-emerald-700'
                                : isBearish
                                ? 'text-rose-600'
                                : 'text-slate-600'
                            }`}
                          >
                            {isBullish && <TrendingUp className="w-3.5 h-3.5" />}
                            {isBearish && <TrendingDown className="w-3.5 h-3.5" />}
                            {!isBullish && !isBearish && <Minus className="w-3.5 h-3.5" />}
                            <span>
                              {isBullish ? '+' : ''}
                              {item.changePercent}%
                            </span>
                          </div>
                          <div className="text-[11px] font-mono tabular-nums text-slate-400">
                            {isBullish ? '+' : ''}₹{item.change}
                          </div>
                        </td>

                        {/* Daily Arrivals */}
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums text-sm font-semibold text-slate-700 hidden md:table-cell">
                          {item.arrivalsMetricTon} MT
                        </td>

                        {/* AI Forecast Trigger */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(item);
                            }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{item.bestTime}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Mandi Price Prediction Drawer/Modal */}
      {activeMandiForecast && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveMandiForecast(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Mandi Trajectory Model</span>
              <span aria-hidden="true">·</span>
              <span>{activeMandiForecast.lastUpdated}</span>
            </div>

            <h3 className="text-xl font-bold font-display text-slate-900">
              {activeMandiForecast.commodity} — {activeMandiForecast.mandiName}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Variety: {activeMandiForecast.variety} ({activeMandiForecast.district}, {activeMandiForecast.state})
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Current Modal Price</span>
                <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                  ₹{activeMandiForecast.modalPrice.toLocaleString('en-IN')}
                </p>
                <span className="text-[11px] text-slate-400">per Quintal</span>
              </div>
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                <span className="text-xs text-emerald-700 font-medium">AI Recommendation</span>
                <p className="text-lg font-bold text-emerald-950 mt-0.5">
                  {activeMandiForecast.bestTime}
                </p>
                <span className="text-[11px] text-emerald-700">Trend: {activeMandiForecast.aiTrend.toUpperCase()}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Market Intelligence Rationale
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeMandiForecast.aiForecast}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedTrendCommodityId(activeMandiForecast.id);
                  setActiveMandiForecast(null);
                  setActiveSubView('all');
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LineChartIcon className="w-3.5 h-3.5" />
                <span>Inspect in Weekly Recharts Graph</span>
              </button>
              <button
                onClick={() => {
                  if (onSelectCropToSell) {
                    onSelectCropToSell(activeMandiForecast.commodity);
                  }
                  setActiveMandiForecast(null);
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
              >
                List {activeMandiForecast.commodity.split(' ')[0]} For Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

