
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';

interface SubmissionLayoutProps {
  children: React.ReactNode;
  onNext?: () => boolean; // Return true to proceed, false to stay on current step
  onPrevious?: () => void;
  showNext?: boolean;
  nextButtonText?: string;
  showPrevious?: boolean;
  hideButtons?: boolean;
}

const steps = [
  { name: 'Basic Info', path: '/innovations/submit/basic-info', key: 'basicInfo' },
  { name: 'Details', path: '/innovations/submit/details', key: 'details' },
  { name: 'Media', path: '/innovations/submit/media', key: 'media' },
  { name: 'Technical', path: '/innovations/submit/technical', key: 'technical' },
  { name: 'Regulatory', path: '/innovations/submit/regulatory', key: 'regulatory' },
  { name: 'Contact', path: '/innovations/submit/contact', key: 'contact' },
  { name: 'Review', path: '/innovations/submit/review', key: 'review' }
];

export default function SubmissionLayout({
  children,
  onNext,
  onPrevious,
  showNext = true,
  nextButtonText = "Next Step",
  showPrevious = true,
  hideButtons = false
}: SubmissionLayoutProps) {
  const { activeStep, setActiveStep, formProgress, totalSteps } = useSubmissionForm();
  const navigate = useNavigate();

  const handleNext = () => {
    // Call the onNext callback if provided
    if (onNext && !onNext()) {
      return; // Stay on current step if validation fails
    }
    
    if (activeStep < totalSteps - 1) {
      // Go to the next step
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      navigate(steps[nextStep].path);
    }
  };

  const handlePrevious = () => {
    // Call the onPrevious callback if provided
    if (onPrevious) {
      onPrevious();
    }
    
    if (activeStep > 0) {
      // Go to the previous step
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
      navigate(steps[prevStep].path);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-10">
        <div className="flex justify-between items-center relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 bg-gray-200 z-0" />
          
          {steps.map((step, index) => {
            const isCompleted = formProgress[step.key as keyof typeof formProgress];
            const isCurrent = activeStep === index;
            
            return (
              <React.Fragment key={step.key}>
                <motion.div 
                  className={`flex flex-col items-center relative z-10 ${isCurrent ? 'scale-110 transition-transform' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ 
                      scale: isCurrent ? 1.2 : 1,
                      opacity: 1
                    }}
                    className={`rounded-full h-12 w-12 flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-moh-green to-moh-darkGreen text-white shadow-md' 
                        : isCurrent 
                          ? 'bg-gradient-to-br from-moh-lightGreen to-moh-green/70 text-white border-2 border-moh-green shadow-md' 
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Circle size={24} className={`${isCurrent ? 'fill-moh-lightGreen/50 stroke-white' : ''}`} />
                    )}
                  </motion.div>
                  <motion.span 
                    className={`mt-2 text-sm font-medium ${isCurrent ? 'text-moh-darkGreen' : isCompleted ? 'text-moh-green' : 'text-gray-500'}`}
                    animate={{ 
                      scale: isCurrent ? 1.1 : 1,
                      fontWeight: isCurrent ? 600 : 400
                    }}
                  >
                    {step.name}
                  </motion.span>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300 p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-moh-green via-moh-lightGreen to-moh-lightGold/50" />
        
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="min-h-[400px]"
        >
          {children}
        </motion.div>
      </div>

      {/* Navigation buttons */}
      {!hideButtons && (
        <div className="flex justify-between">
          {showPrevious ? (
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={activeStep === 0}
              className="flex items-center border-moh-green/30 text-moh-darkGreen hover:bg-moh-lightGreen/20 hover:border-moh-green transition-all duration-300"
            >
              <ArrowLeft size={16} className="mr-2 transition-transform group-hover:translate-x-[-2px]" />
              Previous Step
            </Button>
          ) : (
            <div></div> // Empty div for flexbox spacing
          )}
          
          {showNext && (
            <Button 
              onClick={handleNext} 
              className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white flex items-center group transition-all duration-300 shadow-sm hover:shadow"
            >
              {nextButtonText}
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-[2px]" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
