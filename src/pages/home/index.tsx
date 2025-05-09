
import React from 'react';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/home/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 md:py-16 bg-moh-lightGreen/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen">
                Ministry of Health Innovation Hub
              </h1>
              <p className="text-lg text-gray-700">
                Supporting and accelerating healthcare innovation in Saudi Arabia
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
