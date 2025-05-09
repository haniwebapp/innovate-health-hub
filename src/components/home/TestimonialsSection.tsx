
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  organization: string;
  image: string;
}

export default function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: language === 'ar'
        ? "منصة الابتكار الصحي كانت حاسمة في تسريع اعتماد حلنا. لقد سهلت الاتصال بالمنظمين والمستثمرين مما ساعدنا على التحرك بسرعة من النموذج الأولي إلى التنفيذ."
        : "The Health Innovation Platform was instrumental in accelerating the adoption of our solution. It facilitated connection with regulators and investors which helped us move quickly from prototype to implementation.",
      author: language === 'ar' ? "د. سارة الفهد" : "Dr. Sarah Al-Fahad",
      role: language === 'ar' ? "المؤسس والرئيس التنفيذي" : "Founder & CEO",
      organization: language === 'ar' ? "تك هيلث السعودية" : "TechHealth Saudi",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      quote: language === 'ar'
        ? "كمستثمر، توفر هذه المنصة رؤية لا مثيل لها لأكثر الابتكارات الصحية الواعدة في المملكة. إنها تساعدنا على اتخاذ قرارات استثمارية أفضل استنادًا إلى البيانات والتحليلات."
        : "As an investor, this platform provides unparalleled visibility into the most promising health innovations in the Kingdom. It helps us make better investment decisions based on data and analytics.",
      author: language === 'ar' ? "خالد الراشد" : "Khalid Al-Rashid",
      role: language === 'ar' ? "شريك إداري" : "Managing Partner",
      organization: language === 'ar' ? "صندوق الاستثمار السعودي للرعاية الصحية" : "Saudi Healthcare Venture Fund",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      quote: language === 'ar'
        ? "نحن في وزارة الصحة فخورون بإنشاء هذه المنصة لدعم المبتكرين. إنها تسرع من تبني التقنيات التي تحسن نتائج المرضى وتقلل من التكاليف في نظامنا الصحي."
        : "We at the Ministry of Health are proud to have created this platform to support innovators. It accelerates the adoption of technologies that improve patient outcomes and reduce costs in our health system.",
      author: language === 'ar' ? "د. محمد العبدالله" : "Dr. Mohammed Al-Abdullah",
      role: language === 'ar' ? "وكيل وزارة الصحة للابتكار" : "Deputy Minister for Innovation",
      organization: language === 'ar' ? "وزارة الصحة" : "Ministry of Health",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };
  
  // Partner logos - add your actual partner logos here
  const partners = [
    "/public/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png",
    "/public/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png",
    "/public/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
    "/public/lovable-uploads/4b75072f-e048-410c-8071-da579732a493.png",
    "/public/lovable-uploads/5993dbad-5475-4d1f-b16c-a18b49bdb942.png",
    "/public/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png",
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
              {t('home.testimonials.tag')}
            </span>
            <h2 className="text-3xl font-bold mb-6 text-moh-darkGreen">
              {t('home.testimonials.title')}
            </h2>
          </div>
        </ScrollFadeIn>
        
        <div className="mb-20 relative">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                index === activeIndex && (
                  <motion.div
                    key={testimonial.id}
                    className="bg-white rounded-lg p-8 shadow-lg relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Quote marks */}
                    <div className="absolute top-4 left-4 text-6xl text-moh-lightGreen opacity-20">
                      "
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-24 h-24 rounded-full object-cover border-4 border-moh-lightGreen"
                        />
                      </div>
                      
                      <div className="flex-grow text-center md:text-left">
                        <p className="italic text-lg mb-6 text-gray-700 relative z-10">
                          "{testimonial.quote}"
                        </p>
                        
                        <div>
                          <p className="font-semibold text-moh-darkGreen">{testimonial.author}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                          <p className="text-xs text-moh-green">{testimonial.organization}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-moh-lightGreen text-moh-darkGreen hover:bg-moh-green hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-5 h-5"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeIndex ? 'bg-moh-green' : 'bg-moh-lightGreen'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-moh-lightGreen text-moh-darkGreen hover:bg-moh-green hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-5 h-5"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Partners */}
        <ScrollFadeIn>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 text-moh-darkGreen">
              {t('home.partners.title')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.partners.subtitle')}
            </p>
          </div>
        </ScrollFadeIn>
        
        <ScrollFadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((logo, index) => (
              <motion.div
                key={index}
                className="h-20 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
