
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const { user, isLoading } = useAuth();

  // Redirect authenticated users to dashboard
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-moh-lightGreen/20">
      <div className="w-full max-w-md p-4 space-y-8">
        <div className="text-center space-y-2">
          <img 
            src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
            alt="Ministry of Health Logo" 
            className="h-12 mx-auto" 
          />
          <h1 className="text-2xl font-bold">Innovation Platform</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <div className="text-center text-sm p-4 bg-blue-50 rounded-md border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-1">Quick Access Instructions</h3>
          <p className="text-blue-700 mb-2">For testing, click "Create Test Admin Account" button then sign in with:</p>
          <div className="bg-white p-2 rounded border border-blue-200 text-left inline-block min-w-[250px]">
            <p><span className="font-medium">Email:</span> admin@moh.gov.sa</p>
            <p><span className="font-medium">Password:</span> password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
