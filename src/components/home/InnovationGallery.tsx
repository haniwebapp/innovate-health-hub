
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

interface InnovationCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  trl: number;
  featured: boolean;
}

const InnovationCard = ({ title, description, image, category, trl, featured }: InnovationCardProps) => {
  const { language } = useLanguage();
  
  return (
    <motion.div 
      className="min-w-[280px] w-80 bg-white rounded-lg shadow-md overflow-hidden mx-2 flex-shrink-0"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-moh-gold text-white">
              {language === 'ar' ? 'مميز' : 'Featured'}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-xs border-moh-green text-moh-green">
            {category}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            TRL {trl}/9
          </Badge>
        </div>
        <h3 className="font-bold text-lg mb-1 text-moh-darkGreen">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <Button 
          variant="link" 
          className="text-moh-green p-0 mt-2 h-auto" 
          size="sm"
        >
          {language === 'ar' ? 'اقرأ المزيد' : 'Learn more'} →
        </Button>
      </div>
    </motion.div>
  );
};

export default function InnovationGallery() {
  const { t, language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filters = [
    { id: "all", label: t('home.innovations.filters.all') },
    { id: "featured", label: t('home.innovations.filters.featured') },
    { id: "high-trl", label: t('home.innovations.filters.highTRL') },
    { id: "digital-health", label: t('home.innovations.filters.digitalHealth') },
    { id: "ai", label: t('home.innovations.filters.ai') },
    { id: "devices", label: t('home.innovations.filters.devices') }
  ];
  
  const innovations = [
    {
      title: language === 'ar' ? "نظام الذكاء الاصطناعي للتشخيص المبكر" : "AI-Powered Early Diagnosis System",
      description: language === 'ar' ? "تقنية مبتكرة تستخدم الذكاء الاصطناعي للكشف المبكر عن أمراض القلب والأوعية الدموية." : "Innovative technology using AI for early detection of cardiovascular diseases.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: language === 'ar' ? "الذكاء الاصطناعي" : "AI",
      trl: 7,
      featured: true
    },
    {
      title: language === 'ar' ? "منصة الرعاية الصحية عن بعد" : "Telehealth Platform",
      description: language === 'ar' ? "منصة شاملة تربط المرضى بمقدمي الرعاية الصحية من خلال استشارات افتراضية آمنة." : "Comprehensive platform connecting patients with healthcare providers through secure virtual consultations.",
      image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: language === 'ar' ? "الصحة الرقمية" : "Digital Health",
      trl: 9,
      featured: true
    },
    {
      title: language === 'ar' ? "جهاز مراقبة متقدم قابل للارتداء" : "Advanced Wearable Monitor",
      description: language === 'ar' ? "جهاز قابل للارتداء يتتبع العلامات الحيوية في الوقت الفعلي ويرسل التنبيهات إلى مقدمي الرعاية الصحية." : "Wearable device that tracks vital signs in real-time and sends alerts to healthcare providers.",
      image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: language === 'ar' ? "أجهزة" : "Devices",
      trl: 6,
      featured: false
    },
    {
      title: language === 'ar' ? "تطبيق إدارة الأدوية" : "Medication Management App",
      description: language === 'ar' ? "تطبيق للهاتف المحمول يساعد المرضى على إدارة الأدوية وتذكيرهم بالجرعات." : "Mobile app that helps patients manage medications and remember doses.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: language === 'ar' ? "الصحة الرقمية" : "Digital Health",
      trl: 8,
      featured: false
    },
    {
      title: language === 'ar' ? "روبوت مساعد للجراحة" : "Surgical Assistant Robot",
      description: language === 'ar' ? "روبوت دقيق يساعد الجراحين في العمليات المعقدة، مما يحسن الدقة والنتائج." : "Precision robot that assists surgeons in complex procedures, improving accuracy and outcomes.",
      image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: language === 'ar' ? "روبوتات" : "Robotics",
      trl: 7,
      featured: true
    },
    {
      title: language === 'ar' ? "نظام تحليلات الصحة السكانية" : "Population Health Analytics",
      description: language === 'ar' ? "منصة تحليلية تستخدم البيانات الضخمة لتحديد اتجاهات الصحة السكانية والمخاطر." : "Analytics platform using big data to identify population health trends and risks.",
      image: "https://images.unsplash.com/photo-1587369588294-ce3a0f26575b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: language === 'ar' ? "الذكاء الاصطناعي" : "AI",
      trl: 8,
      featured: false
    }
  ];
  
  // Filter innovations based on the active filter
  const filteredInnovations = activeFilter === "all" 
    ? innovations 
    : activeFilter === "featured" 
      ? innovations.filter(item => item.featured)
      : activeFilter === "high-trl"
        ? innovations.filter(item => item.trl >= 7)
        : innovations.filter(item => item.category.toLowerCase().includes(activeFilter.toLowerCase()));
  
  // Handle scroll buttons
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="py-16 bg-moh-lightGreen/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
              {t('home.innovations.tag')}
            </span>
            <h2 className="text-3xl font-bold mb-4 text-moh-darkGreen">
              {t('home.innovations.title')}
            </h2>
            <p className="max-w-3xl mx-auto text-gray-700">
              {t('home.innovations.description')}
            </p>
          </div>
        </ScrollFadeIn>
        
        {/* Innovation Filters */}
        <ScrollFadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={activeFilter === filter.id 
                  ? "bg-moh-green hover:bg-moh-darkGreen" 
                  : "border-moh-green text-moh-green hover:bg-moh-lightGreen"
                }
                onClick={() => setActiveFilter(filter.id)}
                size="sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </ScrollFadeIn>
        
        {/* Innovation Gallery */}
        <div className="relative">
          <ScrollFadeIn delay={0.3}>
            <div className="relative">
              <ScrollArea className="pb-4">
                <div 
                  ref={scrollRef}
                  className="flex space-x-4 py-4 px-1 overflow-x-auto no-scrollbar"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {filteredInnovations.map((innovation, index) => (
                    <InnovationCard
                      key={index}
                      title={innovation.title}
                      description={innovation.description}
                      image={innovation.image}
                      category={innovation.category}
                      trl={innovation.trl}
                      featured={innovation.featured}
                    />
                  ))}
                </div>
              </ScrollArea>
              
              <div className="absolute top-1/2 transform -translate-y-1/2 left-0 -ml-4">
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={scrollLeft}
                  className="rounded-full bg-white/80 hover:bg-white shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </Button>
              </div>
              
              <div className="absolute top-1/2 transform -translate-y-1/2 right-0 -mr-4">
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={scrollRight}
                  className="rounded-full bg-white/80 hover:bg-white shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </Button>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            className="bg-moh-green hover:bg-moh-darkGreen"
            size="lg"
          >
            {t('home.innovations.viewAllButton')}
          </Button>
        </div>
      </div>
    </section>
  );
}
