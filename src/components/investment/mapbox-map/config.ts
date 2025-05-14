
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

// Try to get token from localStorage first if available
const getMapboxToken = (): string => {
  const storedToken = localStorage.getItem('mapbox_token');
  if (storedToken) {
    return storedToken;
  }
  
  // The token provided by the user (we'll use this as default if available)
  const userToken = "sk.eyJ1IjoiaGFuaWFrcmltIiwiYSI6ImNtYW50ajVuNzAycnMyanF6ZHV6OG4zYzYifQ.xxtzPRhCkcAoDNLppIMAYw";
  
  // Store it for future use
  if (userToken) {
    localStorage.setItem('mapbox_token', userToken);
  }
  
  return userToken;
};

// Mapbox token
export const MAPBOX_TOKEN = getMapboxToken();

// Check if the token is valid (starts with pk. for public tokens or sk. for secret tokens)
export const isValidMapboxToken = (token: string): boolean => {
  return !!token && (token.startsWith('pk.') || token.startsWith('sk.'));
};
