
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  // Redirect authenticated users to dashboard
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4" dir="ltr">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-6"
        >
          <img 
            src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
            alt="Ministry of Health Logo" 
            className="h-16 mx-auto" 
          />
          <h1 className="text-2xl md:text-3xl font-bold text-moh-darkGreen">{t('login.title')}</h1>
          <p className="text-moh-darkGreen/70 text-sm max-w-sm mx-auto">
            {t('login.description')}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-gray-100 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4 space-y-1">
              <CardTitle className="text-moh-darkGreen text-xl md:text-2xl">{t('login.signIn')}</CardTitle>
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
    </div>
  );
}
