export type CropCategory = 'all' | 'cereals' | 'oilseeds' | 'pulses' | 'vegetables' | 'fruits' | 'spices';

export interface CropListing {
  id: string;
  cropName: string;
  hindiName: string;
  variety: string;
  category: CropCategory;
  quantityQuintals: number;
  pricePerQuintal: number;
  mandiBenchmarkPrice: number;
  negotiable: boolean;
  qualityGrade: 'Grade A+ (Premium)' | 'Grade A (Standard)' | 'Grade B';
  moisturePercent: number;
  organicCertified: boolean;
  harvestDate: string;
  farmerName: string;
  village: string;
  district: string;
  state: string;
  distanceKm: number;
  phone: string;
  imageUrl: string;
  verifiedKisan: boolean;
  minOrderQuintals: number;
  description: string;
}

export interface MandiPrice {
  id: string;
  commodity: string;
  hindiName: string;
  variety: string;
  mandiName: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number; // ₹/Quintal
  prevPrice: number;
  change: number; // ₹ change
  changePercent: number;
  arrivalsMetricTon: number;
  aiTrend: 'bullish' | 'bearish' | 'stable';
  aiForecast: string;
  bestTime: string;
  lastUpdated: string;
}

export interface DiseaseCase {
  id: string;
  crop: string;
  diseaseName: string;
  scientificName: string;
  hindiName: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Severe';
  symptoms: string[];
  organicTreatment: string;
  chemicalTreatment: string;
  preventiveMeasures: string;
  idealWeatherNote: string;
  sampleImage: string;
}

export interface ColdStorageItem {
  id: string;
  name: string;
  district: string;
  state: string;
  totalCapacityBags: number;
  availableCapacityBags: number;
  temperatureRange: string;
  ratePerBagMonth: number;
  distanceKm: number;
  cctvInspected: boolean;
  insuranceCovered: boolean;
  phone: string;
}

export interface AdvisoryMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  hindiText?: string;
  timestamp: string;
  suggestedActions?: string[];
}
