import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { ChevronRight, Users, Building, Globe, Award, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import GeneratedLogo from "@/components/logos/GeneratedLogo";

const AboutPage = () => {
  const { t, language } = useLanguage();
  
  // Strategic partners data with logos - updated to use real logos
  const partners = [
    { 
      name: "Ministry of Health", 
      logo: "/public/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png",
      useRealLogo: true 
    },
    { 
      name: "King Salman Medical City",
      logo: "/public/lovable-uploads/5993dbad-5475-4d1f-b16c-a18b49bdb942.png",
      useRealLogo: true
    },
    { 
      name: "Saudi Digital Health Authority",
      logo: "/public/lovable-uploads/4b75072f-e048-410c-8071-da579732a493.png",
      useRealLogo: true
    },
    { 
      name: "King Abdulaziz University Hospital",
      logo: "/public/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
      useRealLogo: true
    },
    { 
      name: "Saudi Health Council",
      logo: "/public/lovable-uploads/490e4e1f-9428-448f-87b4-1ee68f24331c.png",
      useRealLogo: true
    },
    { 
      name: "KAUST",
      logo: "/public/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png",
      useRealLogo: true
    },
    { 
      name: "KACST",
      logo: "/public/lovable-uploads/8b61ff0c-8ac1-4567-a8c2-24b34ecda18b.png",
      useRealLogo: true
    },
    { 
      name: "Ministry of Investment", 
      logo: "/public/lovable-uploads/dcd2d50c-77f9-409a-a6ba-fe69ade5fe12.png",
      useRealLogo: true
    },
    { 
      name: "NUPCO",
      logo: "/public/lovable-uploads/f997b965-bd17-4e6d-ba9c-af09c86b0eb0.png",
      useRealLogo: true
    },
    { 
      name: "Saudi Commission for Health Specialties", 
      logo: "/public/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png",
      useRealLogo: true
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-moh-lightGreen to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-moh-darkGreen">
              {t('about.title')}
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t('about.description')}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium">
                <Users className="h-4 w-4 mr-1.5" />
                500+ {t('about.innovators')}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium">
                <Award className="h-4 w-4 mr-1.5" />
                40+ {t('about.challenges')}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium">
                <Globe className="h-4 w-4 mr-1.5" />
                {t('about.impact')}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-20">
          <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#00814A" strokeWidth="2" />
            <path d="M30,50 L45,65 L70,35" stroke="#00814A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>
      
      {/* Vision & Mission section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">{t('about.vision')}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('about.visionText')}
              </p>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">{t('about.mission')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Healthcare innovation" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Focus Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">{t('about.focusAreas')}</h2>
            <p className="max-w-2xl mx-auto text-gray-700">
              {t('about.focusDescription')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8 text-moh-green" />,
                title: t('about.preventative'),
                description: t('about.preventativeDesc')
              },
              {
                icon: <Building className="h-8 w-8 text-moh-green" />,
                title: t('about.infrastructure'),
                description: t('about.infrastructureDesc')
              },
              {
                icon: <Globe className="h-8 w-8 text-moh-green" />,
                title: t('about.digital'),
                description: t('about.digitalDesc')
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Strategic Partners */}
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
      
      {/* Join Us CTA */}
      <section className="py-16 bg-gradient-to-br from-moh-lightGreen to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">{t('about.joinCommunity')}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700">
            {t('about.joinDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-md font-medium inline-flex items-center">
              {t('about.registerNow')} 
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-moh-green text-moh-green hover:bg-moh-lightGreen px-6 py-3 rounded-md font-medium">
              {t('about.learnMore')}
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default AboutPage;
