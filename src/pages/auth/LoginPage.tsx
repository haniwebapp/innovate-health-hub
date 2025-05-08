
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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-4 space-y-8">
        <div className="text-center space-y-2">
          <img 
            src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
            alt="Ministry of Health Logo" 
            className="h-14 mx-auto" 
          />
          <h1 className="text-2xl font-bold text-moh-darkGreen">Innovation Platform</h1>
          <p className="text-moh-darkGreen/80 text-sm">Enter your credentials to access the platform</p>
        </div>
        
        <Card className="border-gray-100 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-moh-darkGreen">Sign In</CardTitle>
            <CardDescription className="text-moh-darkGreen/70">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
