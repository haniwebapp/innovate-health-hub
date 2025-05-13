
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { QuotationData } from "@/services/ai/quotation/QuotationAIService";

interface QuotationDetailsProps {
  data: QuotationData;
}

export function QuotationDetails({ data }: QuotationDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="mt-4 bg-moh-green/10 border-moh-green/20">
        <CardContent className="pt-4">
          <h4 className="text-sm font-medium flex items-center gap-1 mb-2 text-moh-darkGreen">
            <Info size={14} />
            Details
          </h4>
          
          <div className="space-y-2">
            {data.price && (
              <div className="flex justify-between items-center">
                <span className="text-sm">Estimated Cost:</span>
                <Badge variant="outline" className="bg-moh-green/5 text-moh-darkGreen">
                  ${data.price.toLocaleString()}
                </Badge>
              </div>
            )}
            
            {data.timeframe && (
              <div className="flex justify-between items-center">
                <span className="text-sm">Timeframe:</span>
                <span className="text-sm font-medium">{data.timeframe}</span>
              </div>
            )}
            
            {data.services && (
              <div>
                <span className="text-sm block mb-1">Services:</span>
                <div className="flex flex-wrap gap-1">
                  {data.services.map((service, i) => (
                    <Badge key={i} variant="outline" className="bg-moh-green/5">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {data.requirements && (
              <div>
                <span className="text-sm block mb-1">Requirements:</span>
                <div className="flex flex-wrap gap-1">
                  {data.requirements.map((req, i) => (
                    <Badge key={i} variant="outline" className="bg-moh-gold/10 text-moh-gold border-moh-gold/20">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
