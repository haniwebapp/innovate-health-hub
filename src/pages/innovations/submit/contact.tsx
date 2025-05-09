
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';
import SubmissionLayout from '@/components/innovations/SubmissionLayout';
import ContactForm from '@/components/innovations/ContactForm';

export default function ContactInformationPage() {
  const navigate = useNavigate();
  const { updateProgress } = useSubmissionForm();

  const handleFormComplete = () => {
    // Navigate to the review page
    navigate('/innovations/submit/review');
  };
  
  const handleNext = (): boolean => {
    // Check if this step is marked as completed
    const formState = localStorage.getItem('innovationFormProgress');
    
    if (formState) {
      const progress = JSON.parse(formState);
      
      if (progress.contact) {
        // If already completed, proceed to next step
        updateProgress('contact', true);
        return true;
      }
    }
    
    // If not completed, show a message asking to complete the form
    toast({
      title: "Please complete the form",
      description: "Fill out and save the contact information before proceeding.",
      variant: "destructive"
    });
    
    return false;
  };

  return (
    <SubmissionLayout onNext={handleNext} nextButtonText="Review Submission">
      <div>
        <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Contact Information</h2>
        <p className="text-gray-600 mb-6">
          Provide contact details for your innovation. This information will be used for communication and may be displayed on your innovation profile.
        </p>
        
        <ContactForm onComplete={handleFormComplete} />
      </div>
    </SubmissionLayout>
  );
}
