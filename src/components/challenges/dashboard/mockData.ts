
import { Challenge, Submission } from "@/types/challenges";

export const mockChallenges: Challenge[] = [
  {
    id: "ch1",
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
    id: "ch2",
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
    id: "ch3",
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
  }
];

export const mockSubmissions: Record<string, Submission> = {
  "ch1": {
    challenge_id: "ch1",
    id: "sub1",
    title: "Remote Vital Signs Monitoring System",
    description: "AI-powered monitoring solution for chronic patients",
    status: "under-review",
    submitted_at: "2025-04-28T14:30:00+03:00",
    score: 85
  },
  "ch2": {
    challenge_id: "ch2",
    id: "sub2",
    title: "Early Disease Detection ML Algorithm",
    description: "Machine learning model for early detection of chronic diseases",
    status: "completed",
    submitted_at: "2025-04-15T09:45:00+03:00",
    score: 92
  }
};
