
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MockDataService } from "@/services/mockData/MockDataService";
import { useState } from "react";
import { Loader2, Database } from "lucide-react";

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
          This will populate the database with sample content including website pages,
          innovations, challenges, and other data needed for testing the application.
          Existing data with the same identifiers will not be duplicated.
        </p>
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
              Generating...
            </>
          ) : (
            "Generate Mock Data"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
