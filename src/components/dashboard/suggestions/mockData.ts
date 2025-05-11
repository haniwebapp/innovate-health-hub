
import { AISuggestion } from "./SuggestionItem";

// Mock AI suggestions - in a real app, these would be fetched from an API
export const defaultSuggestions: AISuggestion[] = [
  {
    id: '1',
    text: 'Complete your profile to improve investor matching by 40%',
    link: '/dashboard/profile',
    linkText: 'Update Profile',
    priority: 'high',
    isNew: true,
    icon: 'shield'
  },
  {
    id: '2',
    text: 'The "Digital Health Solutions" challenge closes in 3 days',
    link: '/challenges/digital-health',
    linkText: 'Submit Now',
    priority: 'high',
    icon: 'clock'
  },
  {
    id: '3',
    text: 'Your innovation has received 5 new views since yesterday',
    link: '/dashboard/innovations',
    linkText: 'View Analytics',
    priority: 'medium',
    icon: 'lightbulb'
  },
  {
    id: '4',
    text: 'New funding opportunity matches your "AI Diagnostics" innovation',
    link: '/investment',
    linkText: 'Explore Funding',
    priority: 'medium',
    icon: 'shield'
  },
  {
    id: '5',
    text: 'Review new regulatory guidelines for medical devices',
    link: '/dashboard/regulatory',
    linkText: 'View Guidelines',
    priority: 'medium',
    icon: 'lightbulb'
  },
  {
    id: '6',
    text: 'Connect with 3 innovators working in similar fields',
    link: '/dashboard/collaboration',
    linkText: 'View Connections',
    priority: 'low',
    icon: 'lightbulb'
  },
  {
    id: '7',
    text: 'Update your innovation description for better investor matching',
    link: '/dashboard/innovations',
    linkText: 'Edit Innovation',
    priority: 'low',
    icon: 'shield'
  }
];
