
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { useLocation, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  User,
  Settings,
  Bell,
  FileText,
  Shield,
  Heart,
  DollarSign,
  BookOpen,
  Users,
  MessageSquare,
  Lightbulb
} from "lucide-react";

interface MedicalSidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string | number;
  children?: MedicalSidebarItem[];
}

interface MedicalDashboardProps {
  children: React.ReactNode;
}

export default function MedicalDashboard({ children }: MedicalDashboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  
  const sidebarItems: MedicalSidebarItem[] = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Lightbulb,
      label: "Innovations",
      href: "/dashboard/innovations",
      children: [
        {
          icon: FileText,
          label: "My Submissions",
          href: "/dashboard/innovations/submissions",
        },
        {
          icon: Users,
          label: "Collaborations",
          href: "/dashboard/innovations/collaborations",
          badge: 2,
        },
      ],
    },
    {
      icon: Heart,
      label: "Healthcare",
      href: "/dashboard/healthcare",
      children: [
        {
          icon: Shield,
          label: "Regulatory",
          href: "/dashboard/healthcare/regulatory",
        },
        {
          icon: Users,
          label: "Partnerships",
          href: "/dashboard/healthcare/partnerships",
        },
      ],
    },
    {
      icon: DollarSign,
      label: "Investment",
      href: "/dashboard/investment",
      badge: "New",
      children: [
        {
          icon: FileText,
          label: "Portfolio",
          href: "/dashboard/investment/portfolio",
        },
        {
          icon: Users,
          label: "Market Analysis",
          href: "/dashboard/investment/market-analysis",
        },
      ],
    },
    {
      icon: BookOpen,
      label: "Knowledge Hub",
      href: "/dashboard/knowledge-hub",
    },
    {
      icon: MessageSquare,
      label: "Discussions",
      href: "/dashboard/discussions",
      badge: 5,
    },
    {
      icon: User,
      label: "Profile",
      href: "/dashboard/profile",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/notifications",
      badge: 3,
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubMenu = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <div className="flex h-screen bg-moh-lightGreen/30">
      <ScrollProgress />
      
      {/* Sidebar */}
      <motion.div
        initial={{ width: 256 }}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-md relative z-10 flex flex-col"
      >
        {/* Logo and toggle */}
        <div className={cn(
          "flex items-center border-b border-gray-100 transition-all",
          isCollapsed ? "justify-center py-6" : "justify-between px-4 py-4"
        )}>
          {!isCollapsed && (
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png"
                alt="Ministry of Health" 
                className="h-8 w-auto" 
              />
            </Link>
          )}
          <button 
            onClick={toggleSidebar}
            className={cn(
              "p-2 rounded-full hover:bg-moh-lightGreen text-moh-green transition-all",
              isCollapsed && "rotate-180"
            )}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        {/* Navigation Items */}
        <div className="flex-grow overflow-y-auto py-2 space-y-1 px-2">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {/* Main Item */}
              <div 
                className={cn(
                  "relative",
                  item.children && expandedItem === item.label && "mb-1"
                )}
              >
                <Link
                  to={item.href}
                  onClick={(e) => {
                    if (item.children) {
                      e.preventDefault();
                      toggleSubMenu(item.label);
                    }
                  }}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-md transition-all",
                    isActive(item.href) && !item.children 
                      ? "bg-moh-green text-white" 
                      : expandedItem === item.label
                      ? "bg-moh-lightGreen text-moh-green"
                      : "hover:bg-moh-lightGreen/50 text-gray-700"
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 flex-grow">{item.label}</span>
                      
                      {item.badge && (
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                            typeof item.badge === 'string' && item.badge === 'New'
                              ? 'bg-moh-gold text-white'
                              : 'bg-moh-green text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      
                      {item.children && (
                        <ChevronRight 
                          size={16} 
                          className={cn(
                            "ml-auto transform transition-transform",
                            expandedItem === item.label && "rotate-90"
                          )}
                        />
                      )}
                    </>
                  )}
                  
                  {/* Show badge in collapsed mode too */}
                  {isCollapsed && item.badge && (
                    <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-moh-gold text-white text-xs flex items-center justify-center">
                      {typeof item.badge === 'number' && item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </Link>
              </div>
              
              {/* Sub Items */}
              {!isCollapsed && item.children && expandedItem === item.label && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-6 mt-1 space-y-1"
                >
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      to={child.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md transition-all",
                        isActive(child.href)
                          ? "bg-moh-green/10 text-moh-green"
                          : "hover:bg-gray-100 text-gray-700"
                      )}
                    >
                      <child.icon size={18} className="flex-shrink-0" />
                      <span className="ml-3">{child.label}</span>
                      
                      {child.badge && (
                        <span 
                          className={`ml-auto px-1.5 py-0.5 text-xs rounded-full ${
                            typeof child.badge === 'string' && child.badge === 'New'
                              ? 'bg-moh-gold/80 text-white'
                              : 'bg-moh-green/80 text-white'
                          }`}
                        >
                          {child.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
        
        {/* User Profile */}
        <div className={cn(
          "border-t border-gray-100 p-4 mt-2 transition-all",
          isCollapsed ? "flex justify-center" : ""
        )}>
          {isCollapsed ? (
            <div className="w-10 h-10 bg-moh-green/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-moh-green">JD</span>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-moh-green/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-moh-green">JD</span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">Dr. Jane Doe</div>
                <div className="text-xs text-gray-500">Healthcare Provider</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-moh-lightGreen/30">
        {/* Topbar */}
        <div className="bg-white shadow-sm sticky top-0 z-10 flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-full hover:bg-moh-lightGreen text-moh-green"
            >
              <ChevronRight size={20} className={isCollapsed ? "rotate-180" : ""} />
            </button>
            <h1 className="text-xl font-semibold text-moh-darkGreen">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-moh-lightGreen text-moh-green relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-moh-gold rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-full hover:bg-moh-lightGreen text-moh-green">
              <Settings size={20} />
            </button>
            
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-moh-green/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-moh-green">JD</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
