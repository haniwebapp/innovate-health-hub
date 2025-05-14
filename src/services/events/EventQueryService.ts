
import { Event } from '@/types/events';

// Mock data for events
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Healthcare AI Innovation Summit",
    description: "Join us for a day of inspiring talks and workshops about the latest AI innovations transforming healthcare in Saudi Arabia and beyond. This summit brings together leading researchers, clinicians, and industry experts to showcase cutting-edge applications and discuss the future of AI in healthcare.",
    eventType: "Conference",
    startDate: new Date("2025-06-15T09:00:00"),
    endDate: new Date("2025-06-15T17:00:00"),
    location: "King Fahd Medical City, Riyadh",
    isVirtual: false,
    category: "Healthcare AI",
    presenter: "Dr. Mohammed Al-Yami",
    presenterTitle: "Director of AI Research",
    presenterOrganization: "King Fahd Medical City",
    featured: true,
    registrationUrl: "https://example.com/register",
    status: "upcoming",
    tags: ["AI", "Healthcare", "Innovation"]
  },
  {
    id: "2",
    title: "Digital Health Transformation Workshop",
    description: "An intensive workshop designed for healthcare professionals looking to implement digital transformation strategies in their organizations. Learn practical approaches to implementing electronic health records, telehealth solutions, and patient engagement platforms.",
    eventType: "Workshop",
    startDate: new Date("2025-07-10T10:00:00"),
    endDate: new Date("2025-07-10T15:30:00"),
    location: "Jeddah Medical Conference Center",
    isVirtual: false,
    category: "Digital Health",
    featured: true,
    presenter: "Dr. Sarah Al-Otaibi",
    presenterTitle: "Digital Health Advisor",
    presenterOrganization: "Ministry of Health",
    registrationUrl: "https://example.com/register",
    status: "upcoming",
    tags: ["Digital Health", "EHR", "Telehealth"]
  },
  {
    id: "3",
    title: "Medical Technology Innovation Webinar",
    description: "A virtual event showcasing the latest medical devices and technologies being developed within Saudi Arabia's growing healthtech ecosystem. Join virtually to see demos and hear from founders about their journeys and innovations.",
    eventType: "Webinar",
    startDate: new Date("2025-05-25T14:00:00"),
    endDate: new Date("2025-05-25T16:00:00"),
    isVirtual: true,
    eventUrl: "https://example.com/webinar",
    category: "Medical Technology",
    featured: true,
    presenter: "Multiple Speakers",
    registrationUrl: "https://example.com/register",
    status: "upcoming",
    tags: ["MedTech", "Innovation", "Startups"]
  },
  {
    id: "4",
    title: "Healthcare Policy Forum 2025",
    description: "A forum discussing recent and upcoming healthcare policy changes and their impact on innovation and healthcare delivery in Saudi Arabia. This event brings together policy makers, healthcare leaders, and innovators to discuss the regulatory landscape.",
    eventType: "Forum",
    startDate: new Date("2025-08-05T09:00:00"),
    endDate: new Date("2025-08-05T17:00:00"),
    location: "Four Seasons Hotel, Riyadh",
    isVirtual: false,
    category: "Healthcare Policy",
    featured: false,
    registrationUrl: "https://example.com/register",
    status: "upcoming",
    tags: ["Policy", "Regulation", "Healthcare"]
  },
  {
    id: "5",
    title: "Mental Health Innovation Hackathon",
    description: "A weekend-long hackathon focused on developing innovative solutions for mental health challenges. Teams will work together to create prototypes addressing specific challenges in mental health care delivery and accessibility.",
    eventType: "Hackathon",
    startDate: new Date("2025-06-20T09:00:00"),
    endDate: new Date("2025-06-22T18:00:00"),
    location: "King Abdullah University of Science and Technology",
    isVirtual: false,
    category: "Mental Health",
    featured: false,
    registrationUrl: "https://example.com/register",
    status: "upcoming",
    tags: ["Mental Health", "Hackathon", "Innovation"]
  },
  {
    id: "6",
    title: "Genomics and Precision Medicine Conference",
    description: "An international conference on the latest advances in genomics and precision medicine, with a focus on applications in the Saudi population. Learn about cutting-edge research and clinical applications.",
    eventType: "Conference",
    startDate: new Date("2025-09-12T08:30:00"),
    endDate: new Date("2025-09-14T17:00:00"),
    location: "King Abdullah International Medical Research Center",
    isVirtual: false,
    category: "Precision Medicine",
    featured: false,
    registrationUrl: "https://example.com/register",
    status: "upcoming",
    tags: ["Genomics", "Precision Medicine", "Research"]
  },
  {
    id: "7",
    title: "Healthcare Investor Pitching Day",
    description: "An opportunity for healthcare startups to pitch their innovations to a panel of investors and industry experts. Selected startups will compete for funding and partnership opportunities.",
    eventType: "Pitch Event",
    startDate: new Date("2025-07-25T13:00:00"),
    endDate: new Date("2025-07-25T18:00:00"),
    location: "Riyadh Front Exhibition Center",
    isVirtual: false,
    category: "Investment",
    featured: false,
    registrationUrl: "https://example.com/register",
    status: "upcoming",
    tags: ["Investment", "Startups", "Pitching"]
  },
  {
    id: "8",
    title: "Vision 2030 Healthcare Achievements Showcase",
    description: "A special event highlighting the progress made in healthcare transformation as part of Vision 2030. Government officials and healthcare leaders will present key achievements and future plans.",
    eventType: "Showcase",
    startDate: new Date("2024-12-10T10:00:00"),
    endDate: new Date("2024-12-10T16:00:00"),
    location: "Ministry of Health Auditorium",
    isVirtual: true,
    eventUrl: "https://example.com/livestream",
    category: "Vision 2030",
    featured: false,
    status: "completed",
    recordingUrl: "https://example.com/recording",
    tags: ["Vision 2030", "Healthcare Transformation"]
  },
  {
    id: "9",
    title: "Medical Education Innovation Summit",
    description: "A summit focused on innovations in medical education, including simulation technologies, immersive learning, and competency-based education models for healthcare professionals in Saudi Arabia.",
    eventType: "Summit",
    startDate: new Date("2024-11-15T09:00:00"),
    endDate: new Date("2024-11-15T17:30:00"),
    location: "King Saud University Medical City",
    isVirtual: false,
    category: "Medical Education",
    featured: false,
    status: "completed",
    recordingUrl: "https://example.com/recording",
    tags: ["Medical Education", "Simulation", "Innovation"]
  },
  {
    id: "10",
    title: "Digital Health Ethics Panel Discussion",
    description: "A panel discussion exploring the ethical dimensions of digital health technologies, including data privacy, consent, algorithmic bias, and equitable access to digital health solutions.",
    eventType: "Panel Discussion",
    startDate: new Date("2024-10-20T14:00:00"),
    endDate: new Date("2024-10-20T16:30:00"),
    isVirtual: true,
    eventUrl: "https://example.com/panel",
    category: "Ethics",
    featured: false,
    status: "completed",
    recordingUrl: "https://example.com/recording",
    tags: ["Ethics", "Digital Health", "Data Privacy"]
  }
];

export class EventQueryService {
  static getAllEvents(): Promise<Event[]> {
    return Promise.resolve(mockEvents);
  }

  static getUpcomingEvents(limit?: number): Promise<Event[]> {
    const upcoming = mockEvents.filter(event => 
      event.status === 'upcoming' || event.status === 'ongoing'
    );
    return Promise.resolve(limit ? upcoming.slice(0, limit) : upcoming);
  }

  static getPastEvents(limit?: number): Promise<Event[]> {
    const past = mockEvents.filter(event => 
      event.status === 'completed' || event.status === 'cancelled'
    );
    return Promise.resolve(limit ? past.slice(0, limit) : past);
  }

  static getFeaturedEvents(limit: number = 3): Promise<Event[]> {
    const featured = mockEvents.filter(event => event.featured);
    return Promise.resolve(featured.slice(0, limit));
  }
  
  static getEventById(id: string): Promise<Event | null> {
    const event = mockEvents.find(event => event.id === id);
    return Promise.resolve(event || null);
  }
}
