
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function SandboxCallToAction() {
  return (
    <Card className="border-l-4 border-l-moh-green">
      <CardContent className="pt-6 pb-4">
        <div className="md:flex items-start justify-between">
          <div className="space-y-2 mb-4 md:mb-0">
            <h2 className="text-xl font-medium">Apply for the Regulatory Sandbox</h2>
            <p className="text-muted-foreground max-w-xl">
              Test your healthcare innovations in a controlled environment with reduced regulatory barriers.
              Submit your application to get started.
            </p>
          </div>
          <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
            <Link to="/dashboard/regulatory/applications/new" className="flex items-center">
              Apply for Sandbox
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
