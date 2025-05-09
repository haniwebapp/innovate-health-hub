
import { useLanguage } from "@/contexts/LanguageContext";

export default function VisionMissionSection() {
  const { language } = useLanguage();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">Our Vision</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              To become the leading healthcare innovation ecosystem in the Middle East, driving the transformation of Saudi healthcare through technology, collaboration, and forward-thinking solutions.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To connect healthcare innovators with the resources, expertise, and opportunities they need to develop and scale solutions that address Saudi Arabia's healthcare challenges and improve patient outcomes across the Kingdom.
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
  );
}
