
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StrategyGapAnalyzer: React.FC = () => {
  const form = useFormContext();
  
  // Add safeguard to check if the component is used within a Form context
  if (!form) {
    console.error("StrategyGapAnalyzer must be used within a Form context");
    return <div>Error: Form context not available</div>;
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Analyze the gaps between current healthcare policy and strategic objectives.
      </p>
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Policy Text</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter policy text for gap analysis" 
                className="min-h-[200px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button type="button" className="bg-moh-green hover:bg-moh-darkGreen">
        Analyze Strategic Gaps
      </Button>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Gap Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Submit your policy for analysis to see strategic gap results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
