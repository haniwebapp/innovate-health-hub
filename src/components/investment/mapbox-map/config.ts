
import { InvestmentHotspot, RegionDataItem } from './types';

// Investment hotspot data
export const investmentHotspots: InvestmentHotspot[] = [
  { city: 'Riyadh', country: 'Saudi Arabia', amount: '$120M', coordinates: [46.738586, 24.774265], size: 'lg' },
  { city: 'Dubai', country: 'UAE', amount: '$75M', coordinates: [55.270783, 25.204849], size: 'md' },
  { city: 'London', country: 'UK', amount: '$50M', coordinates: [-0.127758, 51.507351], size: 'md' },
  { city: 'New York', country: 'USA', amount: '$85M', coordinates: [-74.005974, 40.712776], size: 'md' },
  { city: 'Singapore', country: 'Singapore', amount: '$45M', coordinates: [103.819836, 1.352083], size: 'sm' },
  { city: 'Tokyo', country: 'Japan', amount: '$30M', coordinates: [139.839478, 35.652832], size: 'sm' },
];

// Region data for the bar chart
export const regionData: RegionDataItem[] = [
  { region: 'Middle East', percentage: 45, color: '#00814A' },
  { region: 'North America', percentage: 25, color: '#C3A86B' },
  { region: 'Europe', percentage: 15, color: '#006B3E' },
  { region: 'Asia', percentage: 10, color: '#A38A56' },
  { region: 'Africa', percentage: 5, color: '#80C18E' },
];

// Mapbox token - in a real app, this should come from env variables
export const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbHUxbHRweWIwMHgxMmptaG5ycDN1MXVjIn0.AtBYM5P-XE9zLleaSTr8-Q';
