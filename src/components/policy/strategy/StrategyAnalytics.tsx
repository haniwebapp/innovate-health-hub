
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StrategyAnalytics: React.FC = () => {
  const form = useFormContext();
  
  // Add safeguard to check if the component is used within a Form context
  if (!form) {
    console.error("StrategyAnalytics must be used within a Form context");
    return <div>Error: Form context not available</div>;
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Get detailed analytics on how your policy aligns with healthcare strategy.
      </p>
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Policy Text</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter policy text for analytics" 
                className="min-h-[200px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button type="button" className="bg-moh-green hover:bg-moh-darkGreen">
        Generate Analytics
      </Button>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Strategy Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Submit your policy for detailed strategy analytics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
