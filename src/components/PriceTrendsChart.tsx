import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { COMMODITY_TRENDS, CommodityTrendData } from '../data/priceTrendsData';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Layers,
} from 'lucide-react';

interface PriceTrendsChartProps {
  language: 'en' | 'hi';
  initialCommodityId?: string;
  onSellCommodity?: (commodity: string) => void;
}

export const PriceTrendsChart: React.FC<PriceTrendsChartProps> = ({
  language,
  initialCommodityId = 'mp-1',
  onSellCommodity,
}) => {
  const isHi = language === 'hi';
  const [selectedId, setSelectedId] = useState<string>(initialCommodityId);
  const [chartView, setChartView] = useState<'area' | 'arrivals'>('area');

  const commodityList = Object.values(COMMODITY_TRENDS);
  const currentData: CommodityTrendData = COMMODITY_TRENDS[selectedId] || commodityList[0];

  const weeklyChange = currentData.currentPrice - currentData.weekStartPrice;
  const weeklyChangePercent = ((weeklyChange / currentData.weekStartPrice) * 100).toFixed(1);
  const isBullish = weeklyChange >= 0;
  const mspSpread = currentData.currentPrice - currentData.mspBenchmark;

  // Signal styling and text
  const signalMeta = {
    SELL_NOW: {
      bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
      badgeBg: 'bg-emerald-700 text-white',
      label: isHi ? '🟢 बेचने का उत्तम समय (Sell Now)' : '🟢 Strong Sell Window (Sell Now)',
      actionText: isHi ? 'तुरंत बेचें' : 'Sell This Lot Now',
      color: '#059669',
    },
    HOLD: {
      bg: 'bg-amber-50 border-amber-300 text-amber-950',
      badgeBg: 'bg-amber-600 text-white',
      label: isHi ? '🟡 रोक कर रखें (Hold Stock)' : '🟡 Hold Stock (Prices Rising)',
      actionText: isHi ? 'भाव बढ़ने की प्रतीक्षा करें' : 'Hold For Target Rate',
      color: '#d97706',
    },
    GRADUAL_SELL: {
      bg: 'bg-blue-50 border-blue-300 text-blue-950',
      badgeBg: 'bg-blue-700 text-white',
      label: isHi ? '🔵 किस्तों में बेचें (Gradual Sale)' : '🔵 Staggered Sale (Liquidate 50%)',
      actionText: isHi ? '50% अभी बेचें' : 'Liquidate 50% Lot',
      color: '#2563eb',
    },
  }[currentData.decisionSignal];

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 font-bold text-slate-800">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {dataPoint.day} ({dataPoint.date})
            </span>
            {dataPoint.isForecast && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                AI Forecast
              </span>
            )}
          </div>
          <div className="flex justify-between items-baseline pt-0.5">
            <span className="text-slate-500">{isHi ? 'मॉडल भाव' : 'Modal Price'}:</span>
            <span className="font-mono tabular-nums font-extrabold text-sm text-slate-900">
              ₹{dataPoint.price.toLocaleString('en-IN')}{' '}
              <span className="text-[10px] font-normal text-slate-400">/ Qtl</span>
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-500 text-[11px]">
            <span>{isHi ? 'दैनिक दायरा' : 'Day Range'}:</span>
            <span className="font-mono tabular-nums font-semibold text-slate-700">
              ₹{dataPoint.minPrice} - ₹{dataPoint.maxPrice}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-500 text-[11px]">
            <span>{isHi ? 'मंडी आवक' : 'Mandi Arrivals'}:</span>
            <span className="font-mono tabular-nums font-semibold text-slate-700">
              {dataPoint.arrivals} MT
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-6 p-4 sm:p-6 transition-all">
      {/* Header & Commodity Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Recharts Weekly Price Fluctuations · Kisan Timing Advisor</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            {isHi ? 'साप्ताहिक भाव उतार-चढ़ाव एवं निर्णय विश्लेषक' : 'Weekly Price Trends & Sell/Hold Advisor'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isHi
              ? 'फसल बेचने का सही समय तय करने के लिए 7 दिनों का मूल्य रुझान और कृत्रिम बुद्धिमत्ता (AI) भविष्यवाणी'
              : 'Interactive 7-day fluctuation charts, MSP benchmarks, and AI harvest liquidation signals to maximize farm profit.'}
          </p>
        </div>

        {/* Chart View Toggle Controls */}
        <div className="flex items-center gap-1.5 self-start lg:self-auto bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setChartView('area')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              chartView === 'area'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isHi ? 'मूल्य रुझान' : 'Price Curve'}</span>
          </button>
          <button
            onClick={() => setChartView('arrivals')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              chartView === 'arrivals'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>{isHi ? 'मूल्य + आवक (MT)' : 'Price vs Arrivals'}</span>
          </button>
        </div>
      </div>

      {/* Commodity Quick Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {commodityList.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{isHi ? item.hindiName : item.commodity}</span>
              <span
                className={`font-mono text-[11px] ${
                  isSelected ? 'text-emerald-300' : 'text-slate-500'
                }`}
              >
                ₹{item.currentPrice.toLocaleString('en-IN')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Decision Advisor Callout Card */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${signalMeta.bg} transition-all`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${signalMeta.badgeBg}`}>
                {signalMeta.label}
              </span>
              <span className="text-xs font-medium text-slate-600">
                Confidence: <strong className="font-mono text-slate-900">{currentData.confidence}%</strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Target Window: <strong className="text-slate-900">{currentData.bestDayToSell}</strong>
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {isHi ? currentData.hindiDecisionRationale : currentData.decisionRationale}
            </p>
          </div>

          {/* Action Button */}
          {onSellCommodity && (
            <button
              onClick={() => onSellCommodity(currentData.commodity)}
              className="shrink-0 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>{signalMeta.actionText}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          )}
        </div>
      </div>

      {/* 4 Key Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
            {isHi ? 'वर्तमान भाव (मंडी)' : 'Current Modal Price'}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-black font-mono tabular-nums text-slate-900">
              ₹{currentData.currentPrice.toLocaleString('en-IN')}
            </span>
            <span
              className={`text-xs font-mono font-bold flex items-center ${
                isBullish ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              {isBullish ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {isBullish ? '+' : ''}
              {weeklyChangePercent}%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {currentData.mandi}
          </span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
            {isHi ? 'साप्ताहिक न्यूनतम - अधिकतम' : '7-Day Price Range'}
          </span>
          <div className="text-base sm:text-lg font-bold font-mono tabular-nums text-slate-800 mt-1">
            ₹{currentData.weeklyMin} – ₹{currentData.weeklyMax}
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Spread: ₹{currentData.weeklyMax - currentData.weeklyMin} / Quintal
          </span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
            {isHi ? 'सरकारी एमएसपी तुलना' : 'Govt. MSP Benchmark'}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-base sm:text-lg font-bold font-mono tabular-nums text-slate-900">
              ₹{currentData.mspBenchmark.toLocaleString('en-IN')}
            </span>
            <span
              className={`text-xs font-mono font-bold ${
                mspSpread >= 0 ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              ({mspSpread >= 0 ? '+' : ''}₹{mspSpread})
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {mspSpread >= 0 ? 'Trading above MSP' : 'Under MSP pressure'}
          </span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
            {isHi ? 'दैनिक मंडी आवक' : 'Daily Arrivals (MT)'}
          </span>
          <div className="text-base sm:text-lg font-bold font-mono tabular-nums text-slate-900 mt-1">
            {currentData.weeklyHistory[currentData.weeklyHistory.length - 3]?.arrivals || 450} MT
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Physical mandi volume
          </span>
        </div>
      </div>

      {/* Main Recharts Visualizer Canvas */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-inner relative overflow-hidden">
        {/* Subtle graph header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">
              {currentData.commodity} ({currentData.variety}) — 7-Day Curve & 3-Day AI Forecast
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-emerald-400 rounded-full inline-block" />
              <span>Modal Rate (₹/Qtl)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-amber-400 rounded-full inline-block border border-dashed" />
              <span>MSP Floor</span>
            </div>
            {chartView === 'arrivals' && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-blue-500/70 rounded-xs inline-block" />
                <span>Arrivals (MT)</span>
              </div>
            )}
          </div>
        </div>

        {/* Recharts Responsive Container */}
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={currentData.weeklyHistory}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="arrivalsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />

              <XAxis
                dataKey="day"
                stroke="#94a3b8"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickLine={false}
                axisLine={{ stroke: '#475569' }}
              />

              {/* Primary Y-Axis: Price (₹/Quintal) */}
              <YAxis
                yAxisId="priceAxis"
                domain={['dataMin - 100', 'dataMax + 100']}
                stroke="#94a3b8"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickFormatter={(val) => `₹${val}`}
                tickLine={false}
                axisLine={false}
              />

              {/* Secondary Y-Axis for Arrivals when in arrivals view mode */}
              {chartView === 'arrivals' && (
                <YAxis
                  yAxisId="arrivalsAxis"
                  orientation="right"
                  domain={[0, 'dataMax + 200']}
                  stroke="#60a5fa"
                  tick={{ fontSize: 11, fill: '#60a5fa' }}
                  tickFormatter={(val) => `${val} MT`}
                  tickLine={false}
                  axisLine={false}
                />
              )}

              <Tooltip content={<CustomTooltip />} />

              {/* Govt MSP Reference Line */}
              <ReferenceLine
                yAxisId="priceAxis"
                y={currentData.mspBenchmark}
                stroke="#fbbf24"
                strokeDasharray="4 4"
                label={{
                  value: `MSP: ₹${currentData.mspBenchmark}`,
                  position: 'insideBottomRight',
                  fill: '#fbbf24',
                  fontSize: 10,
                  fontWeight: 600,
                }}
              />

              {/* Arrivals Bars (Optional Mode) */}
              {chartView === 'arrivals' && (
                <Bar
                  yAxisId="arrivalsAxis"
                  dataKey="arrivals"
                  name="Arrivals (MT)"
                  fill="url(#arrivalsGradient)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              )}

              {/* Smooth Area for Modal Price */}
              <Area
                yAxisId="priceAxis"
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#priceGradient)"
                activeDot={{ r: 6, fill: '#34d399', stroke: '#064e3b', strokeWidth: 2 }}
              />

              {/* Min-Max Daily Band (Dashed Line) */}
              <Line
                yAxisId="priceAxis"
                type="monotone"
                dataKey="maxPrice"
                stroke="#6ee7b7"
                strokeDasharray="2 2"
                strokeWidth={1}
                dot={false}
              />
              <Line
                yAxisId="priceAxis"
                type="monotone"
                dataKey="minPrice"
                stroke="#047857"
                strokeDasharray="2 2"
                strokeWidth={1}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Forecast Notice */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-semibold">● Solid line:</span> Verified Mandi Rates
            <span className="text-slate-600">|</span>
            <span className="text-emerald-300 font-semibold">★ Tue/Thu (AI):</span> Predictive Forecast Range
          </div>
          <div className="text-slate-400">
            Source: Agmarknet APMC Daily Feeds & AI Regression Models
          </div>
        </div>
      </div>
    </div>
  );
};
