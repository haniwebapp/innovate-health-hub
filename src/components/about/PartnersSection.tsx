
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const { t } = useLanguage();
  
  // Strategic partners data with real logos
  const partners = [
    { 
      name: "Ministry of Health", 
      logo: "/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png"
    },
    { 
      name: "King Salman Medical City",
      logo: "/lovable-uploads/5993dbad-5475-4d1f-b16c-a18b49bdb942.png"
    },
    { 
      name: "Saudi Digital Health Authority",
      logo: "/lovable-uploads/4b75072f-e048-410c-8071-da579732a493.png"
    },
    { 
      name: "King Abdulaziz University Hospital",
      logo: "/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png"
    },
    { 
      name: "Saudi Health Council",
      logo: "/lovable-uploads/490e4e1f-9428-448f-87b4-1ee68f24331c.png"
    },
    { 
      name: "KAUST",
      logo: "/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png"
    },
    { 
      name: "KACST",
      logo: "/lovable-uploads/8b61ff0c-8ac1-4567-a8c2-24b34ecda18b.png"
    },
    { 
      name: "Ministry of Investment", 
      logo: "/lovable-uploads/dcd2d50c-77f9-409a-a6ba-fe69ade5fe12.png"
    },
    { 
      name: "NUPCO",
      logo: "/lovable-uploads/f997b965-bd17-4e6d-ba9c-af09c86b0eb0.png"
    },
    { 
      name: "Saudi Commission for Health Specialties", 
      logo: "/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png"
    },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-moh-darkGreen">{t('about.partners')}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {partners.map((partner, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg h-32"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="h-16 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-16 max-w-[140px] object-contain"
                />
              </div>
              <p className="mt-3 text-sm text-center text-gray-600 font-medium">{partner.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
