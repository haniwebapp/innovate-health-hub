
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleDashed, CircleCheck, FileCheck, Shield, FileSearch, Landmark } from 'lucide-react';

interface RegulatoryFrameworkProps {
  id: string;
  title: string;
  icon: string; 
  description: string;
  completedSteps: number;
  totalSteps: number;
  steps: string[];
}

interface RegulatoryFrameworksProps {
  frameworks: RegulatoryFrameworkProps[];
  selectedFramework: string | null;
  onFrameworkSelect: (id: string) => void;
}

export function RegulatoryFrameworks({ 
  frameworks, 
  selectedFramework,
  onFrameworkSelect 
}: RegulatoryFrameworksProps) {
  // Map icon string to component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="h-5 w-5 text-moh-green" />;
      case 'FileSearch':
        return <FileSearch className="h-5 w-5 text-moh-green" />;
      case 'Landmark':
        return <Landmark className="h-5 w-5 text-moh-green" />;
      default:
        return <CircleDashed className="h-5 w-5 text-moh-green" />;
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {frameworks.map((framework) => (
        <Card 
          key={framework.id}
          className={`cursor-pointer transition-all ${
            selectedFramework === framework.id 
              ? "border-moh-green/70 shadow-md" 
              : "hover:border-moh-green/40"
          }`}
          onClick={() => onFrameworkSelect(framework.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-moh-green/10 p-2 rounded-full">
                {getIcon(framework.icon)}
              </div>
              <Badge variant="outline" className="text-xs">
                {framework.completedSteps}/{framework.totalSteps} steps
              </Badge>
            </div>
            <CardTitle className="text-lg">{framework.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4">{framework.description}</p>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-moh-green h-2 rounded-full" 
                style={{ width: `${(framework.completedSteps/framework.totalSteps) * 100}%` }}
              ></div>
            </div>
            
            {selectedFramework === framework.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-sm mb-2">Framework Steps:</h4>
                <ul className="space-y-2">
                  {framework.steps.map((step, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      {idx < framework.completedSteps ? (
                        <CircleCheck className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <CircleDashed className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      )}
                      <span className={idx < framework.completedSteps ? "text-gray-700" : "text-gray-500"}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full mt-4 bg-moh-darkGreen hover:bg-moh-darkGreen/90">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Apply Using Framework
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
