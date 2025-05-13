
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AIServiceType } from '@/services/ai/AIServiceRegistry';
import { initializeAIServices, checkAIServicesAvailability, getAIService } from '@/services/ai/initializeAI';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AIMessage } from '@/types/chatTypes';

interface AIContextType {
  isInitialized: boolean;
  serviceStatus: Record<AIServiceType, boolean>;
  sendMessage: (message: string, context?: string) => Promise<string>;
  generateImage: (prompt: string) => Promise<string | null>;
  isProcessing: boolean;
  error: string | null;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<Record<AIServiceType, boolean>>({} as Record<AIServiceType, boolean>);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Initialize AI services
  useEffect(() => {
    async function initialize() {
      try {
        initializeAIServices();
        const status = await checkAIServicesAvailability();
        setServiceStatus(status);
        setIsInitialized(true);
      } catch (err: any) {
        console.error('Failed to initialize AI services:', err);
        setError(err.message || 'Failed to initialize AI services');
      }
    }
    
    initialize();
  }, []);
  
  const sendMessage = async (message: string, context: string = 'general'): Promise<string> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const messages: AIMessage[] = [
        { role: 'user', content: message }
      ];
      
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          messages,
          context
        }
      });
      
      if (error) throw new Error(error.message);
      
      return data.message || '';
    } catch (err: any) {
      console.error('Error sending message to AI:', err);
      setError(err.message || 'Failed to get response from AI');
      toast({
        title: 'AI Error',
        description: err.message || 'Failed to get response from AI',
        variant: 'destructive'
      });
      return '';
    } finally {
      setIsProcessing(false);
    }
  };
  
  const generateImage = async (prompt: string): Promise<string | null> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('image-generator', {
        body: {
          prompt
        }
      });
      
      if (error) throw new Error(error.message);
      
      return data.imageUrl || null;
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.message || 'Failed to generate image');
      toast({
        title: 'Image Generation Error',
        description: err.message || 'Failed to generate image',
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <AIContext.Provider
      value={{
        isInitialized,
        serviceStatus,
        sendMessage,
        generateImage,
        isProcessing,
        error
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
