
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, HeartPulse, Search, Users, Lightbulb } from "lucide-react";

export function InvestmentCTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Healthcare Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">Investment?</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-purple-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join our growing community of healthcare innovators and investors to accelerate the future of healthcare in Saudi Arabia.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
            variants={itemVariants}
          >
            <div className="bg-purple-600/50 h-14 w-14 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Find Opportunities</h3>
            <p className="text-purple-200">
              Discover curated funding opportunities and investors aligned with your healthcare innovation.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
            variants={itemVariants}
          >
            <div className="bg-purple-600/50 h-14 w-14 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Connect & Collaborate</h3>
            <p className="text-purple-200">
              Build meaningful relationships with investors, startups, and healthcare stakeholders.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
            variants={itemVariants}
          >
            <div className="bg-purple-600/50 h-14 w-14 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HeartPulse className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Transform Healthcare</h3>
            <p className="text-purple-200">
              Drive meaningful change in healthcare delivery and patient outcomes across Saudi Arabia.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-none"
              size="lg"
              asChild
            >
              <Link to="/dashboard/investment">
                Access Investment Hub
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              size="lg"
              asChild
            >
              <Link to="/contact">
                Get Investment Support
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-purple-300 mr-2" />
            <p className="text-purple-300 text-sm">
              Investment hub is aligned with Saudi Arabia's Vision 2030 healthcare transformation goals
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
