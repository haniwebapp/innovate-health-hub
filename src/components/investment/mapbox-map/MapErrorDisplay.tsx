
import React, { useState } from 'react';
import { AlertTriangle, Loader2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { isValidMapboxToken } from './config';
import { useToast } from '@/hooks/use-toast';

interface MapErrorDisplayProps {
  errorMessage: string | null;
  onTokenSubmit: (token: string) => void;
  isLoading?: boolean;
}

export function MapErrorDisplay({ errorMessage, onTokenSubmit, isLoading = false }: MapErrorDisplayProps) {
  const [tokenInput, setTokenInput] = useState('');
  const { toast } = useToast();

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = tokenInput.trim();
    
    if (isValidMapboxToken(token)) {
      onTokenSubmit(token);
      setTokenInput('');
    } else {
      toast({
        title: "Invalid token",
        description: "Please provide a valid Mapbox public token that starts with 'pk.'",
        variant: "destructive",
      });
    }
  };

  const isTokenError = errorMessage?.toLowerCase().includes('token') || 
                       errorMessage?.toLowerCase().includes('access');

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100 rounded-lg p-4 animate-in fade-in-0 duration-300">
      {isLoading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-moh-green animate-spin" />
          <p className="text-sm text-moh-darkGreen">Loading Mapbox token...</p>
        </div>
      ) : (
        <>
          <Alert variant="destructive" className="w-full max-w-sm border-red-300 bg-red-50">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-red-800">Map Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {errorMessage || "An error occurred while loading the map."}
            </AlertDescription>
          </Alert>
          
          {isTokenError && (
            <form onSubmit={handleTokenSubmit} className="w-full max-w-sm flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-10 w-10 text-moh-green opacity-70" />
              </div>
              <p className="text-sm text-center text-muted-foreground mb-2">
                A valid Mapbox token is required to display geographic data. 
                Please enter your Mapbox public token below.
              </p>
              <Input
                type="text"
                placeholder="Enter your Mapbox public token (pk.)"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="text-sm"
                autoFocus
              />
              <Button 
                type="submit" 
                size="sm" 
                className="w-full bg-moh-green hover:bg-moh-green/90"
              >
                Update Token
              </Button>
              <div className="text-xs text-center text-slate-500 mt-2">
                <p>Get a free token at <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-moh-green hover:underline">mapbox.com</a></p>
                <p className="mt-1">Your token will be securely stored in your browser.</p>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
