
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function VerificationPage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-moh-lightGreen rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="h-10 w-10 text-moh-green" />
      </div>
      
      <h1 className="text-2xl font-bold">Check your email</h1>
      
      <p className="text-muted-foreground">
        We've sent you a verification email. Please check your inbox and follow the instructions to verify your account.
      </p>
      
      <div className="space-y-4 w-full">
        <Button asChild className="w-full">
          <Link to="/auth/login">Back to Login</Link>
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Didn't receive an email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
}
