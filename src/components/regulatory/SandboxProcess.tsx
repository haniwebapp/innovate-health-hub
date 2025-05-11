
import React from 'react';
import { FileText, Users, ClipboardCheck, Award } from 'lucide-react';

export function SandboxProcess() {
  const steps = [
    {
      title: "Submit Application",
      description: "Fill out the sandbox application with details about your innovation and specific regulatory challenges.",
      icon: <FileText className="h-6 w-6 text-moh-green" />
    },
    {
      title: "Expert Review",
      description: "Our regulatory experts will review your application and provide initial feedback.",
      icon: <Users className="h-6 w-6 text-moh-green" />
    },
    {
      title: "Testing Framework",
      description: "If approved, we'll develop a tailored compliance testing framework for your innovation.",
      icon: <ClipboardCheck className="h-6 w-6 text-moh-green" />
    },
    {
      title: "Regulatory Pathway",
      description: "Complete the sandbox program with a clear pathway to full regulatory compliance.",
      icon: <Award className="h-6 w-6 text-moh-green" />
    }
  ];

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold text-moh-darkGreen mb-8 text-center">
        How the Regulatory Sandbox Works
      </h2>
      
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-[22px] top-10 h-[calc(100%-40px)] w-0.5 bg-gray-200 hidden sm:block" />
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-white rounded-full p-3 border-2 border-moh-green relative z-10">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
