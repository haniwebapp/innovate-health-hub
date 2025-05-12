
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollFadeIn } from '@/components/animations/ScrollFadeIn';
import { Scale, CheckCircle, Shield, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const RegulatorySandboxSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Test in Safe Environment",
      description: "Test your innovations in a controlled regulatory environment without full compliance burdens",
      icon: <Shield className="w-8 h-8 text-moh-green" />
    },
    {
      title: "Regulatory Guidance",
      description: "Receive personalized guidance from regulatory experts to navigate the approval process",
      icon: <Gavel className="w-8 h-8 text-moh-green" />
    },
    {
      title: "Expedited Review",
      description: "Fast-track review process for promising healthcare innovations",
      icon: <CheckCircle className="w-8 h-8 text-moh-green" />
    },
    {
      title: "Compliance Pathways",
      description: "Clear pathways to achieve full regulatory compliance for market entry",
      icon: <Scale className="w-8 h-8 text-moh-green" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="text-center mb-12">
            <span className="text-moh-green font-semibold text-sm uppercase tracking-wider">Regulatory Innovation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Regulatory Sandbox
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Navigate regulatory challenges with our innovative sandbox environment designed to help healthcare innovations thrive within compliance frameworks.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">How It Works</h3>
            <ol className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <span className="bg-moh-green text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
                <span>Apply for sandbox participation with your healthcare innovation</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-moh-green text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
                <span>Receive guidance on regulatory requirements and compliance needs</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-moh-green text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
                <span>Test your solution in a controlled environment with real users</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-moh-green text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">4</span>
                <span>Get feedback and adapt your solution to meet compliance standards</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-moh-green text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">5</span>
                <span>Graduate with a clear pathway to full market approval</span>
              </li>
            </ol>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="mb-3">{benefit.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={() => navigate("/regulatory")} 
            className="bg-moh-green hover:bg-moh-darkGreen"
          >
            Apply to the Sandbox
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RegulatorySandboxSection;
