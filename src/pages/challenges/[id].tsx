
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Challenge } from "@/types/challenges";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Component imports
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import ChallengeSidebar from "@/components/challenges/ChallengeSidebar";
import ChallengeTimeline from "@/components/challenges/ChallengeTimeline";
import ChallengeRequirements from "@/components/challenges/ChallengeRequirements";

// Mock data for now
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Remote Patient Monitoring Solutions",
    description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
    long_description: `
      <h3>Challenge Background</h3>
      <p>Saudi Arabia's geography presents unique challenges in healthcare delivery, with many communities living in remote areas far from major medical centers. Patients with chronic conditions in these areas often face difficulties accessing regular care and monitoring, leading to complications and preventable hospitalizations.</p>
      
      <h3>Challenge Objective</h3>
      <p>This challenge seeks innovative remote patient monitoring solutions that can bridge the geographical gap between healthcare providers and patients in remote areas of the Kingdom. The goal is to develop technologies that enable effective monitoring of chronic conditions, early intervention, and improved patient outcomes regardless of location.</p>
      
      <h3>What We're Looking For</h3>
      <ul>
        <li>Solutions that can function reliably in areas with limited connectivity</li>
        <li>User-friendly interfaces suitable for various demographics including elderly patients</li>
        <li>Integration capabilities with existing healthcare systems</li>
        <li>Secure handling of sensitive patient data</li>
        <li>Cost-effective implementation strategies</li>
        <li>Scalable approaches that can be deployed across diverse regions</li>
      </ul>
    `,
    deadline: "June 30, 2025",
    submission_deadline: "2025-06-30T23:59:59+03:00",
    category: "Digital Health",
    participants: 47,
    prize: "SAR 500,000",
    image_url: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Innovation Department",
    status: "Open",
    eligibility: "Healthcare professionals, technology innovators, startups, and established companies in the healthcare and technology sectors.",
    requirements: [
      "Solution must be applicable within Saudi healthcare system",
      "Technology must be tested for basic feasibility",
      "Proposal must include implementation plan",
      "Solutions must adhere to data privacy regulations"
    ],
    timeline: [
      { date: "March 15, 2025", event: "Challenge Launch" },
      { date: "April 30, 2025", event: "Q&A Webinar" },
      { date: "June 30, 2025", event: "Submission Deadline" },
      { date: "July 30, 2025", event: "Finalists Announced" },
      { date: "September 15, 2025", event: "Final Presentations" },
      { date: "September 30, 2025", event: "Winners Announced" }
    ]
  },
  {
    id: "2",
    title: "AI for Early Disease Detection",
    description: "Develop AI algorithms to detect early signs of diseases using existing health data from MOH facilities.",
    long_description: `
      <h3>Challenge Background</h3>
      <p>Early disease detection is crucial for improving patient outcomes and reducing healthcare costs. The Ministry of Health has accumulated vast amounts of patient data that could potentially reveal patterns indicative of disease onset before clinical symptoms appear.</p>
      
      <h3>Challenge Objective</h3>
      <p>This challenge invites innovative AI solutions that can analyze existing health data to identify early markers of disease. The goal is to develop algorithms that can flag patients at risk of developing specific conditions, enabling preventive interventions and timely treatment.</p>
      
      <h3>What We're Looking For</h3>
      <ul>
        <li>Machine learning models with high sensitivity and specificity for disease prediction</li>
        <li>Solutions that maintain patient privacy and data security</li>
        <li>Approaches that can handle diverse data types including structured and unstructured data</li>
        <li>Models that can be integrated with existing electronic health record systems</li>
        <li>Explainable AI features that provide insight into prediction factors</li>
        <li>Scalable solutions that can be deployed across the Saudi healthcare system</li>
      </ul>
    `,
    deadline: "July 15, 2025",
    submission_deadline: "2025-07-15T23:59:59+03:00",
    category: "AI & Machine Learning",
    participants: 32,
    prize: "SAR 750,000",
    image_url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Digital Transformation Office",
    status: "Open",
    eligibility: "Data scientists, AI researchers, healthcare innovators, startups, and established companies with expertise in machine learning and healthcare analytics.",
    requirements: [
      "Must use anonymized healthcare data",
      "Solution must demonstrate significant improvement over existing methods",
      "Algorithms must be explainable and transparent in their decision-making",
      "Submissions must include validation metrics and methodology",
      "Data privacy and security measures must be explicitly addressed"
    ],
    timeline: [
      { date: "April 1, 2025", event: "Challenge Launch" },
      { date: "May 15, 2025", event: "Dataset Access Provided" },
      { date: "June 1, 2025", event: "Technical Q&A Webinar" },
      { date: "July 15, 2025", event: "Submission Deadline" },
      { date: "August 15, 2025", event: "Finalists Announced" },
      { date: "September 30, 2025", event: "Final Presentations" },
      { date: "October 15, 2025", event: "Winners Announced" }
    ]
  },
  // ... other challenges
];

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const { t, language } = useLanguage();
  
  // Fetch challenge details from API with proper typing
  const { data: challenge, isLoading, error } = useQuery({
    queryKey: ['challenge', id],
    queryFn: async () => {
      // In a real app, this would be fetching from Supabase
      // const { data, error } = await supabase
      //   .from('challenges')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return new Promise<Challenge | undefined>((resolve) => {
        setTimeout(() => {
          const foundChallenge = mockChallenges.find(c => c.id === id);
          resolve(foundChallenge);
        }, 1000);
      });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg mb-8"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/4 mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />
                <Skeleton className="h-8 w-48 mb-8" />
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
              </div>
              <div className="md:w-80">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen flex flex-col bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('challenge.notFound')}</h1>
            <p className="text-gray-600 mb-8">{t('challenge.notFoundDesc')}</p>
            <Button asChild>
              <Link to="/challenges">{t('challenge.backToChallenges')}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <ChallengeHeader challenge={challenge} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNav 
            items={[{label: t('nav.challenges'), href: '/challenges'}]} 
            currentPage={challenge.title}
          />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">{t('challenge.overview')}</TabsTrigger>
                  <TabsTrigger value="requirements">{t('challenge.requirements')}</TabsTrigger>
                  <TabsTrigger value="timeline">{t('challenge.timeline')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: challenge.long_description }} />
                </TabsContent>
                
                <TabsContent value="requirements" className="space-y-6">
                  <ChallengeRequirements 
                    eligibility={challenge.eligibility} 
                    requirements={challenge.requirements} 
                  />
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-6">
                  <ChallengeTimeline timeline={challenge.timeline} />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <ChallengeSidebar challenge={challenge} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChallengeDetail;
