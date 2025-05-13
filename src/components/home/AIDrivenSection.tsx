
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollFadeIn } from '@/components/animations/ScrollFadeIn';
import { Bot, Brain, Lightbulb, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function AIDrivenSection() {
  const navigate = useNavigate();

  const aiFeatures = [
    {
      title: "AI-Powered Insights",
      description: "Leverage advanced machine learning algorithms to generate actionable insights from healthcare data",
      icon: <Brain className="h-8 w-8 text-white" />,
      color: "bg-moh-darkGreen"
    },
    {
      title: "Smart Matching",
      description: "Automatically connect innovations with relevant stakeholders, investors, and healthcare providers",
      icon: <PieChart className="h-8 w-8 text-white" />,
      color: "bg-moh-green"
    },
    {
      title: "Innovation Analysis",
      description: "Evaluate healthcare innovations against benchmarks and predict potential success metrics",
      icon: <Lightbulb className="h-8 w-8 text-white" />,
      color: "bg-moh-gold"
    },
    {
      title: "Virtual Assistant",
      description: "Navigate the innovation process with AI guidance for regulatory compliance and market entry",
      icon: <Bot className="h-8 w-8 text-white" />,
      color: "bg-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">AI-Enhanced Platform</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Intelligent Healthcare Innovation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tools accelerate innovation development, improve matching, and provide data-driven insights to transform healthcare delivery.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-gray-200 rounded-xl h-full shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
                <div className={`${feature.color} p-3 rounded-full inline-flex w-14 h-14 items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Decision Support</h3>
              <p className="text-gray-600 mb-6">
                Harness the power of artificial intelligence to make data-driven decisions about healthcare innovations, predict market fit, and identify optimal implementation strategies aligned with Vision 2030 healthcare goals.
              </p>
              <Button 
                onClick={() => navigate("/ai-solutions")} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Explore AI Solutions
              </Button>
            </div>
            
            <motion.div
              className="bg-gray-50 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg mb-4">AI Platform Capabilities</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Predictive Analytics</span>
                    <span className="font-medium">95% Accuracy</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Natural Language Processing</span>
                    <span className="font-medium">Advanced</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-moh-green h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Machine Learning Models</span>
                    <span className="font-medium">12 Specialized Models</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-moh-gold h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
