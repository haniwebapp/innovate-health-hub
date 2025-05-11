
import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart3, Briefcase } from "lucide-react";

export function PortfolioActions() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="border-moh-green/30 text-moh-green hover:bg-moh-lightGreen">
        <BarChart3 className="h-4 w-4 mr-2" />
        Performance Report
      </Button>
      <Button className="bg-moh-green hover:bg-moh-darkGreen">
        <Briefcase className="h-4 w-4 mr-2" />
        Add Investment
      </Button>
    </div>
  );
}
