
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Challenge } from "@/types/challenges";
import ChallengeHero from "@/components/challenges/public/ChallengeHero";
import ChallengeResultInfo from "@/components/challenges/public/ChallengeResultInfo";
import ChallengeGrid from "@/components/challenges/public/ChallengeGrid";
import ChallengeFilterBar from "@/components/challenges/public/ChallengeFilterBar";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { ChevronRight, Target, Users, Trophy, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock challenges data with complete Challenge interface properties
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Remote Patient Monitoring Solutions",
    description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
    long_description: "Detailed description about the remote patient monitoring challenge and its objectives.",
    deadline: "June 30, 2025",
    submission_deadline: "2025-06-30T23:59:59+03:00",
    category: "Digital Health",
    participants: 47,
    prize: "SAR 500,000",
    image_url: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Innovation Department",
    status: "Open",
    eligibility: "Healthcare professionals, technology innovators, startups",
    requirements: ["Solution must be applicable within Saudi healthcare system", "Technology must be tested for basic feasibility"],
    timeline: [
      { date: "March 15, 2025", event: "Challenge Launch" },
      { date: "June 30, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "2",
    title: "AI for Early Disease Detection",
    description: "Develop AI algorithms to detect early signs of diseases using existing health data from MOH facilities.",
    long_description: "Detailed description about the AI disease detection challenge and its objectives.",
    deadline: "July 15, 2025",
    submission_deadline: "2025-07-15T23:59:59+03:00",
    category: "AI & Machine Learning",
    participants: 32,
    prize: "SAR 750,000",
    image_url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Digital Transformation Office",
    status: "Open",
    eligibility: "Data scientists, AI researchers, healthcare innovators",
    requirements: ["Must use anonymized healthcare data", "Solution must demonstrate significant improvement over existing methods"],
    timeline: [
      { date: "April 1, 2025", event: "Challenge Launch" },
      { date: "July 15, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "3",
    title: "Healthcare Supply Chain Optimization",
    description: "Create solutions to improve the efficiency and resilience of medical supply chains across Saudi Arabia.",
    long_description: "Detailed description about the supply chain optimization challenge and its objectives.",
    deadline: "August 22, 2025",
    submission_deadline: "2025-08-22T23:59:59+03:00",
    category: "Logistics",
    participants: 21,
    prize: "SAR 350,000",
    image_url: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Supply Chain Department",
    status: "Open",
    eligibility: "Supply chain experts, logistics companies, technology innovators",
    requirements: ["Solution must be implementable within 12 months", "Must demonstrate cost savings or efficiency gains"],
    timeline: [
      { date: "May 1, 2025", event: "Challenge Launch" },
      { date: "August 22, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "4",
    title: "Mental Health Support Platform",
    description: "Build a digital platform to provide mental health resources and support for citizens across the Kingdom.",
    long_description: "Detailed description about the mental health platform challenge and its objectives.",
    deadline: "September 10, 2025",
    submission_deadline: "2025-09-10T23:59:59+03:00",
    category: "Mental Health",
    participants: 39,
    prize: "SAR 600,000",
    image_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Mental Health Department",
    status: "Open",
    eligibility: "Mental health professionals, digital health startups, UX designers",
    requirements: ["Platform must be culturally sensitive", "Must include crisis intervention features"],
    timeline: [
      { date: "June 1, 2025", event: "Challenge Launch" },
      { date: "September 10, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "5",
    title: "Elderly Care Innovations",
    description: "Develop technologies to support elderly care and independent living for seniors in Saudi Arabia.",
    long_description: "Detailed description about the elderly care innovation challenge and its objectives.",
    deadline: "October 5, 2025",
    submission_deadline: "2025-10-05T23:59:59+03:00",
    category: "Elder Care",
    participants: 27,
    prize: "SAR 450,000",
    image_url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Elderly Care Program",
    status: "Open",
    eligibility: "Geriatric care specialists, technology innovators, elderly care providers",
    requirements: ["Solution must be easy to use for elderly population", "Must enhance quality of life or independence"],
    timeline: [
      { date: "July 1, 2025", event: "Challenge Launch" },
      { date: "October 5, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "6",
    title: "Vaccination Management System",
    description: "Create an innovative solution for nationwide vaccine distribution, administration, and monitoring.",
    long_description: "Detailed description about the vaccination management system challenge and its objectives.",
    deadline: "November 15, 2025",
    submission_deadline: "2025-11-15T23:59:59+03:00",
    category: "Public Health",
    participants: 51,
    prize: "SAR 550,000",
    image_url: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Immunization Department",
    status: "Open",
    eligibility: "Public health experts, software developers, healthcare logistics specialists",
    requirements: ["System must handle high volume of users", "Must integrate with existing health records"],
    timeline: [
      { date: "August 1, 2025", event: "Challenge Launch" },
      { date: "November 15, 2025", event: "Submission Deadline" }
    ]
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Digital Health",
  "AI & Machine Learning",
  "Logistics",
  "Mental Health",
  "Elder Care",
  "Public Health"
];

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const { t, language } = useLanguage();
  
  // Fetch challenges from API (using mock data for now)
  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      // In a real app, this would be fetching from Supabase
      // const { data, error } = await supabase.from('challenges').select('*');
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return new Promise<Challenge[]>((resolve) => {
        setTimeout(() => resolve(mockChallenges), 1000);
      });
    }
  });
  
  // Filter challenges based on search and category
  const filteredChallenges = challenges?.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "All Categories" || 
                           challenge.category === categoryFilter;
                           
    return matchesSearch && matchesCategory;
  });

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All Categories");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGreen">
      <Navbar />
      <ScrollProgress />
      
      <main className="flex-grow pt-0 my-0 rounded-none py-0">
        {/* Hero Section - with updated green theme similar to Investment page */}
        <section className="relative overflow-hidden bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
          {/* Background decoration elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-moh-gold blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-moh-lightGold blur-3xl"></div>
            <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-moh-darkGreen blur-3xl"></div>
          </div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          
          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-3 py-1 rounded-full bg-moh-darkGreen text-moh-lightGreen text-sm font-medium"
                >
                  Innovation Hub
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Healthcare <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-lightGold">Innovation Challenges</span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-moh-lightGreen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Join MOH-sponsored challenges to solve critical healthcare issues and help shape the future of healthcare in Saudi Arabia.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a href="#challenge-list" className="bg-moh-gold hover:bg-moh-darkGold text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                    Browse Challenges
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                  <a href="/dashboard/submissions" className="border border-moh-gold/50 text-moh-lightGold hover:bg-moh-darkGreen/20 font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                    My Submissions
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-moh-gold/20 rounded-full blur-md"></div>
                  <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-moh-gold/30 rounded-full blur-md"></div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-moh-green flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-white">Active Challenges</h3>
                          <p className="text-sm text-white/70">Opportunities to innovate</p>
                        </div>
                      </div>
                      <span className="bg-moh-green/30 text-white px-2 py-1 rounded-full text-xs">
                        {challenges?.length || 0} available
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {challenges?.slice(0, 3).map((challenge, index) => (
                        <motion.div
                          key={challenge.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (index * 0.1) }}
                          className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex justify-between">
                            <p className="font-medium text-white">{challenge.title}</p>
                            <span className="text-xs bg-moh-gold/20 text-moh-lightGold px-2 py-0.5 rounded">
                              {challenge.category}
                            </span>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-white/70">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {challenge.deadline}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {challenge.participants} participants
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <a href="#challenge-list" className="text-moh-lightGold hover:text-moh-gold text-sm flex items-center justify-center">
                        View all challenges
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-moh-lightGreen"></path>
            </svg>
          </div>
        </section>
        
        {/* Challenges stats section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                    <Trophy className="h-4 w-4 text-moh-green" />
                  </div>
                  <span className="text-2xl font-bold text-moh-darkGreen">
                    {challenges?.length || 0}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Active Challenges</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-moh-green" />
                  </div>
                  <span className="text-2xl font-bold text-moh-darkGreen">
                    217
                  </span>
                </div>
                <p className="text-sm text-gray-600">Active Participants</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                    <Target className="h-4 w-4 text-moh-green" />
                  </div>
                  <span className="text-2xl font-bold text-moh-darkGreen">
                    SAR 3.2M
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total Prize Money</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                    <Clock className="h-4 w-4 text-moh-green" />
                  </div>
                  <span className="text-2xl font-bold text-moh-darkGreen">
                    June 30
                  </span>
                </div>
                <p className="text-sm text-gray-600">Next Deadline</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Main Challenges List */}
        <section id="challenge-list" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <BreadcrumbNav currentPage="Challenges" />
            
            {/* Search and Filter */}
            <ChallengeFilterBar
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              categories={categories}
              handleResetFilters={handleResetFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            {/* Results count and sorting */}
            <div className="flex justify-between items-center mb-6">
              <ChallengeResultInfo 
                count={filteredChallenges?.length || 0} 
                isLoading={isLoading} 
                error={error} 
              />
            </div>
            
            {/* Challenge grid */}
            <ChallengeGrid 
              challenges={challenges}
              isLoading={isLoading}
              error={error}
              filteredChallenges={filteredChallenges}
              handleResetFilters={handleResetFilters}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
