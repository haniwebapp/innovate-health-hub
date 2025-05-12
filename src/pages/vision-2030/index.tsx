
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Goal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Vision2030Page = () => {
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
                  <Goal className="h-6 w-6 text-moh-green mr-2" />
                  <span className="text-moh-darkGreen font-medium">Vision 2030 Goals</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-moh-darkGreen">
                  Saudi Vision 2030 Healthcare Goals
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Learn about Saudi Arabia's Vision 2030 healthcare transformation goals and how innovation 
                  plays a crucial role in achieving these ambitious objectives.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                    <Link to="/policy">View Healthcare Policies</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20" asChild>
                    <Link to="/innovations">Explore Innovations</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Vision 2030 Healthcare Goals */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-moh-darkGreen">
              Key Healthcare Goals for Vision 2030
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Improving Healthcare Quality</h3>
                <p className="text-gray-600 mb-4">Enhance the quality of healthcare services to meet international standards and improve patient outcomes across the Kingdom.</p>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-moh-green rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">65% progress toward 2030 goal</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Expanding Access to Services</h3>
                <p className="text-gray-600 mb-4">Increase healthcare coverage and improve equitable access to healthcare services across all regions of Saudi Arabia.</p>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-moh-green rounded-full" style={{ width: '72%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">72% progress toward 2030 goal</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Digital Transformation</h3>
                <p className="text-gray-600 mb-4">Implement advanced digital solutions to enhance efficiency, reduce costs, and improve patient experiences.</p>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-moh-green rounded-full" style={{ width: '58%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">58% progress toward 2030 goal</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Private Sector Participation</h3>
                <p className="text-gray-600 mb-4">Increase private sector participation in healthcare delivery and investment to diversify the healthcare ecosystem.</p>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-moh-green rounded-full" style={{ width: '48%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">48% progress toward 2030 goal</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                <Link to="/policy">
                  View Detailed Vision 2030 Healthcare Strategy
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

export default Vision2030Page;
