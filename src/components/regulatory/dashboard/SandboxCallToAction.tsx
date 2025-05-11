
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function SandboxCallToAction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-l-4 border-l-moh-green overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-moh-green/5 rounded-full -mr-10 -mt-10 z-0" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-moh-gold/5 rounded-full -ml-16 -mb-16 z-0" />
        <CardContent className="pt-6 pb-4 relative z-10">
          <div className="md:flex items-start justify-between">
            <div className="space-y-3 mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-moh-green" />
                <h2 className="text-xl font-medium">Apply for the Regulatory Sandbox</h2>
              </div>
              <p className="text-muted-foreground max-w-xl">
                Test your healthcare innovations in a controlled environment with reduced regulatory barriers.
                Get expert guidance and expedited approval pathways.
              </p>
              <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                <FileText className="h-4 w-4 text-moh-gold" />
                <span>Applications typically reviewed within 2 weeks</span>
              </div>
            </div>
            <Button asChild className="bg-moh-green hover:bg-moh-darkGreen transition-all shadow-sm hover:shadow-md">
              <Link to="/dashboard/regulatory/applications/new" className="flex items-center">
                Apply for Sandbox
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
