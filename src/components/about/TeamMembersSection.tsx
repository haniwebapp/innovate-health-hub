
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function TeamMembersSection() {
  const { t } = useLanguage();
  
  const teamMembers = [
    {
      name: "Dr. Ahmed Al-Saud",
      role: t('about.chiefInnovationOfficer'),
      image: "/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png"
    },
    {
      name: "Dr. Fatima Al-Zahrani",
      role: t('about.headOfResearch'),
      image: "/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png"
    },
    {
      name: "Eng. Omar Al-Qahtani",
      role: t('about.digitalTransformationLead'),
      image: "/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png"
    },
    {
      name: "Dr. Layla Hassan",
      role: t('about.healthcareAdvisor'),
      image: "/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png"
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">{t('about.ourTeam')}</h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('about.teamDescription')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={i} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow text-center"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-4 relative mx-auto w-24 h-24 overflow-hidden rounded-full bg-moh-lightGreen">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Users className="w-10 h-10 text-moh-green" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-medium mb-1 text-moh-darkGreen">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
