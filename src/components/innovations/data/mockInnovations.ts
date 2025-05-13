
import { Innovation } from "@/types/innovations";

// Updated mock data for innovations with the correct type format
export const mockInnovations: Innovation[] = [
  {
    id: "1",
    title: "AI-Powered Diagnostic Assistant",
    description: "Machine learning tool that helps doctors diagnose complex conditions with higher accuracy. The system uses pattern recognition and deep learning to identify potential conditions based on symptoms, medical history, and diagnostic tests, offering suggestions with probability ratings.",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Digital Health",
    tags: ["AI", "Diagnostics", "Machine Learning"],
    rating: 4.8,
    status: "Validated",
    createdAt: "2024-04-15",
    organization: "HealthTech Solutions",
    website: "https://healthtech-solutions.example",
    contact: "info@healthtechsolutions.example",
    aiMatchScore: 94,
    impactMetrics: {
      potentialReach: 50000,
      costEfficiency: 78,
      implementationTime: 3,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["ISO 13485", "CE Mark"],
      pendingApprovals: [],
    }
  },
  {
    id: "2",
    title: "Remote Patient Monitoring Platform",
    description: "Comprehensive system for monitoring patients at home with real-time data transmission to healthcare providers. The platform connects to various medical devices and wearables to track vital signs, medication adherence, and other health metrics with alert systems for critical situations.",
    imageUrl: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Telehealth",
    tags: ["Remote Care", "IoT", "Patient Monitoring"],
    rating: 4.5,
    status: "Scaling",
    createdAt: "2024-02-20",
    organization: "TeleCare Systems",
    website: "https://telecare-systems.example",
    contact: "support@telecaresystems.example",
    aiMatchScore: 87,
    impactMetrics: {
      potentialReach: 120000,
      costEfficiency: 65,
      implementationTime: 6,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["HIPAA Compliant", "FDA Approved"],
      pendingApprovals: [],
    }
  },
  {
    id: "3",
    title: "Smart Medication Dispenser",
    description: "Device that helps patients adhere to complex medication regimens with reminders and monitoring. The smart dispenser automatically sorts medications, provides timely alerts, tracks adherence, and can notify caregivers or healthcare providers when doses are missed.",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "MedTech",
    tags: ["IoT", "Medication Management", "Elderly Care"],
    rating: 4.2,
    status: "New",
    createdAt: "2024-05-01",
    organization: "CareTech Innovations",
    website: "https://caretech.example",
    contact: "info@caretech.example",
    aiMatchScore: 76,
    regulatoryStatus: {
      compliant: false,
      certifications: [],
      pendingApprovals: ["FDA Clearance", "CE Mark"],
    }
  },
  {
    id: "4",
    title: "VR Therapy for Chronic Pain",
    description: "Virtual reality platform designed to provide alternative pain management strategies without medication. This immersive therapy uses distraction techniques, guided meditation, and cognitive behavioral therapy principles delivered through engaging virtual environments to help patients manage chronic pain conditions.",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Therapeutics",
    tags: ["VR", "Pain Management", "Digital Therapeutics"],
    rating: 4.6,
    status: "Validated",
    createdAt: "2024-03-10",
    organization: "Immersive Health",
    website: "https://immersive-health.example",
    contact: "contact@immersivehealth.example",
    aiMatchScore: 82,
    impactMetrics: {
      potentialReach: 75000,
      costEfficiency: 89,
      implementationTime: 2,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["FDA Breakthrough Device"],
      pendingApprovals: ["Health Canada Approval"],
    }
  },
  {
    id: "5",
    title: "Portable Ultrasound Device",
    description: "Affordable handheld ultrasound that connects to smartphones for use in remote locations. This pocket-sized device brings advanced imaging capabilities to underserved areas, allowing for preliminary diagnostics in locations with limited access to healthcare facilities.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "MedTech",
    tags: ["Ultrasound", "Portable", "Rural Healthcare"],
    rating: 4.7,
    status: "Established",
    createdAt: "2023-11-05",
    organization: "MobileMed Technologies",
    website: "https://mobilemed.example",
    contact: "sales@mobilemed.example",
    impactMetrics: {
      potentialReach: 500000,
      costEfficiency: 92,
      implementationTime: 1,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["FDA Approved", "CE Mark", "ISO 13485"],
      pendingApprovals: [],
    }
  },
  {
    id: "6",
    title: "Blockchain for Medical Records",
    description: "Secure system for managing and sharing medical records across healthcare providers using blockchain technology. The platform ensures data integrity, patient ownership of records, immutable audit trails, and secure permissioned access for healthcare providers while maintaining compliance with privacy regulations.",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Healthcare IT",
    tags: ["Blockchain", "Data Security", "Health Records"],
    rating: 4.3,
    status: "Scaling",
    createdAt: "2024-01-15",
    organization: "SecureHealth Chain",
    website: "https://securehealthchain.example",
    contact: "info@securehealthchain.example",
    aiMatchScore: 89,
    impactMetrics: {
      potentialReach: 1000000,
      costEfficiency: 74,
      implementationTime: 8,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["HIPAA Compliant", "GDPR Compliant"],
      pendingApprovals: [],
    }
  }
];
