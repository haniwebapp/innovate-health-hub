
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  // Redirect authenticated users to dashboard
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-moh-lightGreen/20 flex flex-col md:flex-row items-center justify-center p-4" dir="ltr">
      {/* Go back to home button */}
      <div className="absolute top-4 left-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center text-moh-darkGreen hover:text-moh-green">
            <ArrowLeft className="mr-1 h-4 w-4" />
            {t('common.backToHome')}
          </Link>
        </Button>
      </div>
      
      {/* Left side (MOH branding area) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mb-8 md:mb-0 md:mr-8 text-center md:text-left"
      >
        <img 
          src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
          alt={t('footer.mohLogo')} 
          className="h-20 mx-auto md:mx-0 mb-6 hover:scale-105 transition-transform duration-300" 
        />
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-moh-darkGreen mb-4">
          {t('login.welcomeBack')}
        </h1>
        <p className="text-moh-darkGreen/70 text-md max-w-sm mx-auto md:mx-0 leading-relaxed">
          {t('login.platformDescription')}
        </p>
        
        <div className="hidden md:block mt-12">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-moh-gold/20 animate-float animation-delay-200"></div>
            <div className="absolute top-20 -right-4 w-16 h-16 rounded-full bg-moh-green/10 animate-float animation-delay-500"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Right side (Authentication form) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <Card className="border-gray-100 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 space-y-1">
            <CardTitle className="text-moh-darkGreen text-2xl font-playfair">{t('login.signIn')}</CardTitle>
            <CardDescription className="text-moh-darkGreen/70">
              {t('login.accessAccount')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-moh-darkGreen/60 mt-4"
        >
          {t('login.termsAndPrivacy')}
        </motion.p>
      </motion.div>
    </div>
  );
}
