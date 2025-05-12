
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { MedicalCard } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { MedicalHeading } from '@/components/ui/medical-heading';
import { MedicalBadge } from '@/components/ui/medical-badge';
import { MedicalDashboardLayout } from '@/components/layouts/MedicalDashboardLayout';
import { 
  TrendingUp, 
  Lightbulb, 
  Users, 
  BookOpen, 
  Activity, 
  Calendar, 
  BarChart3, 
  PieChart,
  Bell,
  Eye,
  ArrowRight,
  MessageSquare,
  FileText
} from "lucide-react";
import { Link } from 'react-router-dom';

// Animation variants for staggered animations
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Mock data for dashboard cards
  const recentActivities = [
    { id: 1, type: "submission", title: "Innovation submission approved", time: "2 hours ago" },
    { id: 2, type: "connection", title: "New investor connection", time: "Yesterday" },
    { id: 3, type: "event", title: "Registered for Pitch Event", time: "2 days ago" },
    { id: 4, type: "challenge", title: "Challenge submission received feedback", time: "3 days ago" },
  ];
  
  const upcomingEvents = [
    { id: 1, title: "Healthcare Innovation Webinar", date: "May 15, 2025", type: "Webinar" },
    { id: 2, title: "Investor Pitch Day", date: "May 22, 2025", type: "Pitch" },
    { id: 3, title: "Funding Application Deadline", date: "May 30, 2025", type: "Deadline" },
  ];
  
  const quickStats = [
    { title: "Innovations", value: "3", icon: <Lightbulb className="text-moh-green" /> },
    { title: "Connections", value: "8", icon: <Users className="text-moh-green" /> },
    { title: "Challenges", value: "2", icon: <Activity className="text-moh-green" /> },
    { title: "Resources", value: "12", icon: <BookOpen className="text-moh-green" /> },
  ];
  
  // Helper function for activity icons
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <FileText size={16} className="text-moh-green" />;
      case "connection":
        return <Users size={16} className="text-blue-500" />;
      case "event":
        return <Calendar size={16} className="text-purple-500" />;
      case "challenge":
        return <Activity size={16} className="text-orange-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };
  
  return (
    <MedicalDashboardLayout
      title={`Welcome, ${user?.firstName || 'User'}`}
      subtitle="Your healthcare innovation dashboard"
      headerActions={
        <div className="flex gap-2">
          <MedicalButton 
            variant="outline" 
            size="sm" 
            iconLeft={<Bell size={16} />}
          >
            2 Notifications
          </MedicalButton>
          <MedicalButton 
            variant="gradient" 
            size="sm" 
            iconLeft={<Lightbulb size={16} />}
          >
            Submit Innovation
          </MedicalButton>
        </div>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <MedicalCard 
              className="p-4 flex items-center gap-4" 
              gradient={true}
              hoverEffect={true}
            >
              <div className="rounded-full w-10 h-10 bg-moh-lightGreen flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-moh-darkGreen">{stat.value}</p>
              </div>
            </MedicalCard>
          </motion.div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Featured Cards - 2/3 Width */}
        <motion.div 
          className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemAnimation}>
            <MedicalCard 
              className="h-full flex flex-col" 
              gradient={true}
              hoverEffect={true}
            >
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <TrendingUp size={18} className="text-moh-green mr-2" />
                    <h3 className="font-semibold text-gray-800">Investment Matches</h3>
                  </div>
                  <MedicalBadge variant="secondary" size="sm">3 New</MedicalBadge>
                </div>
              </div>
              <div className="px-6 flex-grow">
                <div className="space-y-3">
                  {[
                    { name: "Healthcare Venture Fund", match: 92, type: "Venture Capital" },
                    { name: "Medical Device Accelerator", match: 87, type: "Accelerator" },
                    { name: "Digital Health Investors", match: 84, type: "Angel Group" }
                  ].map((investor, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{investor.name}</p>
                          <p className="text-sm text-gray-500">{investor.type}</p>
                        </div>
                        <MedicalBadge variant="secondary" className="bg-moh-lightGreen/70">
                          {investor.match}% Match
                        </MedicalBadge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 mt-auto">
                <Link to="/dashboard/investment">
                  <MedicalButton 
                    variant="outline" 
                    className="w-full"
                    iconRight={<ArrowRight size={16} />}
                  >
                    View All Matches
                  </MedicalButton>
                </Link>
              </div>
            </MedicalCard>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <MedicalCard 
              className="h-full flex flex-col" 
              gradient={true}
              hoverEffect={true}
            >
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Lightbulb size={18} className="text-moh-green mr-2" />
                    <h3 className="font-semibold text-gray-800">Active Challenges</h3>
                  </div>
                  <MedicalBadge variant="gold" size="sm">Featured</MedicalBadge>
                </div>
              </div>
              <div className="px-6 flex-grow">
                <div className="space-y-3">
                  {[
                    { name: "Remote Patient Monitoring", deadline: "May 30", prize: "$50,000" },
                    { name: "AI in Medical Diagnosis", deadline: "June 15", prize: "$75,000" },
                    { name: "Healthcare Accessibility", deadline: "June 30", prize: "$60,000" }
                  ].map((challenge, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{challenge.name}</p>
                          <p className="text-sm text-gray-500">Deadline: {challenge.deadline}</p>
                        </div>
                        <p className="text-sm font-medium text-moh-green">{challenge.prize}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 mt-auto">
                <Link to="/dashboard/challenges">
                  <MedicalButton 
                    variant="gradient" 
                    className="w-full"
                    iconRight={<Eye size={16} />}
                  >
                    Explore Challenges
                  </MedicalButton>
                </Link>
              </div>
            </MedicalCard>
          </motion.div>
          
          <motion.div variants={itemAnimation} className="md:col-span-2">
            <MedicalCard 
              className="h-full flex flex-col" 
              gradient={false}
              elevation="medium"
              glassEffect={true}
            >
              <div className="p-6 bg-gradient-to-r from-moh-green to-moh-darkGreen text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PieChart size={20} className="mr-2" />
                    <h3 className="font-semibold">Performance Analytics</h3>
                  </div>
                  <MedicalBadge 
                    variant="glass" 
                    className="backdrop-blur-md bg-white/10 border-white/20 text-white text-xs"
                  >
                    Last 30 Days
                  </MedicalBadge>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-moh-lightGreen/30 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Profile Views</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-moh-darkGreen">124</p>
                      <MedicalBadge variant="secondary" size="sm">+18%</MedicalBadge>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-moh-green rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ delay: 0.5, duration: 1 }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="bg-moh-lightGreen/30 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Connections Made</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-moh-darkGreen">8</p>
                      <MedicalBadge variant="secondary" size="sm">+3</MedicalBadge>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-moh-green rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '40%' }}
                        transition={{ delay: 0.6, duration: 1 }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="bg-moh-lightGreen/30 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Engagement Score</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-moh-darkGreen">76/100</p>
                      <MedicalBadge variant="secondary" size="sm">Good</MedicalBadge>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-moh-green rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '76%' }}
                        transition={{ delay: 0.7, duration: 1 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <MedicalHeading as="h3" size="h5" variant="accent" className="mb-4">
                    Innovation Visibility
                  </MedicalHeading>
                  <div className="space-y-3">
                    {[
                      { name: "Remote Health Monitor", views: 56, leads: 4 },
                      { name: "AI Diagnostic Tool", views: 38, leads: 2 }
                    ].map((innovation, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="rounded-full w-8 h-8 bg-moh-lightGreen/50 flex items-center justify-center mr-3">
                            <Lightbulb size={16} className="text-moh-darkGreen" />
                          </div>
                          <span className="font-medium">{innovation.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Eye size={16} className="text-gray-400 mr-1" />
                            <span className="text-sm">{innovation.views}</span>
                          </div>
                          <div className="flex items-center">
                            <Users size={16} className="text-gray-400 mr-1" />
                            <span className="text-sm">{innovation.leads}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100">
                <Link to="/dashboard/analytics">
                  <MedicalButton 
                    variant="glass"
                    className="w-full border-moh-green/30"
                    iconRight={<BarChart3 size={16} />}
                  >
                    View Full Analytics
                  </MedicalButton>
                </Link>
              </div>
            </MedicalCard>
          </motion.div>
        </motion.div>
        
        {/* Right Sidebar - 1/3 Width */}
        <motion.div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <MedicalCard 
              className="overflow-hidden" 
              gradient={false}
              elevation="low"
              glassEffect={true}
            >
              <div className="p-6 bg-gradient-to-br from-moh-gold/90 to-moh-darkGold/90 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Upcoming Events</h3>
                  <Calendar size={18} />
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {upcomingEvents.map((event, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="rounded-md bg-moh-lightGreen/30 p-2 flex-shrink-0">
                          <Calendar size={16} className="text-moh-darkGreen" />
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-gray-500">{event.date}</p>
                            <span className="mx-2 text-gray-300">•</span>
                            <MedicalBadge variant="secondary" size="sm" className="text-xs py-0">
                              {event.type}
                            </MedicalBadge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link to="/dashboard/events">
                    <MedicalButton variant="outline" className="w-full" size="sm">
                      View All Events
                    </MedicalButton>
                  </Link>
                </div>
              </div>
            </MedicalCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <MedicalCard 
              className="overflow-hidden" 
              gradient={false}
              elevation="low"
              glassEffect={true}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Bell size={18} className="text-moh-green mr-2" />
                    <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="rounded-full w-8 h-8 bg-moh-lightGreen/30 flex items-center justify-center flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MedicalCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <MedicalCard 
              className="overflow-hidden bg-gradient-to-br from-moh-green to-moh-darkGreen text-white" 
              gradient={false}
              hoverEffect={true}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare size={18} className="mr-2" />
                  <h3 className="font-semibold">Need Support?</h3>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Our team is ready to assist with any questions about the platform or your innovations.
                </p>
                <MedicalButton 
                  variant="gold" 
                  className="w-full"
                  iconRight={<ArrowRight size={16} />}
                >
                  Contact Support
                </MedicalButton>
              </div>
            </MedicalCard>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Featured Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mb-8"
      >
        <MedicalCard 
          className="overflow-hidden" 
          gradient={false}
          glassEffect={true}
          elevation="medium"
        >
          <div className="p-6 border-b border-gray-100">
            <MedicalHeading as="h3" size="h4" variant="gradient" className="mb-2">
              Recommended for You
            </MedicalHeading>
            <p className="text-gray-500">Personalized recommendations based on your profile and activity</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Complete your innovation profile",
                  description: "Add more details to increase visibility to potential investors.",
                  icon: <FileText size={24} className="text-moh-green" />,
                  action: "Update Profile",
                  link: "/dashboard/profile"
                },
                {
                  title: "Join upcoming webinar",
                  description: "Learn about securing healthcare innovation funding on May 18.",
                  icon: <Calendar size={24} className="text-moh-green" />,
                  action: "Register Now",
                  link: "/dashboard/events"
                },
                {
                  title: "Connect with matched investors",
                  description: "You have 3 new investor matches waiting to be contacted.",
                  icon: <Users size={24} className="text-moh-green" />,
                  action: "View Matches",
                  link: "/dashboard/investment"
                }
              ].map((item, idx) => (
                <div key={idx} className="border border-moh-green/10 rounded-lg p-5 hover:border-moh-green/30 transition-colors">
                  <div className="rounded-full w-12 h-12 bg-moh-lightGreen flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                  <Link to={item.link}>
                    <MedicalButton 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      iconRight={<ArrowRight size={14} />}
                    >
                      {item.action}
                    </MedicalButton>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </MedicalCard>
      </motion.div>
    </MedicalDashboardLayout>
  );
}
