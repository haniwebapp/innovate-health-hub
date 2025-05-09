
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ParallaxCard } from "@/components/animations/ParallaxCard";
import { GroupIcon } from "lucide-react";

export default function PartnersSection() {
  const { t } = useLanguage();
  
  // Strategic partners data with healthcare-related images instead of logos
  const partners = [
    { 
      name: "Ministry of Health", 
      image: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8545?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Government"
    },
    { 
      name: "King Salman Medical City",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Healthcare Provider"
    },
    { 
      name: "Saudi Digital Health Authority",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Government"
    },
    { 
      name: "King Abdulaziz University Hospital",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Academic Medical Center"
    },
    { 
      name: "Saudi Health Council",
      image: "https://images.unsplash.com/photo-1516549655076-995df61b710a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Government"
    },
    { 
      name: "KAUST",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Research Institution"
    },
    { 
      name: "KACST",
      image: "https://images.unsplash.com/photo-1581093806997-124204d9fa8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Research Institution"
    },
    { 
      name: "Ministry of Investment", 
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Government"
    },
    { 
      name: "NUPCO",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Healthcare Supply"
    },
    { 
      name: "Saudi Commission for Health Specialties", 
      image: "https://images.unsplash.com/photo-1631815586615-61935667f9ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Accreditation Body"
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
            <GroupIcon size={28} className="text-moh-darkGreen" />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-center text-moh-darkGreen">
            <span className="relative">
              {t('about.partners')}
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-1 bg-moh-green rounded-full"
                initial={{ width: 0, x: "50%" }}
                whileInView={{ width: "100%", x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </span>
          </h2>
          
          <p className="text-center text-gray-600 mt-4 max-w-2xl">
            Collaboration is at the heart of our healthcare innovation ecosystem. We're proud to partner with leading organizations across Saudi Arabia.
          </p>
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
              <ParallaxCard className="h-full overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
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
                    <h3 className="font-semibold text-moh-darkGreen mb-1">{partner.name}</h3>
                    <div className="mt-auto pt-3 flex items-center justify-between">
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
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-moh-green rounded-full text-moh-green font-medium hover:bg-moh-lightGreen/20 transition-colors">
            View All Partners
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
