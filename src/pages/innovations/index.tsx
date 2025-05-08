
import React from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";

export default function InnovationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-moh-darkGreen mb-4">Healthcare Innovations</h1>
            <p className="text-lg text-moh-darkGreen/80 max-w-3xl mx-auto mb-8">
              Discover cutting-edge healthcare innovations from across the Kingdom that are transforming patient care and healthcare delivery.
            </p>
            
            {/* Placeholder content */}
            <div className="mt-12 text-center py-16">
              <h2 className="text-2xl font-semibold text-moh-green mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">
                We're currently curating the best healthcare innovations from across the Kingdom.
                <br />Check back soon to discover transformative healthcare solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
