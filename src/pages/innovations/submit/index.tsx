
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SubmissionFormProvider } from '@/contexts/SubmissionFormContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import InnovationSubmitPreview from '@/components/innovations/InnovationSubmitPreview';

export default function InnovationSubmitPage() {
  const navigate = useNavigate();

  // Automatically redirect to the first step when this page loads
  useEffect(() => {
    // Check if we're on the exact submission index page, not a subpage
    if (window.location.pathname === '/innovations/submit') {
      navigate('/innovations/submit/basic-info');
    }
  }, [navigate]);

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
