
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { SubmissionFormProvider } from '@/contexts/SubmissionFormContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import InnovationSubmitPreview from '@/components/innovations/InnovationSubmitPreview';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function InnovationSubmitPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  // Check authentication status
  useEffect(() => {
    // If not authenticated, this should be handled by ProtectedRoute component
    // This is just a fallback
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit your innovation",
        variant: "default"
      });
      navigate("/auth/login", { state: { from: location.pathname } });
      return;
    }
    
    // Automatically redirect to the first step when this page loads
    if (window.location.pathname === '/innovations/submit') {
      navigate('/innovations/submit/basic-info');
    }
  }, [navigate, user, toast, location.pathname]);

  return (
    <SubmissionFormProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-moh-lightGreen/5 to-moh-lightGold/10">
        <div className="container mx-auto py-12 px-4">
          <div className="mb-8 flex items-center">
            <Link to="/dashboard">
              <Button variant="ghost" className="flex items-center group transition-all duration-300">
                <ArrowLeft size={16} className="mr-2 text-moh-darkGreen group-hover:translate-x-[-3px] transition-transform" />
                <span className="text-moh-darkGreen">Back to Dashboard</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-moh-darkGreen ml-4 bg-gradient-to-r from-moh-darkGreen to-moh-green bg-clip-text text-transparent">
              Submit Your Innovation
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Outlet />
            </div>
            <div className="lg:sticky lg:top-24 self-start">
              <InnovationSubmitPreview />
            </div>
          </div>
        </div>
      </div>
    </SubmissionFormProvider>
  );
}
