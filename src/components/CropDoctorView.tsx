import React, { useState } from 'react';
import { DiseaseCase } from '../types';
import { CROP_DISEASES } from '../data/mockData';
import { Sparkles, Upload, AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw, Leaf, Droplets, ThermometerSun, FileText } from 'lucide-react';

interface CropDoctorViewProps {
  language: 'en' | 'hi';
}

export const CropDoctorView: React.FC<CropDoctorViewProps> = ({ language }) => {
  const isHi = language === 'hi';
  const [activeCase, setActiveCase] = useState<DiseaseCase>(CROP_DISEASES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  const handleSelectCase = (disease: DiseaseCase) => {
    setIsScanning(true);
    setCustomPhotoUrl(null);
    setTimeout(() => {
      setActiveCase(disease);
      setIsScanning(false);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
      setIsScanning(true);
      setTimeout(() => {
        // Match with Tomato Early Blight as the general diagnostic
        setActiveCase(CROP_DISEASES[0]);
        setIsScanning(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Computer Vision · Fasal Rog Nidan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            {isHi ? 'AI फसल रोग विशेषज्ञ डॉक्टर' : 'AI Crop Health & Disease Diagnostic'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isHi
              ? 'फसल की पत्ती या पौधे की तस्वीर अपलोड करें और तुरंत 95%+ सटीकता से रोग पहचान व उपचार पाएं'
              : 'Upload or capture a photo of infected crop foliage to receive clinical diagnosis, organic remedies, and chemical dosages.'}
          </p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs cursor-pointer transition-colors whitespace-nowrap">
          <Upload className="w-4 h-4" />
          <span>{isHi ? 'पत्ती की फोटो अपलोड करें' : 'Upload Leaf Photo'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Preset Test Leaf Selection */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          {isHi ? 'या परीक्षण हेतु नमूना फसल चुनें:' : 'Or Select Sample Crop Leaf To Diagnose:'}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CROP_DISEASES.map((dis) => {
            const isSelected = activeCase.id === dis.id && !customPhotoUrl;
            return (
              <button
                key={dis.id}
                onClick={() => handleSelectCase(dis)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {dis.crop}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {dis.diseaseName.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Diagnostic Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Photo with Scanning Animation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-xl overflow-hidden relative shadow-md aspect-4/3 flex items-center justify-center">
            <img
              src={customPhotoUrl || activeCase.sampleImage}
              alt="Crop leaf sample"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Laser Scanning Line Animation */}
            {isScanning && (
              <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex flex-col justify-between p-4">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
                  <span className="animate-pulse">SCANNING FOLIAGE SPECTRA...</span>
                  <span>AI VISION MODEL</span>
                </div>
                {/* Sweep line */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-bounce" />
                <div className="text-center text-xs font-semibold text-white">
                  Extracting chlorophyll & lesion geometry...
                </div>
              </div>
            )}

            {/* Live Camera Reticle Overlay */}
            <div className="absolute inset-4 pointer-events-none border border-emerald-400/30 rounded-lg flex flex-col justify-between p-2">
              <div className="flex justify-between text-[10px] font-mono text-emerald-400">
                <span>[CAM-01_LEAF_GRID]</span>
                <span>FOV: 84°</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-emerald-400">
                <span>CONFIDENCE: {activeCase.confidence}%</span>
                <span>STATUS: ANALYZED</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Confidence Score</span>
              <span className="text-xl font-bold font-mono tabular-nums text-emerald-700">
                {activeCase.confidence}%
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">Severity Level</span>
              <span
                className={`text-sm font-bold uppercase mt-1 inline-block ${
                  activeCase.severity === 'Severe'
                    ? 'text-rose-600'
                    : activeCase.severity === 'High'
                    ? 'text-amber-600'
                    : 'text-emerald-700'
                }`}
              >
                {activeCase.severity} Threat
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Clinical Diagnostic & Prescription */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          {/* Diagnostic Header */}
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Diagnosed Pathogen Detected</span>
              <span aria-hidden="true">·</span>
              <span>{activeCase.crop}</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900 leading-tight">
              {activeCase.diseaseName}
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1">
              Scientific Name: <span className="italic">{activeCase.scientificName}</span>
              {' · '}
              <span className="font-semibold text-slate-700">हिन्दी: {activeCase.hindiName}</span>
            </p>
          </div>

          {/* Clinical Symptoms */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Key Diagnostic Symptoms
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              {activeCase.symptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment Prescriptions: Dual Organic vs Chemical */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organic Remedy */}
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1.5">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <span>जैविक उपचार (Organic Remedy)</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {activeCase.organicTreatment}
              </p>
            </div>

            {/* Chemical Treatment */}
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1.5">
                <Droplets className="w-4 h-4 text-amber-700" />
                <span>रासायनिक उपचार (Chemical Dose)</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                {activeCase.chemicalTreatment}
              </p>
            </div>
          </div>

          {/* Prevention & Weather Alert */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div>
              <span className="font-bold text-slate-700">Preventive Agronomy: </span>
              <span className="text-slate-600">{activeCase.preventiveMeasures}</span>
            </div>
            <div className="flex items-start gap-1.5 text-slate-600 pt-1 border-t border-slate-200">
              <ThermometerSun className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Weather Factor:</strong> {activeCase.idealWeatherNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
