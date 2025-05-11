
import React, { useState } from 'react';
import { PortfolioHeader } from '@/components/portfolio/PortfolioHeader';
import { PortfolioSearch } from '@/components/portfolio/PortfolioSearch';
import { PortfolioActions } from '@/components/portfolio/PortfolioActions';
import { PortfolioTabs } from '@/components/portfolio/PortfolioTabs';
import { PortfolioSummary } from '@/components/portfolio/PortfolioSummary';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';

// Mock portfolio data
const portfolioItems = [
  {
    id: 1,
    name: "MediTech Solutions",
    logo: "/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png",
    sector: "Digital Health",
    stage: "Series A",
    investmentAmount: "$1.5M",
    roi: "+32%",
    date: "Jan 2023",
    trend: "up",
    status: "active"
  },
  {
    id: 2,
    name: "GenomicAI",
    logo: "/lovable-uploads/d5f3d02d-fd0b-43f5-ba20-ca6d566850df.png",
    sector: "AI/ML",
    stage: "Seed",
    investmentAmount: "$750K",
    roi: "+18%",
    date: "Mar 2023",
    trend: "up",
    status: "active"
  },
  {
    id: 3,
    name: "SmartDiagnosis",
    logo: "/lovable-uploads/f997b965-bd17-4e6d-ba9c-af09c86b0eb0.png",
    sector: "Telehealth",
    stage: "Series B",
    investmentAmount: "$3.2M",
    roi: "+45%",
    date: "Nov 2022",
    trend: "up",
    status: "active"
  },
  {
    id: 4,
    name: "BioDevices",
    logo: "/lovable-uploads/fc6609f7-b2c9-4eb5-8a3a-6baa876025c7.png", 
    sector: "Medical Devices",
    stage: "Series A",
    investmentAmount: "$2.1M",
    roi: "-5%",
    date: "Jun 2023",
    trend: "down",
    status: "watching"
  },
  {
    id: 5,
    name: "PharmaGen",
    logo: "/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
    sector: "Biotech",
    stage: "Series C",
    investmentAmount: "$5M",
    roi: "+8%",
    date: "Feb 2023",
    trend: "stable",
    status: "active"
  }
];

export default function DashboardPortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter portfolio based on search and active tab
  const filteredPortfolio = portfolioItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && item.status === "active";
    if (activeTab === "watching") return matchesSearch && item.status === "watching";
    
    return false;
  });
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Portfolio" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investment", href: "/dashboard/investment" },
        ]}
      />
      
      <PortfolioHeader 
        title="Investment Portfolio" 
        description="Manage and track your healthcare investment portfolio" 
      />
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <PortfolioSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <PortfolioActions />
      </div>
      
      <PortfolioTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredPortfolio={filteredPortfolio}
      />
      
      <PortfolioSummary portfolioItems={portfolioItems} />
    </div>
  );
}
