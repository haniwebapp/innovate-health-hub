
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserProfileForm from "@/components/auth/UserProfileForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Bell, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProfilePage() {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState({
    marketing: true,
    security: true,
    serviceUpdates: false
  });
  
  return (
    <div className="space-y-6" dir="ltr">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold font-playfair text-moh-darkGreen tracking-tight">
          {t('profile.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('profile.description')}
        </p>
      </motion.div>
      
      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <UserProfileForm />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-moh-green/10 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white">
              <CardTitle className="text-2xl font-playfair text-moh-darkGreen">
                {t('profile.accountSettings')}
              </CardTitle>
              <CardDescription>{t('profile.preferences')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="flex items-center font-medium mb-4 text-moh-darkGreen">
                  <Bell className="h-4 w-4 mr-2 text-moh-green" />
                  {t('profile.emailNotifications')}
                </h3>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{t('profile.marketingEmails')}</p>
                      <p className="text-xs text-muted-foreground">{t('profile.marketingEmailsDesc')}</p>
                    </div>
                    <Switch 
                      checked={notifications.marketing} 
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})} 
                      className="data-[state=checked]:bg-moh-green"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{t('profile.securityAlerts')}</p>
                      <p className="text-xs text-muted-foreground">{t('profile.securityAlertsDesc')}</p>
                    </div>
                    <Switch 
                      checked={notifications.security} 
                      onCheckedChange={(checked) => setNotifications({...notifications, security: checked})} 
                      className="data-[state=checked]:bg-moh-green"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{t('profile.serviceUpdates')}</p>
                      <p className="text-xs text-muted-foreground">{t('profile.serviceUpdatesDesc')}</p>
                    </div>
                    <Switch 
                      checked={notifications.serviceUpdates} 
                      onCheckedChange={(checked) => setNotifications({...notifications, serviceUpdates: checked})} 
                      className="data-[state=checked]:bg-moh-green"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="flex items-center font-medium mb-4 text-moh-darkGreen">
                  <Lock className="h-4 w-4 mr-2 text-moh-green" />
                  {t('profile.password')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 ml-6">
                  {t('profile.passwordDesc')}
                </p>
                <div className="flex ml-6">
                  <Button variant="outline" className="border-moh-green/20 text-moh-green hover:bg-moh-lightGreen hover:text-moh-darkGreen">
                    {t('profile.passwordChange')}
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 pb-2">
                <p className="text-xs text-muted-foreground">
                  {t('profile.syncSettings')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
