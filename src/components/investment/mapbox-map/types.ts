
export interface InvestmentHotspot {
  city: string;
  country: string;
  amount: string;
  coordinates: [number, number];
  size: 'sm' | 'md' | 'lg';
}

export interface RegionDataItem {
  region: string;
  percentage: number;
  color: string;
}
