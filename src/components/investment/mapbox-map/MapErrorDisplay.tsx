
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { isValidMapboxToken } from './config';
import { useToast } from '@/hooks/use-toast';

interface MapErrorDisplayProps {
  errorMessage: string | null;
  onTokenSubmit: (token: string) => void;
}

export function MapErrorDisplay({ errorMessage, onTokenSubmit }: MapErrorDisplayProps) {
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
      <Alert variant="destructive" className="w-full max-w-sm border-red-300 bg-red-50">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Map Error</AlertTitle>
        <AlertDescription>
          {errorMessage || "An error occurred while loading the map."}
        </AlertDescription>
      </Alert>
      
      {isTokenError && (
        <form onSubmit={handleTokenSubmit} className="w-full max-w-sm flex flex-col gap-2 mt-2">
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
          <div className="text-xs text-center text-slate-500 mt-1">
            Get a token at <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-moh-green hover:underline">mapbox.com</a>
          </div>
        </form>
      )}
    </div>
  );
}
