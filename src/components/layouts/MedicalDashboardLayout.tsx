
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MedicalHeading } from '../ui/medical-heading';
import { MedicalCard } from '../ui/medical-card';
import { ChevronRight, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MedicalButton } from '../ui/medical-button';

interface MedicalDashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  showSidebar?: boolean;
  headerGradient?: boolean;
}

// Navigation items for sidebar
const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'home' },
  { name: 'Investments', path: '/dashboard/investment', icon: 'trending-up' },
  { name: 'Innovations', path: '/dashboard/innovations', icon: 'lightbulb' },
  { name: 'Challenges', path: '/dashboard/challenges', icon: 'flag' },
  { name: 'Collaboration', path: '/dashboard/collaboration', icon: 'users' },
  { name: 'Resources', path: '/dashboard/resources', icon: 'book' },
  { name: 'Analytics', path: '/dashboard/analytics', icon: 'bar-chart-3' },
  { name: 'Settings', path: '/dashboard/settings', icon: 'settings' },
];

export function MedicalDashboardLayout({
  children,
  title,
  subtitle,
  headerActions,
  showSidebar = true,
  headerGradient = true,
}: MedicalDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarVariants = {
    open: {
      width: '250px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      width: '70px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const contentVariants = {
    open: {
      marginLeft: '250px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      marginLeft: '70px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    fullWidth: {
      marginLeft: '0px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Function to dynamically import Lucide icons
  const DynamicIcon = ({ name }: { name: string }) => {
    // Import icons dynamically based on name
    const icons: Record<string, React.ReactNode> = {
      'home': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      'trending-up': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
      'lightbulb': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
      'users': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      'flag': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>,
      'book': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
      'bar-chart-3': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
      'settings': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    };

    return <div className="w-6 h-6">{icons[name] || null}</div>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {showSidebar && (
        <motion.div
          className="fixed top-0 left-0 h-full bg-moh-green/95 text-white z-40 overflow-hidden shadow-lg backdrop-blur-sm border-r border-white/10"
          variants={sidebarVariants}
          initial="closed"
          animate={sidebarOpen ? 'open' : 'closed'}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              {sidebarOpen ? (
                <div className="text-xl font-bold">MOH Portal</div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm font-bold">MOH</span>
                </div>
              )}
              <button 
                onClick={toggleSidebar} 
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            <nav className="space-y-1 flex-1 mt-4">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'w-full flex items-center px-3 py-2.5 rounded-lg transition-colors',
                    location.pathname === item.path
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  <DynamicIcon name={item.icon} />
                  {sidebarOpen && (
                    <span className="ml-3 whitespace-nowrap">{item.name}</span>
                  )}
                  {sidebarOpen && location.pathname === item.path && (
                    <div className="ml-auto">
                      <ChevronRight size={16} />
                    </div>
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto">
              {sidebarOpen ? (
                <MedicalCard
                  className="bg-white/10 text-white border-white/20 p-3"
                  gradient={false}
                >
                  <div className="text-sm">
                    <div className="font-medium">Need Help?</div>
                    <p className="text-white/70 text-xs mt-1">
                      Contact support for assistance with the platform.
                    </p>
                    <MedicalButton
                      size="sm"
                      variant="gold"
                      className="w-full mt-3"
                      onClick={() => navigate('/support')}
                    >
                      Get Support
                    </MedicalButton>
                  </div>
                </MedicalCard>
              ) : (
                <button
                  onClick={() => navigate('/support')}
                  className="w-full p-2 hover:bg-white/10 rounded-lg flex justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <motion.main
        className="flex-1 transition-all"
        variants={contentVariants}
        initial={showSidebar ? (sidebarOpen ? 'open' : 'closed') : 'fullWidth'}
        animate={showSidebar ? (sidebarOpen ? 'open' : 'closed') : 'fullWidth'}
      >
        {title && (
          <motion.header
            className={cn(
              'py-6 px-6 sticky top-0 z-30',
              headerGradient && 'bg-gradient-to-r from-moh-lightGreen/50 via-white to-white backdrop-blur-sm border-b border-moh-green/5'
            )}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <MedicalHeading as="h1" size="h3" animated={false}>
                  {title}
                </MedicalHeading>
                {subtitle && (
                  <p className="text-muted-foreground mt-1">{subtitle}</p>
                )}
              </div>
              {headerActions && (
                <div className="mt-4 md:mt-0 flex flex-wrap gap-2 justify-start md:justify-end">
                  {headerActions}
                </div>
              )}
            </div>
          </motion.header>
        )}

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
