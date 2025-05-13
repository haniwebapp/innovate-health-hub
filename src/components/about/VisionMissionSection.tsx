
import { motion } from "framer-motion";
import { Lightbulb, Target, Compass } from "lucide-react";

const VisionMissionSection = () => {
  return (
    <section id="vision-mission" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium mb-4"
          >
            Our Foundation
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen"
          >
            Vision & Mission
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600"
          >
            Guiding our journey to transform healthcare through innovation and collaboration.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl border border-moh-green/10 bg-gradient-to-br from-moh-lightGreen to-white shadow-sm"
          >
            <div className="w-14 h-14 rounded-full bg-moh-green flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-moh-darkGreen">Our Vision</h3>
            
            <p className="text-gray-700 mb-4">
              To be the leading catalyst for healthcare innovation in Saudi Arabia, driving the transformation of healthcare delivery and improving health outcomes for all citizens in alignment with Vision 2030.
            </p>
            
            <div className="mt-6 pt-6 border-t border-moh-green/10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-moh-lightGreen flex items-center justify-center mr-4">
                  <Compass className="h-5 w-5 text-moh-green" />
                </div>
                <div>
                  <p className="font-medium text-moh-darkGreen">Aligned with Vision 2030</p>
                  <p className="text-sm text-gray-600">Supporting healthcare transformation goals</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl border border-moh-gold/10 bg-gradient-to-br from-moh-lightGold/30 to-white shadow-sm"
          >
            <div className="w-14 h-14 rounded-full bg-moh-gold flex items-center justify-center mb-6">
              <Lightbulb className="h-7 w-7 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-moh-darkGreen">Our Mission</h3>
            
            <p className="text-gray-700 mb-4">
              To build a vibrant healthcare innovation ecosystem that connects innovators, healthcare providers, and policymakers, providing the resources, support, and pathways needed to develop and implement transformative healthcare solutions.
            </p>
            
            <ul className="space-y-3 mt-4 text-gray-700">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-moh-gold/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-moh-gold text-xs">✓</span>
                </div>
                <span>Foster collaboration between healthcare stakeholders</span>
              </li>
              
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-moh-gold/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-moh-gold text-xs">✓</span>
                </div>
                <span>Accelerate the development and adoption of healthcare innovations</span>
              </li>
              
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-moh-gold/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-moh-gold text-xs">✓</span>
                </div>
                <span>Improve healthcare quality, accessibility, and efficiency</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
