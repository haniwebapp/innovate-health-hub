
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="ltr">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-moh-green mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the page you're looking for. The page might have been removed, 
          renamed, or is temporarily unavailable.
        </p>
        <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
          <a href="/" className="flex items-center">
            <Home size={18} className="mr-2" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
