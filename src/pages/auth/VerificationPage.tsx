
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerificationPage from '@/components/auth/VerificationPage';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function EmailVerificationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-moh-lightGreen/20">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
            alt="Ministry of Health Logo" 
            className="h-12 mx-auto" 
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Verify Your Email</CardTitle>
            <CardDescription>
              We've sent you a verification email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VerificationPage />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
