
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MockDataService } from "@/services/mockData/MockDataService";
import { useState } from "react";
import { Loader2, Database, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function MockDataGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMockData = async () => {
    try {
      setIsGenerating(true);
      await MockDataService.generateAllMockData();
    } catch (error) {
      console.error("Error in mock data generation:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Mock Data Generator
        </CardTitle>
        <CardDescription>
          Generate mock data for testing and development purposes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This will populate the platform with sample content including:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          <li>User profiles with different roles and organizations</li>
          <li>Innovations in various categories and stages</li>
          <li>Challenges with submissions and evaluations</li>
          <li>Funding rounds and investor profiles</li>
          <li>Regulatory frameworks, requirements, and sandbox applications</li>
          <li>Knowledge resources and learning materials</li>
          <li>Events, webinars, and workshops</li>
          <li>Activity timelines and user interactions</li>
          <li>Website pages and platform content</li>
        </ul>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            Existing data with the same identifiers will not be duplicated. This operation is for development environments only.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerateMockData}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Mock Data...
            </>
          ) : (
            "Generate Mock Data"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
