
import { AlertCircle, ArrowLeft, LockKeyhole, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface AccessDeniedProps {
  title?: string;
  description?: string;
  requiredRole?: string;
  backLink?: string;
  backText?: string;
}

export function AccessDenied({
  title = "Access Denied",
  description = "You don't have permission to view this page.",
  requiredRole = "Admin access required",
  backLink = "/dashboard",
  backText = "Back to Dashboard"
}: AccessDeniedProps) {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-b from-red-50 to-white border border-red-200 shadow-lg">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15
          }}
          className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
        >
          <ShieldAlert className="h-10 w-10 text-red-500" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-red-700 mb-2 text-center">
          {title}
        </h2>
        
        <p className="text-red-600 mb-4 text-center max-w-sm">
          {description}
        </p>
        
        <div className="flex flex-col items-center">
          <Badge className="mb-6 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 text-xs font-medium">
            <LockKeyhole className="w-3 h-3 mr-1" />
            {requiredRole}
          </Badge>
          
          <Button asChild variant="outline" className="group">
            <Link to={backLink}>
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {backText}
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
