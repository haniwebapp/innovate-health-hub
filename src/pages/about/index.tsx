
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { ChevronRight, Users, Building, Globe, Award, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-moh-lightGreen to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-moh-darkGreen">
              About Our Health Innovation Platform
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Transforming healthcare delivery through innovation, collaboration, and strategic partnerships 
              across Saudi Arabia's healthcare ecosystem.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium">
                <Users className="h-4 w-4 mr-1.5" />
                500+ Innovators
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium">
                <Award className="h-4 w-4 mr-1.5" />
                40+ Challenges
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium">
                <Globe className="h-4 w-4 mr-1.5" />
                National Impact
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">Our Vision</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To establish Saudi Arabia as a global leader in healthcare innovation, fostering 
                a dynamic ecosystem that addresses national health priorities and improves the quality 
                of life for all citizens in line with Vision 2030.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                We connect innovators, healthcare providers, regulators, and investors to accelerate 
                the development and deployment of transformative healthcare solutions, creating a seamless 
                pathway from idea to implementation across the Kingdom.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">Our Key Focus Areas</h2>
            <p className="max-w-2xl mx-auto text-gray-700">
              We are committed to addressing Saudi Arabia's most pressing healthcare challenges through innovation and collaboration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8 text-moh-green" />,
                title: "Preventative Healthcare",
                description: "Shifting from treatment to prevention with innovative solutions for early detection and monitoring."
              },
              {
                icon: <Building className="h-8 w-8 text-moh-green" />,
                title: "Healthcare Infrastructure",
                description: "Building resilient healthcare infrastructure that efficiently delivers services across the Kingdom."
              },
              {
                icon: <Globe className="h-8 w-8 text-moh-green" />,
                title: "Digital Health",
                description: "Leveraging technology to provide accessible, personalized, and efficient healthcare services."
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
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-moh-darkGreen">Our Strategic Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex items-center justify-center p-4 h-24 bg-gray-50 rounded-lg">
                <div className="bg-gray-200 h-12 w-36 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-16 bg-gradient-to-br from-moh-lightGreen to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">Join Our Innovation Community</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700">
            Be part of Saudi Arabia's healthcare transformation. Whether you're an innovator, investor, or healthcare provider, 
            there's a place for you in our growing community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-md font-medium inline-flex items-center">
              Register Now 
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-moh-green text-moh-green hover:bg-moh-lightGreen px-6 py-3 rounded-md font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
