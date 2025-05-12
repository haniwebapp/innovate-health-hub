
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuUserProps {
  handleLinkClick: (path: string) => void;
  itemVariants: any;
}

export function MobileMenuUser({ handleLinkClick, itemVariants }: MobileMenuUserProps) {
  const { user, signOut } = useAuth();
  
  if (!user) return null;
  
  return (
    <motion.div variants={itemVariants}>
      <div className="bg-moh-lightGreen/30 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-moh-green/20 flex items-center justify-center text-moh-green">
              <User className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="font-medium text-moh-darkGreen">{user.email}</p>
              <p className="text-sm text-gray-500">Logged in</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="justify-center border-moh-green/20 hover:bg-moh-lightGreen/50 text-moh-darkGreen"
            onClick={() => handleLinkClick("/dashboard")}
            asChild
          >
            <Link to="/dashboard" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          
          <Button
            variant="outline"
            className="justify-center border-red-200 hover:bg-red-50 text-red-600"
            onClick={() => {
              handleLinkClick("/");
              signOut();
            }}
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
