
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface MarketplaceSidebarProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  ipStatusFilter: string;
  setIpStatusFilter: (status: string) => void;
  licensingFilter: string;
  setLicensingFilter: (status: string) => void;
  savedSearches: Array<{id: string; name: string}>;
}

export default function MarketplaceSidebar({
  categoryFilter,
  setCategoryFilter,
  ipStatusFilter,
  setIpStatusFilter,
  licensingFilter,
  setLicensingFilter,
  savedSearches
}: MarketplaceSidebarProps) {
  // Categories from your application
  const categories = ["all", "Digital Health", "Telehealth", "MedTech", "Healthcare IT", "Therapeutics"];
  
  // IP status options
  const ipStatuses = [
    { id: "all", label: "All Statuses" },
    { id: "patent_granted", label: "Patent Granted" },
    { id: "patent_pending", label: "Patent Pending" },
    { id: "patent_in_preparation", label: "Patent in Preparation" },
    { id: "trade_secret", label: "Trade Secret" },
    { id: "copyright", label: "Copyright Protected" },
    { id: "not_protected", label: "Not Protected" }
  ];
  
  // Licensing status options
  const licensingStatuses = [
    { id: "all", label: "All Options" },
    { id: "available", label: "Available for Licensing" },
    { id: "exclusive", label: "Exclusive Available" },
    { id: "non_exclusive", label: "Non-exclusive Available" },
    { id: "negotiating", label: "In Negotiations" },
    { id: "licensed", label: "Already Licensed" }
  ];
  
  // Development stage options
  const developmentStages = [
    { id: "all", label: "All Stages" },
    { id: "concept", label: "Concept" },
    { id: "prototype", label: "Prototype" },
    { id: "validated", label: "Validated" },
    { id: "commercial", label: "Commercial" }
  ];
  
  return (
    <aside className="space-y-6">
      {/* Saved searches */}
      {savedSearches.length > 0 && (
        <div className="bg-moh-lightGreen/30 rounded-lg p-4 border border-moh-green/20">
          <h3 className="font-medium text-moh-darkGreen flex items-center mb-3">
            <Bookmark size={16} className="mr-2" /> Saved Searches
          </h3>
          <ul className="space-y-2">
            {savedSearches.map(search => (
              <li key={search.id}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-sm font-normal text-moh-darkGreen hover:bg-moh-lightGreen/50"
                >
                  {search.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Main filters */}
      <Accordion type="multiple" defaultValue={["categories", "ip-status", "licensing"]}>
        {/* Categories */}
        <AccordionItem value="categories" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 rounded-t-lg">Categories</AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <RadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2 py-1.5">
                  <RadioGroupItem value={category} id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`} className="capitalize">
                    {category === "all" ? "All Categories" : category}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        
        {/* IP Status */}
        <AccordionItem value="ip-status" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 rounded-t-lg">IP Status</AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <RadioGroup value={ipStatusFilter} onValueChange={setIpStatusFilter}>
              {ipStatuses.map((status) => (
                <div key={status.id} className="flex items-center space-x-2 py-1.5">
                  <RadioGroupItem value={status.id} id={`ip-${status.id}`} />
                  <Label htmlFor={`ip-${status.id}`}>{status.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        
        {/* Licensing Status */}
        <AccordionItem value="licensing" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 rounded-t-lg">Licensing Options</AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <RadioGroup value={licensingFilter} onValueChange={setLicensingFilter}>
              {licensingStatuses.map((status) => (
                <div key={status.id} className="flex items-center space-x-2 py-1.5">
                  <RadioGroupItem value={status.id} id={`license-${status.id}`} />
                  <Label htmlFor={`license-${status.id}`}>{status.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        
        {/* Development Stage */}
        <AccordionItem value="development" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 rounded-t-lg">Development Stage</AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <RadioGroup value="all">
              {developmentStages.map((stage) => (
                <div key={stage.id} className="flex items-center space-x-2 py-1.5">
                  <RadioGroupItem value={stage.id} id={`stage-${stage.id}`} />
                  <Label htmlFor={`stage-${stage.id}`}>{stage.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Clear all filters */}
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full mt-2"
        onClick={() => {
          setCategoryFilter("all");
          setIpStatusFilter("all");
          setLicensingFilter("all");
        }}
      >
        Clear all filters
      </Button>
    </aside>
  );
}
