
export interface Innovation {
  id: string;
  title: string;
  image?: string;
  category: string;
  trl: number; // Technology Readiness Level
  featured: boolean;
  summary: string;
}

// Sample data - this would come from an API in a real application
export const innovationsMock: Innovation[] = [{
  id: "1",
  title: "AI-Powered Diabetes Monitoring",
  category: "Digital Health",
  trl: 7,
  featured: true,
  image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  summary: "Continuous glucose monitoring with AI-powered insights and predictive analytics."
}, {
  id: "2",
  title: "Remote Patient Monitoring System",
  category: "Telehealth",
  trl: 8,
  featured: true,
  image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  summary: "End-to-end platform for remote patient monitoring with integrated vital signs tracking."
}, {
  id: "3",
  title: "Smart Hospital Management Suite",
  category: "Healthcare IT",
  trl: 6,
  featured: false,
  image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  summary: "Comprehensive hospital management system with resource optimization algorithms."
}, {
  id: "4",
  title: "Portable Diagnostic Device",
  category: "MedTech",
  trl: 5,
  featured: false,
  image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  summary: "Handheld device capable of running multiple diagnostic tests with cloud connectivity."
}, {
  id: "5",
  title: "Mental Health Tracking App",
  category: "Digital Health",
  trl: 9,
  featured: true,
  image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  summary: "App for tracking mental well-being with personalized recommendations and professional support."
}];

// Filter options
export const categories = ["All", "Digital Health", "Telehealth", "MedTech", "Healthcare IT"];
export const trlLevels = ["All", "Early Stage (1-3)", "Mid Stage (4-6)", "Late Stage (7-9)"];
