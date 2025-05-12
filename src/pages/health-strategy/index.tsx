
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { LayoutDashboard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HealthStrategyPage = () => {
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
                  <LayoutDashboard className="h-6 w-6 text-moh-green mr-2" />
                  <span className="text-moh-darkGreen font-medium">Health Sector Strategy</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-moh-darkGreen">
                  Saudi Healthcare Sector Strategy
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Understand the strategic initiatives, policies, and frameworks guiding the transformation of 
                  Saudi Arabia's healthcare sector.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                    <Link to="/policy">View Policy Documents</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20" asChild>
                    <Link to="/knowledge-hub">Access Resources</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Strategic Pillars */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-moh-darkGreen">
              Strategic Pillars of Saudi Healthcare
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4 text-moh-green font-bold">01</div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Care Model Transformation</h3>
                <p className="text-gray-600">Redesigning healthcare delivery to be more patient-centered, integrated, and outcome-focused across the continuum of care.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4 text-moh-green font-bold">02</div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Health Financing Reform</h3>
                <p className="text-gray-600">Implementing sustainable financing models to ensure equitable access to high-quality healthcare services.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4 text-moh-green font-bold">03</div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Health Innovation</h3>
                <p className="text-gray-600">Fostering innovation in healthcare delivery, technology, and services to address current and future healthcare challenges.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4 text-moh-green font-bold">04</div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Governance Enhancement</h3>
                <p className="text-gray-600">Strengthening healthcare governance to improve accountability, transparency, and decision-making.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4 text-moh-green font-bold">05</div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Workforce Development</h3>
                <p className="text-gray-600">Building healthcare workforce capacity and capabilities to meet current and future healthcare needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4 text-moh-green font-bold">06</div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Digital Health</h3>
                <p className="text-gray-600">Leveraging digital technologies to enhance healthcare delivery, accessibility, and efficiency.</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                <Link to="/dashboard/strategy">
                  Access Detailed Strategy Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthStrategyPage;
