
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
      setTokenError(null);
      
      // First try to get from localStorage
      const localToken = localStorage.getItem('mapbox_token');
      if (localToken && isValidMapboxToken(localToken)) {
        setMapboxToken(localToken);
        console.log("Using token from localStorage");
        return localToken;
      }
      
      // If not found locally, try to fetch from Supabase Edge Function
      console.log("Fetching token from Supabase Edge Function");
      const token = await getMapboxToken();
      
      if (token && isValidMapboxToken(token)) {
        localStorage.setItem('mapbox_token', token);
        setMapboxToken(token);
        return token;
      } else {
        const errorMsg = "No valid Mapbox public token available. Please provide a valid token that starts with 'pk.'";
        setTokenError(errorMsg);
        console.error("Invalid token format received:", token);
        
        // Show toast for better user feedback
        toast({
          title: "Mapbox Token Error",
          description: "Could not retrieve a valid Mapbox token. Please enter a valid token below.",
          variant: "destructive",
        });
        
        return null;
      }
    } catch (error) {
      console.error("Error fetching Mapbox token:", error);
      const errorMsg = "Failed to fetch Mapbox token. Please try again later or provide your own token.";
      setTokenError(errorMsg);
      
      // Show toast for better user feedback
      toast({
        title: "Mapbox Token Error",
        description: "Connection error when retrieving token. Please check your network or enter a token manually.",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsLoading(false);
      setFetchAttempted(true);
    }
  }, [toast]);

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
