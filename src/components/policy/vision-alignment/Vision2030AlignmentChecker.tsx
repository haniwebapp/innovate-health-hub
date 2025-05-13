
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle } from 'lucide-react';

export const Vision2030AlignmentChecker: React.FC = () => {
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleCheck = () => {
    if (!description || !sector) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };
  
  return (
    <Card className="border-2 border-muted bg-card">
      <CardContent className="pt-6">
        {!showResults ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="sector" className="block text-sm font-medium">Healthcare Sector</label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger id="sector">
                  <SelectValue placeholder="Select healthcare sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital-health">Digital Health</SelectItem>
                  <SelectItem value="medical-devices">Medical Devices</SelectItem>
                  <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                  <SelectItem value="primary-care">Primary Care</SelectItem>
                  <SelectItem value="specialized-care">Specialized Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">Initiative Description</label>
              <Textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe your healthcare initiative or innovation"
                rows={4}
              />
            </div>
            
            <Button 
              className="w-full bg-moh-green hover:bg-moh-darkGreen"
              onClick={handleCheck}
              disabled={isLoading || !description || !sector}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : "Check Alignment"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-md p-4 flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">Strong alignment with Vision 2030</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your initiative aligns with 4 of 5 key healthcare objectives in Vision 2030.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Alignment Highlights:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-moh-green rounded-full mr-2 mt-1.5"></div>
                  <span>Supports the goal of increasing private sector participation in healthcare</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-moh-green rounded-full mr-2 mt-1.5"></div>
                  <span>Contributes to improving access to healthcare services</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-moh-green rounded-full mr-2 mt-1.5"></div>
                  <span>Leverages digital transformation to enhance healthcare delivery</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-moh-green rounded-full mr-2 mt-1.5"></div>
                  <span>Focuses on preventive care measures, a key Vision 2030 priority</span>
                </li>
              </ul>
            </div>
            
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => setShowResults(false)}
            >
              Check Another Initiative
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
