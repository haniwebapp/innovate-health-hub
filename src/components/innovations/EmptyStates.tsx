
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, PlusCircle, Rocket, FileText, AlertCircle } from "lucide-react";

export function NoInnovationsYet() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lightbulb className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">No Innovations Yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        You haven't submitted any innovations yet. Start your innovation journey by sharing your healthcare solution.
      </p>
      <Button className="bg-moh-green hover:bg-moh-darkGreen" asChild>
        <Link to="/innovations/submit">
          <PlusCircle className="mr-2 h-4 w-4" />
          Submit Your Innovation
        </Link>
      </Button>
    </div>
  );
}

export function InReviewState() {
  return (
    <div className="text-center py-12 bg-moh-lightGreen/20 rounded-lg border border-moh-green/20 p-6">
      <div className="w-20 h-20 bg-moh-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
        <Rocket className="h-10 w-10 text-moh-green" />
      </div>
      <h3 className="text-xl font-medium mb-2">Innovation Under Review</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Your innovation is currently being reviewed by our team. You'll receive a notification once the review is complete.
      </p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" asChild>
          <Link to="/dashboard/innovations">
            <FileText className="mr-2 h-4 w-4" />
            View All Innovations
          </Link>
        </Button>
        <Button variant="outline" asChild className="border-moh-green text-moh-green hover:bg-moh-lightGreen">
          <Link to="/dashboard/support">
            <AlertCircle className="mr-2 h-4 w-4" />
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function InnovationDraftState() {
  return (
    <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-200 p-6">
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="h-10 w-10 text-amber-600" />
      </div>
      <h3 className="text-xl font-medium mb-2">Innovation Draft Saved</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        You have an innovation draft that needs to be completed. Continue where you left off.
      </p>
      <Button className="bg-amber-600 hover:bg-amber-700" asChild>
        <Link to="/innovations/submit/details">
          Continue Draft
        </Link>
      </Button>
    </div>
  );
}
