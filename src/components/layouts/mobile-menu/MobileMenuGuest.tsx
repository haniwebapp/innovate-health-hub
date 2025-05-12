
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MobileMenuGuestProps {
  handleLinkClick: (path: string) => void;
  itemVariants: any;
}

export function MobileMenuGuest({ handleLinkClick, itemVariants }: MobileMenuGuestProps) {
  return (
    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
      <Button 
        variant="outline" 
        className="w-full border-moh-green/20" 
        onClick={() => handleLinkClick("/auth/register")}
        asChild
      >
        <Link to="/auth/register">Register</Link>
      </Button>
      
      <Button 
        className="bg-moh-green hover:bg-moh-darkGreen w-full" 
        onClick={() => handleLinkClick("/auth/login")}
        asChild
      >
        <Link to="/auth/login">Login</Link>
      </Button>
    </motion.div>
  );
}
