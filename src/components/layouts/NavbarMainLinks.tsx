import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MegaMenuDropdown from "./MegaMenuDropdown";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  const { language } = useLanguage();
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  
  // Reordered main links based on user journey priority
  const mainLinks = [
    { 
      path: "/", 
      label: "Home",
      megaMenu: false
    },
    { 
      path: "/innovations", 
      label: "Innovations",
      megaMenu: true,
      categories: [
        {
          title: "Browse Innovations",
          items: [
            { label: "Latest Innovations", path: "/innovations/latest" },
            { label: "Featured Solutions", path: "/innovations/featured" },
            { label: "Success Stories", path: "/innovations/success-stories" },
            { label: "Trending Technologies", path: "/innovations/trending" }
          ]
        },
        {
          title: "Innovation Types",
          items: [
            { label: "Medical Devices", path: "/innovations/medical-devices" },
            { label: "Digital Health", path: "/innovations/digital-health" },
            { label: "Pharmaceuticals", path: "/innovations/pharmaceuticals" },
            { label: "Biotechnology", path: "/innovations/biotechnology" },
            { label: "AI & Machine Learning", path: "/innovations/ai-ml" }
          ]
        },
        {
          title: "For Innovators",
          items: [
            { label: "Submit Innovation", path: "/innovations/submit" },
            { label: "Innovation Guidelines", path: "/innovations/guidelines" },
            { label: "Intellectual Property", path: "/innovations/ip" },
            { label: "Technical Support", path: "/innovations/technical-support" }
          ]
        }
      ]
    },
    { 
      path: "/challenges", 
      label: "Challenges",
      megaMenu: true,
      categories: [
        {
          title: "Current Challenges",
          items: [
            { label: "Open Challenges", path: "/challenges/open" },
            { label: "Upcoming Challenges", path: "/challenges/upcoming" },
            { label: "Featured Challenges", path: "/challenges/featured" }
          ]
        },
        {
          title: "Challenge Areas",
          items: [
            { label: "Primary Care", path: "/challenges/primary-care" },
            { label: "Preventive Medicine", path: "/challenges/preventive-medicine" },
            { label: "Chronic Disease", path: "/challenges/chronic-disease" },
            { label: "Emergency Response", path: "/challenges/emergency" },
            { label: "Healthcare Access", path: "/challenges/access" }
          ]
        },
        {
          title: "For Participants",
          items: [
            { label: "Challenge Guidelines", path: "/challenges/guidelines" },
            { label: "Submission Process", path: "/challenges/process" },
            { label: "Evaluation Criteria", path: "/challenges/evaluation" },
            { label: "Past Winners", path: "/challenges/winners" }
          ]
        }
      ]
    },
    { 
      path: "/investment", 
      label: "Investment",
      megaMenu: true,
      categories: [
        {
          title: "Investment Opportunities",
          items: [
            { label: "Funding Programs", path: "/investment/programs" },
            { label: "Investor Network", path: "/investment/network" },
            { label: "Startup Funding", path: "/investment/startup" }
          ]
        },
        {
          title: "For Investors",
          items: [
            { label: "Due Diligence", path: "/investment/due-diligence" },
            { label: "Investment Guides", path: "/investment/guides" },
            { label: "Success Stories", path: "/investment/success-stories" }
          ]
        },
        {
          title: "Resources",
          items: [
            { label: "Financial Planning", path: "/investment/financial-planning" },
            { label: "Market Analysis", path: "/investment/market-analysis" },
            { label: "Investor Events", path: "/investment/events" }
          ]
        }
      ]
    },
    { 
      path: "/regulatory", 
      label: "Regulatory",
      megaMenu: true,
      categories: [
        {
          title: "Regulatory Framework",
          items: [
            { label: "Guidelines", path: "/regulatory/guidelines" },
            { label: "Compliance", path: "/regulatory/compliance" },
            { label: "Standards", path: "/regulatory/standards" }
          ]
        },
        {
          title: "Approval Pathways",
          items: [
            { label: "Medical Devices", path: "/regulatory/medical-devices" },
            { label: "Digital Health", path: "/regulatory/digital-health" },
            { label: "Pharmaceuticals", path: "/regulatory/pharmaceuticals" }
          ]
        },
        {
          title: "Resources",
          items: [
            { label: "Regulatory Updates", path: "/regulatory/updates" },
            { label: "Consultations", path: "/regulatory/consultations" },
            { label: "Training", path: "/regulatory/training" }
          ]
        }
      ]
    },
    { 
      path: "/knowledge-hub", 
      label: "Knowledge Hub",
      megaMenu: true,
      categories: [
        {
          title: "Learning Resources",
          items: [
            { label: "Articles & Publications", path: "/knowledge-hub/articles" },
            { label: "Research Papers", path: "/knowledge-hub/research" },
            { label: "Case Studies", path: "/knowledge-hub/case-studies" }
          ]
        },
        {
          title: "Events & Training",
          items: [
            { label: "Webinars", path: "/knowledge-hub/webinars" },
            { label: "Workshops", path: "/knowledge-hub/workshops" },
            { label: "Conferences", path: "/knowledge-hub/conferences" }
          ]
        },
        {
          title: "Tools & Templates",
          items: [
            { label: "Innovation Toolkit", path: "/knowledge-hub/toolkit" },
            { label: "Business Templates", path: "/knowledge-hub/templates" },
            { label: "Regulatory Guides", path: "/knowledge-hub/regulatory-guides" }
          ]
        }
      ]
    },
    { 
      path: "/about", 
      label: "About",
      megaMenu: false
    },
  ];

  const MotionLink = motion(Link);
  
  // Enhanced animation variants for staggered menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: -12, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const handleMouseEnter = (path: string) => {
    setOpenMegaMenu(path);
  };

  const handleMouseLeave = () => {
    setOpenMegaMenu(null);
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex"
      >
        <NavigationMenuList className="flex justify-center space-x-2 lg:space-x-8">
          {mainLinks.map((link) => (
            <NavigationMenuItem key={link.path}
              onMouseEnter={() => link.megaMenu && handleMouseEnter(link.path)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <motion.div variants={itemVariants}>
                <div className="flex items-center">
                  <MotionLink
                    to={link.path}
                    className={cn(
                      "text-[15px] transition-all px-3 py-2 rounded-full relative overflow-hidden flex items-center",
                      isRouteActive(link.path) 
                        ? 'text-white font-medium bg-gradient-to-r from-moh-green to-moh-darkGreen shadow-sm' 
                        : 'text-moh-darkGreen hover:bg-moh-lightGreen/50 hover:text-moh-green'
                    )}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{link.label}</span>
                    {link.megaMenu && (
                      <motion.div 
                        animate={isRouteActive(link.path) ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </motion.div>
                    )}
                  </MotionLink>
                </div>

                {/* Mega Menu Dropdown */}
                {link.megaMenu && openMegaMenu === link.path && (
                  <MegaMenuDropdown categories={link.categories} />
                )}
              </motion.div>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </motion.div>
    </NavigationMenu>
  );
}
