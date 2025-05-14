
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

// Get token from localStorage or use the Supabase function
export const getMapboxToken = async (): Promise<string | null> => {
  try {
    // First try to get from localStorage if available
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      return storedToken;
    }
    
    // If not available, fetch from our Supabase Edge Function
    const response = await fetch('https://ntgrokpnwizohtfkcfec.supabase.co/functions/v1/mapbox-token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch Mapbox token:', errorData);
      return null;
    }

    const data = await response.json();
    
    if (data.token) {
      // Store it for future use
      localStorage.setItem('mapbox_token', data.token);
      return data.token;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Mapbox token:', error);
    return null;
  }
};

// Check if the token is valid (starts with pk. for public tokens or sk. for secret tokens)
export const isValidMapboxToken = (token: string): boolean => {
  return !!token && (token.startsWith('pk.') || token.startsWith('sk.'));
};
