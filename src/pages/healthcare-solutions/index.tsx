
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Hospital, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HealthcareSolutionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-moh-lightGreen/50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-70 rounded-full mb-4">
                  <Hospital className="h-6 w-6 text-moh-green mr-2" />
                  <span className="text-moh-darkGreen font-medium">Healthcare Solutions</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-moh-darkGreen">
                  Explore Innovative Healthcare Solutions
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Discover cutting-edge innovations transforming healthcare in Saudi Arabia and supporting Vision 2030 healthcare goals.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                    <Link to="/innovations">Browse Innovations</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20" asChild>
                    <Link to="/knowledge-hub">Access Knowledge Hub</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Placeholder for solutions categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-moh-darkGreen">
              Healthcare Solution Categories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Digital Health Platforms",
                  description: "Patient-centered digital solutions that enhance access and quality of care",
                  link: "/innovations"
                },
                {
                  title: "Medical Devices",
                  description: "Innovative medical devices addressing critical healthcare challenges",
                  link: "/innovations"
                },
                {
                  title: "Healthcare Services",
                  description: "Novel service models enhancing healthcare delivery and efficiency",
                  link: "/innovations"
                },
                {
                  title: "Pharmaceutical Innovations",
                  description: "Breakthrough medications and treatments for enhanced patient outcomes",
                  link: "/innovations"
                },
                {
                  title: "Healthcare AI Applications",
                  description: "Artificial intelligence solutions transforming diagnostics and care",
                  link: "/innovations"
                },
                {
                  title: "Healthcare Infrastructure",
                  description: "Advanced facilities and systems for modern healthcare delivery",
                  link: "/innovations"
                }
              ].map((solution, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-moh-darkGreen">{solution.title}</h3>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={solution.link}>
                        Explore
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthcareSolutionsPage;
