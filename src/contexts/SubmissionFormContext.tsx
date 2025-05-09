
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InnovationSubmission, SubmissionFormProgress } from '@/types/innovations';

type SubmissionFormContextType = {
  formData: Partial<InnovationSubmission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<InnovationSubmission>>>;
  updateFormData: (data: Partial<InnovationSubmission>) => void;
  formProgress: SubmissionFormProgress;
  updateProgress: (step: keyof SubmissionFormProgress, completed: boolean) => void;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  resetForm: () => void;
};

const initialFormProgress: SubmissionFormProgress = {
  basicInfo: false,
  details: false,
  media: false,
  technical: false,
  regulatory: false,
  contact: false,
  review: false,
};

const initialFormData: Partial<InnovationSubmission> = {};

const SubmissionFormContext = createContext<SubmissionFormContextType | undefined>(undefined);

export function SubmissionFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<InnovationSubmission>>(initialFormData);
  const [formProgress, setFormProgress] = useState<SubmissionFormProgress>(initialFormProgress);
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 7; // Including review step
  
  const updateFormData = (data: Partial<InnovationSubmission>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const updateProgress = (step: keyof SubmissionFormProgress, completed: boolean) => {
    setFormProgress(prev => ({ ...prev, [step]: completed }));
  };
  
  const resetForm = () => {
    setFormData(initialFormData);
    setFormProgress(initialFormProgress);
    setActiveStep(0);
  };
  
  return (
    <SubmissionFormContext.Provider 
      value={{
        formData,
        setFormData,
        updateFormData,
        formProgress,
        updateProgress,
        activeStep,
        setActiveStep,
        totalSteps,
        resetForm
      }}
    >
      {children}
    </SubmissionFormContext.Provider>
  );
}

export function useSubmissionForm() {
  const context = useContext(SubmissionFormContext);
  if (context === undefined) {
    throw new Error('useSubmissionForm must be used within a SubmissionFormProvider');
  }
  return context;
}
