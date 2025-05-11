
import { Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext"; 
import { useToast } from "@/components/ui/use-toast";

export default function InnovationCallToAction() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleInnovationClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit your innovation",
        variant: "default"
      });
      navigate("/auth/login", { state: { from: "/innovations/submit" } });
    } else {
      navigate("/dashboard");
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-r from-moh-lightGreen to-moh-lightGold">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="bg-white/30 backdrop-blur-sm p-8 rounded-xl border border-white/40 shadow-lg relative overflow-hidden"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 129, 74, 0.1), 0 10px 10px -5px rgba(0, 129, 74, 0.04)" }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-moh-green/10 rounded-full"></div>
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-moh-gold/10 rounded-full"></div>
            
            <div className="text-center mb-6 relative z-10">
              <motion.div 
                className="inline-flex mb-4 p-3 bg-gradient-to-br from-moh-green/20 to-moh-gold/20 backdrop-blur-sm rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <Sparkles size={28} className="text-moh-darkGreen" />
              </motion.div>
              
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Have an innovative healthcare solution?
              </motion.h2>
              
              <motion.p 
                className="text-gray-700 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Submit your innovation to be featured on our platform and connect with investors, 
                regulators, and potential partners across Saudi Arabia's healthcare ecosystem.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white shadow-md hover:shadow-lg transition-all"
                  onClick={handleInnovationClick}
                >
                  {user ? "Go to Dashboard" : "Submit Your Innovation"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-2 border-moh-darkGreen text-moh-darkGreen hover:bg-white/50 shadow-sm hover:shadow-md transition-all"
                >
                  Learn About the Process
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-8 p-4 bg-gradient-to-br from-moh-lightGreen to-moh-lightGold/30 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center mb-3">
                <Lightbulb size={18} className="text-moh-gold mr-2" />
                <h3 className="text-lg font-medium text-moh-darkGreen">
                  AI-Powered Innovation Marketplace
                </h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Our platform uses advanced AI to match your healthcare innovations with the right investors,
                regulatory pathways, and implementation opportunities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white/60 p-3 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Investor Matching</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-moh-green to-moh-darkGreen" style={{ width: "85%" }} />
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Regulatory Guidance</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-moh-gold to-moh-darkGold" style={{ width: "92%" }} />
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Market Analysis</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-moh-darkGreen to-moh-green" style={{ width: "78%" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
