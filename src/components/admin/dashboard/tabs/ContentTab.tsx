
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export function ContentTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Content Management</CardTitle>
            <Button asChild>
              <Link to="/dashboard/admin/cms">
                <FileText className="mr-2 h-4 w-4" />
                Content Manager
              </Link>
            </Button>
          </div>
          <CardDescription>Manage website content and pages</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Pages", "Blog Posts", "Media Library", "Events"].map((item) => (
              <Card key={item} className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <FileText className="h-10 w-10 mx-auto text-moh-green/70 mb-2" />
                  <h3 className="font-medium">{item}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Manage {item.toLowerCase()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
