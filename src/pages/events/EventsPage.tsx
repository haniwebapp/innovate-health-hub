
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { EventsHero } from "@/components/events/EventsHero";
import { FeaturedEvents } from "@/components/events/FeaturedEvents";
import { UpcomingEvents } from "@/components/events/UpcomingEvents";
import { PastEvents } from "@/components/events/PastEvents";
import { EventsFilter } from "@/components/events/EventsFilter";

const EventsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <EventsHero />
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <EventsFilter />
            <FeaturedEvents />
            <UpcomingEvents />
            <PastEvents />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;
