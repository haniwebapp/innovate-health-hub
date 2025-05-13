
export interface Innovation {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  innovator: string;
  image: string;
  impact: string;
  date: string;
}

// Mock innovations data
export const mockInnovations = [
  {
    id: "1",
    title: "AI-Powered Diagnostic Assistant",
    description: "Machine learning platform that assists healthcare providers in detecting abnormalities in medical imaging with greater accuracy and speed.",
    category: "AI & Machine Learning",
    stage: "Growth",
    innovator: "Medical Vision Technologies",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "25% improvement in diagnostic accuracy",
    date: "June 2023"
  },
  {
    id: "2",
    title: "Remote Patient Monitoring Platform",
    description: "Comprehensive system for tracking patient vital signs and health metrics remotely, enabling early intervention and reducing hospital readmissions.",
    category: "Digital Health",
    stage: "Scaling",
    innovator: "HealthConnect Systems",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "30% reduction in hospital readmissions",
    date: "March 2023"
  },
  {
    id: "3",
    title: "Non-Invasive Glucose Monitor",
    description: "Revolutionary device that monitors blood glucose levels without needles, improving quality of life for diabetes patients.",
    category: "Medical Device",
    stage: "Early Growth",
    innovator: "DiabCare Innovations",
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "Improved compliance with glucose monitoring by 40%",
    date: "August 2023"
  },
  {
    id: "4",
    title: "Healthcare Supply Chain Solution",
    description: "Blockchain-based platform that enhances transparency and efficiency in healthcare supply chains, reducing waste and ensuring authenticity.",
    category: "Supply Chain",
    stage: "Pilot",
    innovator: "MedChain Solutions",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "15% reduction in supply chain costs",
    date: "October 2023"
  },
  {
    id: "5",
    title: "Mental Health Support App",
    description: "Mobile application providing personalized mental health resources, exercises, and connection to professional support when needed.",
    category: "Mental Health",
    stage: "Scaling",
    innovator: "MindWell Technologies",
    image: "https://images.unsplash.com/photo-1471283710737-7a6172042d6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "Reached over 50,000 users in first year",
    date: "February 2023"
  },
  {
    id: "6",
    title: "Smart Hospital Management System",
    description: "Integrated platform for optimizing hospital operations, resource allocation, and patient flow to improve efficiency and care quality.",
    category: "Hospital Management",
    stage: "Growth",
    innovator: "HealthOps Solutions",
    image: "https://images.unsplash.com/photo-1516549655645-e9218bcb6352?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "20% improvement in hospital operational efficiency",
    date: "April 2023"
  }
];

// Categories for filtering
export const categories = [
  "All Categories",
  "AI & Machine Learning",
  "Digital Health",
  "Medical Device",
  "Supply Chain",
  "Mental Health",
  "Hospital Management"
];

// Innovation stages
export const stages = [
  "All Stages",
  "Pilot",
  "Early Growth",
  "Growth",
  "Scaling"
];

// Featured innovation data
export const featuredInnovation = {
  title: "AI-Powered Diagnostic Assistant",
  description: "This breakthrough platform uses advanced machine learning algorithms to analyze medical images and assist healthcare providers in detecting abnormalities with greater accuracy and speed than traditional methods.",
  impact: [
    "25% improvement in diagnostic accuracy",
    "40% reduction in diagnosis time",
    "Supports 15+ types of medical imaging"
  ],
  image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  innovator: "Medical Vision Technologies",
  category: "AI & Machine Learning"
};
