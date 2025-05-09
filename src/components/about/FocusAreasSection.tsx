
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Building, Globe } from "lucide-react";

export default function FocusAreasSection() {
  const { language } = useLanguage();
  
  const focusAreas = [
    {
      icon: <Heart className="h-8 w-8 text-moh-green" />,
      title: "Preventative Care",
      description: "Developing innovative approaches to health promotion and disease prevention to improve population health outcomes."
    },
    {
      icon: <Building className="h-8 w-8 text-moh-green" />,
      title: "Healthcare Infrastructure",
      description: "Building state-of-the-art facilities and services that improve access to quality healthcare across the Kingdom."
    },
    {
      icon: <Globe className="h-8 w-8 text-moh-green" />,
      title: "Digital Health Solutions",
      description: "Leveraging technology to enhance healthcare delivery, patient experience, and system efficiency."
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">Innovation Focus Areas</h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            We prioritize innovations that address critical healthcare challenges and align with the Kingdom's strategic healthcare goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {focusAreas.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
