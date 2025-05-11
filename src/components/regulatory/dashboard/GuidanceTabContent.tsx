
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function GuidanceTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ministry Guidance</CardTitle>
        <CardDescription>
          Feedback and guidance from regulatory experts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            To expedite your testing approval, please ensure you've completed the data privacy impact assessment.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-moh-green/10 p-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-moh-green" />
              </div>
              <div>
                <h3 className="font-medium">Patient Safety Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  Updated guidance on patient safety requirements for medical software
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3 mr-1" />
                Download Guidance
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-moh-green/10 p-2 rounded-full">
                <Clock className="h-4 w-4 text-moh-green" />
              </div>
              <div>
                <h3 className="font-medium">Testing Timeline Expectations</h3>
                <p className="text-sm text-muted-foreground">
                  Updated information about sandbox testing periods and milestone requirements
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3 mr-1" />
                Download Guidance
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/dashboard/regulatory/guidance/schedule">
              Schedule Consultation with Regulatory Expert
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
