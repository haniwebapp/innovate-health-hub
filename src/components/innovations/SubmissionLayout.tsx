
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
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const isCompleted = formProgress[step.key as keyof typeof formProgress];
            const isCurrent = activeStep === index;
            
            return (
              <React.Fragment key={step.key}>
                <div 
                  className={`flex flex-col items-center ${isCurrent ? 'scale-110 transition-transform' : ''}`}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isCurrent ? 1.2 : 1 }}
                    className={`rounded-full h-12 w-12 flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-moh-green text-white' 
                        : isCurrent 
                        ? 'bg-moh-lightGreen text-moh-darkGreen border-2 border-moh-green' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Circle size={24} className={`${isCurrent ? 'fill-moh-lightGreen stroke-moh-darkGreen' : ''}`} />
                    )}
                  </motion.div>
                  <span className={`mt-2 text-sm font-medium ${isCurrent ? 'text-moh-darkGreen' : 'text-gray-500'}`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 ${index < activeStep ? 'bg-moh-green' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
              className="flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous Step
            </Button>
          ) : (
            <div></div> // Empty div for flexbox spacing
          )}
          
          {showNext && (
            <Button 
              onClick={handleNext} 
              className="bg-moh-green hover:bg-moh-darkGreen text-white flex items-center"
            >
              {nextButtonText}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
