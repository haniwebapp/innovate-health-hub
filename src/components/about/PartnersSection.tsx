
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ParallaxCard } from "@/components/animations/ParallaxCard";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PartnersSection() {
  const { t } = useLanguage();
  
  // Strategic partners data with healthcare-related images instead of logos
  const partners = [
    { 
      name: "Ministry of Health", 
      image: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8545?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Government",
      description: "Leading healthcare policy and regulation across Saudi Arabia."
    },
    { 
      name: "King Salman Medical City",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Healthcare Provider",
      description: "State-of-the-art medical facilities providing advanced healthcare services."
    },
    { 
      name: "Saudi Digital Health Authority",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Government",
      description: "Driving digital transformation initiatives in healthcare."
    },
    { 
      name: "King Abdulaziz University Hospital",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Academic Medical Center",
      description: "Combining advanced research with excellent patient care."
    },
    { 
      name: "Saudi Health Council",
      image: "https://images.unsplash.com/photo-1516549655076-995df61b710a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Government",
      description: "Coordinating healthcare services and development across the Kingdom."
    },
    { 
      name: "KAUST",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Research Institution",
      description: "Leading research and innovation in healthcare and biotechnology."
    },
    { 
      name: "KACST",
      image: "https://images.unsplash.com/photo-1581093806997-124204d9fa8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Research Institution",
      description: "Advancing scientific research and technological innovation."
    },
    { 
      name: "Ministry of Investment", 
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Government",
      description: "Facilitating investments in healthcare and life sciences sectors."
    },
    { 
      name: "NUPCO",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Healthcare Supply",
      description: "Ensuring reliable supply chain for healthcare products and medicines."
    },
    { 
      name: "Saudi Commission for Health Specialties", 
      image: "https://images.unsplash.com/photo-1631815586615-61935667f9ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Accreditation Body",
      description: "Setting standards for healthcare professionals and education."
    },
  ];
  
  return (
    <motion.section 
      className="py-16 bg-gradient-to-b from-white via-moh-lightGreen/10 to-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            className="w-16 h-16 rounded-full bg-moh-lightGreen flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <Users size={28} className="text-moh-darkGreen" />
          </motion.div>
          
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-moh-darkGreen mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('about.partners')}
          </motion.h2>
          
          <motion.div 
            className="h-1 w-20 bg-moh-green rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <motion.p 
            className="text-center text-gray-600 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Collaboration is at the heart of our healthcare innovation ecosystem. We're proud to partner 
            with leading organizations across Saudi Arabia to transform healthcare delivery and outcomes.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partners.map((partner, i) => (
            <motion.div 
              key={i} 
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ParallaxCard 
                className="h-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                priority={i < 3 ? 'high' : i < 6 ? 'medium' : 'low'}
              >
                <div className="relative h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={partner.image} 
                      alt={`${partner.name}`} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-xs font-medium text-moh-darkGreen px-2 py-1 rounded-full">
                      {partner.category}
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-moh-darkGreen text-lg mb-2">{partner.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{partner.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Strategic Partner</span>
                      <motion.button 
                        className="text-sm text-moh-green font-medium flex items-center gap-1"
                        whileHover={{ x: 3 }}
                      >
                        Learn more
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </ParallaxCard>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            variant="outline"
            className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20 px-6 py-3 rounded-full font-medium"
            asChild
          >
            <Link to="/about/partners">
              View All Partners
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
