
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const { user, isLoading } = useAuth();

  // Redirect authenticated users to dashboard
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="absolute top-6 left-6">
        <Link 
          to="/" 
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Back to home</span>
        </Link>
      </div>
      
      <div className="w-full max-w-md p-4 space-y-8">
        <div className="text-center space-y-3">
          <img 
            src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
            alt="Ministry of Health Logo" 
            className="h-16 mx-auto animate-fade-in" 
          />
          <h1 className="text-2xl font-bold text-gray-800 animate-fade-in animation-delay-100">
            Innovation Platform
          </h1>
          <p className="text-gray-600 text-sm animate-fade-in animation-delay-200">
            Enter your credentials to access the platform
          </p>
        </div>
        
        <Card className="border-gray-100 shadow-lg bg-white animate-fade-in animation-delay-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-800">Sign In</CardTitle>
            <CardDescription className="text-gray-500">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-gray-500 animate-fade-in animation-delay-400">
          <p>Don't have an account? <Link to="/auth/register" className="text-gray-700 hover:text-gray-900 font-medium">Register here</Link></p>
          <p className="mt-2">
            <Link to="#" className="text-gray-600 hover:text-gray-800">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
