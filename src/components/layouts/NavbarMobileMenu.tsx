
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { LogOut, User, Settings, FileUp, ChevronRight, Home, Award, LineChart, ScrollText, BookOpen, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "../ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface NavbarMobileMenuProps {
  isRouteActive: (path: string) => boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function NavbarMobileMenu({
  isRouteActive,
  setMobileMenuOpen,
}: NavbarMobileMenuProps) {
  const { language } = useLanguage();
  const { user, signOut } = useAuth();
  
  // Navigation links with icons
  const navigationLinks = [
    { 
      path: "/", 
      label: "Home",
      icon: Home,
      submenu: []
    },
    { 
      path: "/innovations", 
      label: "Innovations",
      icon: FileUp,
      submenu: [
        { label: "Browse Innovations", path: "/innovations/latest" },
        { label: "Innovation Types", path: "/innovations/types" },
        { label: "Submit Innovation", path: "/innovations/submit" },
        { label: "All Innovations", path: "/innovations" }
      ]
    },
    { 
      path: "/challenges", 
      label: "Challenges",
      icon: Award,
      submenu: [
        { label: "Open Challenges", path: "/challenges/open" },
        { label: "Challenge Areas", path: "/challenges/areas" },
        { label: "Guidelines", path: "/challenges/guidelines" },
        { label: "All Challenges", path: "/challenges" }
      ]
    },
    { 
      path: "/investment", 
      label: "Investment",
      icon: LineChart,
      submenu: [
        { label: "Funding Programs", path: "/investment/programs" },
        { label: "For Investors", path: "/investment/for-investors" },
        { label: "Resources", path: "/investment/resources" },
        { label: "All Investment", path: "/investment" }
      ]
    },
    { 
      path: "/regulatory", 
      label: "Regulatory",
      icon: ScrollText,
      submenu: [
        { label: "Guidelines", path: "/regulatory/guidelines" },
        { label: "Approval Pathways", path: "/regulatory/pathways" },
        { label: "Resources", path: "/regulatory/resources" },
        { label: "All Regulatory", path: "/regulatory" }
      ]
    },
    { 
      path: "/knowledge-hub", 
      label: "Knowledge Hub",
      icon: BookOpen,
      submenu: [
        { label: "Articles", path: "/knowledge-hub/articles" },
        { label: "Events", path: "/knowledge-hub/events" },
        { label: "Tools", path: "/knowledge-hub/tools" },
        { label: "All Resources", path: "/knowledge-hub" }
      ]
    },
    { 
      path: "/about", 
      label: "About",
      icon: AlertCircle,
      submenu: []
    },
  ];
  
  // Enhanced animation variants
  const menuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };
  
  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="md:hidden fixed inset-0 bg-white/90 backdrop-blur-md z-40 overflow-hidden"
      dir="ltr"
    >
      <motion.div 
        className="h-full flex flex-col pt-24 pb-8"
        variants={itemVariants}
      >
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <nav className="flex flex-col">
            <motion.div className="mb-4" variants={itemVariants}>
              <div className="py-2 px-4 bg-moh-lightGreen/50 rounded-xl mb-6">
                <Button 
                  className="w-full bg-moh-green hover:bg-moh-darkGreen mb-2" 
                  onClick={() => handleLinkClick("/innovations/submit")}
                  asChild
                >
                  <Link to="/innovations/submit" className="flex items-center justify-center gap-2">
                    <FileUp className="h-4 w-4" />
                    Submit an Innovation
                  </Link>
                </Button>
              </div>
            </motion.div>
          
            <Accordion type="single" collapsible className="w-full">
              {navigationLinks.map((link, index) => (
                <motion.div key={link.path} variants={itemVariants} custom={index}>
                  <AccordionItem value={link.path} className="border-b border-gray-100">
                    {link.submenu.length > 0 ? (
                      <AccordionTrigger 
                        className={`py-3 text-lg font-medium flex items-center gap-3 ${
                          isRouteActive(link.path)
                          ? "text-moh-green"
                          : "text-moh-darkGreen"
                        }`}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </AccordionTrigger>
                    ) : (
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-left py-3 text-lg font-medium flex items-center gap-3 ${
                          isRouteActive(link.path)
                          ? "text-moh-green"
                          : "text-moh-darkGreen"
                        }`}
                        onClick={() => handleLinkClick(link.path)}
                        asChild
                      >
                        <Link to={link.path}>
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </Link>
                      </Button>
                    )}
                    
                    {link.submenu.length > 0 && (
                      <AccordionContent>
                        <div className="pl-9 py-2 space-y-1">
                          {link.submenu.map((subItem, subIndex) => (
                            <motion.div
                              key={subItem.path}
                              variants={itemVariants}
                              custom={index + subIndex * 0.1}
                            >
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-left rounded-lg"
                                onClick={() => handleLinkClick(subItem.path)}
                                asChild
                              >
                                <Link to={subItem.path} className="flex items-center py-2">
                                  <span className="text-gray-700">{subItem.label}</span>
                                  <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                                </Link>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </nav>
        </div>
        
        <div className="px-4 mt-auto">
          <Separator className="mb-4 opacity-50" />
          
          {user ? (
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
          ) : (
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
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
