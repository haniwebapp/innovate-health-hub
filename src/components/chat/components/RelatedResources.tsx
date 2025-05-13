
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Resource } from "@/services/ai/quotation/QuotationAIService";

interface RelatedResourcesProps {
  resources: Resource[];
}

export function RelatedResources({ resources }: RelatedResourcesProps) {
  if (!resources || resources.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="mt-4 bg-gray-50 border-gray-200">
        <CardContent className="pt-4">
          <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
            <Search size={14} />
            Related Resources
          </h4>
          <ul className="space-y-2">
            {resources.map((resource, idx) => (
              <li key={idx} className="text-sm">
                <a 
                  href={resource.url} 
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
