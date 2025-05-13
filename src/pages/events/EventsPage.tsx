
import React from 'react';
import EventsHero from '@/components/events/EventsHero';
import EventsFilter from '@/components/events/EventsFilter';
import UpcomingEvents from '@/components/events/UpcomingEvents';
import PastEvents from '@/components/events/PastEvents';
import FeaturedEvents from '@/components/events/FeaturedEvents';
import EventRecommendations from '@/components/events/EventRecommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/home/Footer';

export default function EventsPage() {
  return (
    <>
      <Navbar />
      
      <main>
        <EventsHero />
        
        <div className="container mx-auto px-4 py-12">
          <FeaturedEvents />
          
          <div className="mt-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                Healthcare Innovation Events
              </h2>
              <EventsFilter />
            </div>
            
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <ScrollArea className="h-full max-h-[800px] pr-4">
                  <UpcomingEvents />
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="past">
                <ScrollArea className="h-full max-h-[800px] pr-4">
                  <PastEvents />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-20">
            <EventRecommendations />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
