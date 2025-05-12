
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollFadeIn } from '@/components/animations/ScrollFadeIn';
import { Calendar, Users, MapPin, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const EventsSection = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      title: "Digital Health Innovation Summit",
      date: "June 15-16, 2025",
      location: "Riyadh, King Fahd Medical City",
      attendees: "500+ expected",
      type: "Conference",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Healthcare AI Workshop Series",
      date: "July 8-10, 2025",
      location: "Jeddah, King Abdulaziz University",
      attendees: "200+ expected",
      type: "Workshop",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "MedTech Investor Networking",
      date: "August 3, 2025",
      location: "KAUST, Thuwal",
      attendees: "150+ expected",
      type: "Networking",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="text-moh-green font-semibold text-sm uppercase tracking-wider">Connect & Learn</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Healthcare Innovation Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our community at these upcoming events focused on healthcare innovation, networking, and knowledge sharing.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white text-moh-green font-medium">
                    {event.type}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-moh-green transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarDays className="h-5 w-5 text-moh-green mr-2" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 text-moh-green mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 text-moh-green mr-2" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate("/dashboard/collaboration/events")}
                  variant="outline"
                  className="w-full mt-2 border-moh-green text-moh-green hover:bg-moh-green hover:text-white"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-moh-lightGreen rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Host Your Event</h3>
              <p className="text-gray-600 mb-6">
                Partner with the Ministry of Health Innovation Platform to host your healthcare innovation event and reach the entire ecosystem of innovators, investors, and healthcare providers.
              </p>
              <Button 
                onClick={() => navigate("/dashboard/collaboration/events")} 
                className="bg-moh-green hover:bg-moh-darkGreen text-white"
              >
                Submit Event Proposal
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg text-center shadow-sm">
                <Calendar className="h-8 w-8 text-moh-green mx-auto mb-2" />
                <p className="font-semibold">30+ Events</p>
                <p className="text-sm text-gray-500">Annual Calendar</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg text-center shadow-sm">
                <Users className="h-8 w-8 text-moh-green mx-auto mb-2" />
                <p className="font-semibold">10,000+</p>
                <p className="text-sm text-gray-500">Attendees</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg text-center shadow-sm">
                <MapPin className="h-8 w-8 text-moh-green mx-auto mb-2" />
                <p className="font-semibold">12+ Cities</p>
                <p className="text-sm text-gray-500">Across KSA</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg text-center shadow-sm">
                <Calendar className="h-8 w-8 text-moh-green mx-auto mb-2" />
                <p className="font-semibold">4 Major</p>
                <p className="text-sm text-gray-500">Annual Conferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
