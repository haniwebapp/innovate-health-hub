
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, CheckCircle, Clock, AlertTriangle, Calendar, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function GuidanceTabContent() {
  const [downloadedGuidance, setDownloadedGuidance] = useState<string[]>([]);

  const handleDownload = (id: string) => {
    setDownloadedGuidance((prev) => [...prev, id]);
    // In a real implementation, this would trigger an actual download
    // and potentially log analytics data
  };

  const guidanceDocuments = [
    {
      id: "patient-safety",
      title: "Patient Safety Requirements",
      description: "Updated guidance on patient safety requirements for medical software",
      icon: CheckCircle,
      iconColor: "text-moh-green",
      date: "Updated May 10, 2025",
      tags: ["Medical Software", "Patient Safety"]
    },
    {
      id: "testing-timeline",
      title: "Testing Timeline Expectations",
      description: "Updated information about sandbox testing periods and milestone requirements",
      icon: Clock,
      iconColor: "text-moh-gold",
      date: "Updated April 28, 2025",
      tags: ["Timeline", "Milestones"]
    },
    {
      id: "data-protection",
      title: "Data Protection Standards",
      description: "Comprehensive guide to ensuring patient data protection in healthcare innovations",
      icon: FileText,
      iconColor: "text-blue-500",
      date: "Updated May 5, 2025",
      tags: ["Data Protection", "Compliance"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Ministry Guidance</CardTitle>
          <CardDescription>
            Feedback and guidance from regulatory experts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 border-moh-green/20 bg-moh-green/5">
            <AlertTriangle className="h-4 w-4 text-moh-green" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              To expedite your testing approval, please ensure you've completed the data privacy impact assessment.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            {guidanceDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-md p-4 hover:border-moh-green/30 hover:bg-moh-green/5 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`bg-moh-green/10 p-2 rounded-full`}>
                    <doc.icon className={`h-4 w-4 ${doc.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{doc.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs bg-moh-green/5 border-moh-green/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(doc.id)}
                    className={downloadedGuidance.includes(doc.id) ? "bg-moh-green/10 border-moh-green/30" : ""}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    {downloadedGuidance.includes(doc.id) ? "Downloaded" : "Download Guidance"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2 text-moh-gold" />
                <span>Schedule a consultation with our regulatory experts</span>
              </div>
              <Button variant="outline" asChild className="w-full sm:w-auto border-moh-green/30 text-moh-green hover:bg-moh-green/10">
                <Link to="/dashboard/regulatory/guidance/schedule">
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
