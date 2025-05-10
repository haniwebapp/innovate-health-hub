
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerificationPage from '@/components/auth/VerificationPage';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function EmailVerificationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-moh-lightGreen/20 flex items-center justify-center p-4" dir="ltr">
      <div className="w-full max-w-md p-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <img 
            src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
            alt={t('footer.mohLogo')} 
            className="h-16 mx-auto hover:scale-105 transition-transform duration-300" 
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-gray-100 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-moh-darkGreen text-2xl font-playfair">{t('verification.title')}</CardTitle>
              <CardDescription className="text-moh-darkGreen/70">
                {t('verification.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VerificationPage />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
