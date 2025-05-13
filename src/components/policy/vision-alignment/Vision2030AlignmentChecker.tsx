
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormContext } from 'react-hook-form';

export const Vision2030AlignmentChecker: React.FC = () => {
  const form = useFormContext();
  
  // Add safeguard to check if the component is used within a Form context
  if (!form) {
    console.error("Vision2030AlignmentChecker must be used within a Form context");
    return <div>Error: Form context not available</div>;
  }
  
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Analyze how well your healthcare policy aligns with Saudi Vision 2030 healthcare goals.
      </p>
      
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Policy Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter policy title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Policy Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter policy description or paste policy text" 
                className="min-h-[200px]"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Enter your policy text or a summary of the policy for analysis.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button type="button" className="bg-moh-green hover:bg-moh-darkGreen">
        Analyze Vision 2030 Alignment
      </Button>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Alignment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Submit your policy for analysis to see Vision 2030 alignment results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
