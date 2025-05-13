
import React from "react";
import { motion } from "framer-motion";
import { QuotationResponse } from "@/services/ai/quotation/QuotationAIService";

interface RelatedResourcesDisplayProps {
  relatedResources: QuotationResponse['relatedResources'];
}

export function RelatedResourcesDisplay({ relatedResources }: RelatedResourcesDisplayProps) {
  if (!relatedResources || relatedResources.length === 0) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="mt-3 p-3 rounded-lg bg-moh-green/5 border border-moh-green/10"
    >
      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Related Resources:</h4>
      <div className="space-y-1">
        {relatedResources.map((resource, idx) => (
          <a
            key={idx}
            href={resource.url}
            className="text-xs flex items-center gap-1 text-moh-green hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="inline-block px-1.5 py-0.5 bg-moh-green/10 text-moh-green rounded text-[10px]">
              {resource.type}
            </span>
            {resource.title}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
