
import { useState, useCallback, useEffect } from 'react';
import { getMapboxToken, isValidMapboxToken } from '../config';
import { useToast } from '@/hooks/use-toast';

export function useTokenManager() {
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchAttempted, setFetchAttempted] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchToken = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // First try to get from localStorage
      const localToken = localStorage.getItem('mapbox_token');
      if (localToken && isValidMapboxToken(localToken)) {
        setMapboxToken(localToken);
        setTokenError(null);
        console.log("Using token from localStorage");
        return localToken;
      }
      
      // If not found locally, try to fetch from Supabase Edge Function
      console.log("Fetching token from Supabase Edge Function");
      const token = await getMapboxToken();
      
      if (token && isValidMapboxToken(token)) {
        localStorage.setItem('mapbox_token', token);
        setMapboxToken(token);
        setTokenError(null);
        return token;
      } else {
        setTokenError("No valid Mapbox public token available. Please provide a valid token that starts with 'pk.'");
        console.error("Invalid token format received:", token);
        return null;
      }
    } catch (error) {
      console.error("Error fetching Mapbox token:", error);
      setTokenError("Failed to fetch Mapbox token. Please try again later or provide your own token.");
      return null;
    } finally {
      setIsLoading(false);
      setFetchAttempted(true);
    }
  }, []);

  const updateToken = useCallback((token: string) => {
    if (isValidMapboxToken(token)) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
      setTokenError(null);
      
      toast({
        title: "Token updated",
        description: "Your Mapbox token has been updated successfully.",
        variant: "success",
      });
      
      return true;
    } else {
      setTokenError("Invalid Mapbox token format. Token must be a public token that starts with 'pk.'");
      
      toast({
        title: "Invalid token",
        description: "Please provide a valid Mapbox public token that starts with 'pk.'",
        variant: "destructive",
      });
      
      return false;
    }
  }, [toast]);

  // Initial fetch on mount
  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return { 
    mapboxToken, 
    tokenError, 
    isLoading,
    fetchAttempted,
    fetchToken, 
    updateToken 
  };
}
