
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function JoinCommunitySection() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-moh-lightGreen to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">
            Join Our Innovation Community
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700">
            Be part of the healthcare transformation journey in Saudi Arabia. Connect with innovators, investors, and healthcare professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
              asChild
            >
              <Link to="/auth/register">
                Register Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              className="border border-moh-green text-moh-green hover:bg-moh-lightGreen px-6 py-3 rounded-md font-medium"
              variant="outline"
              asChild
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
