
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SubmissionFormProvider } from '@/contexts/SubmissionFormContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import InnovationSubmitPreview from '@/components/innovations/InnovationSubmitPreview';

export default function InnovationSubmitPage() {
  const navigate = useNavigate();

  const handleStartSubmission = () => {
    navigate('/innovations/submit/basic-info');
  };

  return (
    <SubmissionFormProvider>
      <div className="container mx-auto py-12 px-4">
        <div className="mb-6 flex items-center">
          <Link to="/innovations">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Innovations
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-moh-darkGreen ml-4">Submit Your Innovation</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Outlet />
          </div>
          <div>
            <InnovationSubmitPreview />
          </div>
        </div>
      </div>
    </SubmissionFormProvider>
  );
}
