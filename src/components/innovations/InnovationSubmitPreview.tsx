
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileUp, CheckCircle, ArrowRight, Lightbulb, FileText, Image, ClipboardList, Shield, Building, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubmissionForm } from "@/contexts/SubmissionFormContext";

export default function InnovationSubmitPreview() {
  const navigate = useNavigate();
  const { formProgress, activeStep } = useSubmissionForm();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Steps in the innovation submission process with icons
  const submissionSteps = [
    {
      title: "Basic Information",
      description: "Enter your innovation details, category, and basic description",
      icon: <FileText size={16} />,
      path: "/innovations/submit/basic-info",
      key: "basicInfo"
    },
    {
      title: "Detailed Description",
      description: "Provide comprehensive information about your healthcare solution",
      icon: <ClipboardList size={16} />,
      path: "/innovations/submit/details",
      key: "details"
    },
    {
      title: "Upload Media",
      description: "Add images, videos, and documentation about your innovation",
      icon: <Image size={16} />,
      path: "/innovations/submit/media",
      key: "media"
    },
    {
      title: "Technical Specifications",
      description: "Share technical details and implementation requirements",
      icon: <FileUp size={16} />,
      path: "/innovations/submit/technical",
      key: "technical"
    },
    {
      title: "Regulatory Information",
      description: "Add details about compliance status and certifications",
      icon: <Shield size={16} />,
      path: "/innovations/submit/regulatory",
      key: "regulatory"
    },
    {
      title: "Contact Information",
      description: "Provide organizational and contact details",
      icon: <Building size={16} />,
      path: "/innovations/submit/contact",
      key: "contact"
    },
    {
      title: "Review & Submit",
      description: "Review your innovation details before final submission",
      icon: <CheckCircle size={16} />,
      path: "/innovations/submit/review",
      key: "review"
    }
  ];

  const handleStartSubmission = () => {
    navigate("/innovations/submit/basic-info");
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-moh-darkGreen">Submit Your Innovation</h3>
        <Button 
          className="bg-moh-green hover:bg-moh-darkGreen text-white"
          onClick={handleStartSubmission}
        >
          <FileUp size={16} className="mr-2" />
          {activeStep === 0 ? "Start Submission" : "Continue"}
        </Button>
      </div>

      <motion.div
        className="mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="text-gray-600 mb-4">
          Our streamlined submission process helps you showcase your healthcare innovation to the right stakeholders:
        </p>

        <div className="space-y-3 mb-6">
          {submissionSteps.map((step, index) => {
            const isCompleted = formProgress[step.key as keyof typeof formProgress];
            const isCurrent = activeStep === index;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex items-start p-3 rounded-md transition-all ${
                  isCurrent 
                    ? 'bg-moh-lightGreen/20 border border-moh-lightGreen/50' 
                    : isCompleted 
                    ? 'bg-gray-50 border border-moh-green/20' 
                    : 'bg-gray-50'
                }`}
                onClick={() => {
                  if (isCompleted || isCurrent) {
                    navigate(step.path);
                  }
                }}
                style={{ cursor: isCompleted || isCurrent ? 'pointer' : 'default' }}
              >
                <div className={`mr-3 mt-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium ${
                  isCompleted 
                    ? 'bg-moh-green text-white' 
                    : isCurrent 
                    ? 'bg-moh-lightGreen text-moh-darkGreen' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle size={12} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div>
                  <h4 className={`font-medium flex items-center ${
                    isCurrent ? 'text-moh-darkGreen' : isCompleted ? 'text-moh-green' : 'text-gray-700'
                  }`}>
                    {step.icon && <span className="mr-1">{step.icon}</span>}
                    {step.title}
                    {isCompleted && (
                      <CheckCircle size={14} className="ml-2 text-moh-green" />
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-start mb-4">
            <CheckCircle size={18} className="text-moh-green mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Your submission will be reviewed by our team before being published on the platform
            </p>
          </div>
          <div className="flex items-start mb-4">
            <CheckCircle size={18} className="text-moh-green mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              AI analysis will match your innovation with potential investors and implementation opportunities
            </p>
          </div>
          <div className="flex items-start">
            <CheckCircle size={18} className="text-moh-green mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              You'll receive regulatory guidance and market analysis based on your submission
            </p>
          </div>
        </div>
      </motion.div>

      <div className="bg-moh-lightGreen/20 rounded-lg p-4 border border-moh-lightGreen/30">
        <div className="flex items-start">
          <Lightbulb size={18} className="text-moh-gold mr-2 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700 font-medium">
              AI-Enhanced Innovation Platform
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Our platform leverages artificial intelligence to analyze your innovation, provide regulatory guidance, 
              and match you with potential investors and partners in the Saudi healthcare ecosystem.
            </p>
          </div>
        </div>
        <div className="mt-3 text-right">
          <Button variant="outline" size="sm" className="text-moh-green hover:bg-moh-lightGreen/20">
            Learn More
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
