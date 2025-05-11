import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Challenge } from "@/types/challenges";
import ChallengeHero from "@/components/challenges/public/ChallengeHero";
import ChallengeResultInfo from "@/components/challenges/public/ChallengeResultInfo";
import ChallengeGrid from "@/components/challenges/public/ChallengeGrid";
import ChallengeFilterBar from "@/components/challenges/public/ChallengeFilterBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <ChallengeHero
          title="Innovation Challenges"
          description="Join MOH-sponsored challenges to solve critical healthcare issues and help shape the future of healthcare in Saudi Arabia."
        />
        
        <section className="py-12">
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
