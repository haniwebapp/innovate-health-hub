
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserProfileForm from "@/components/auth/UserProfileForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfilePage() {
  const { t, language } = useLanguage();
  
  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.title')}</h1>
        <p className="text-muted-foreground">
          {t('profile.description')}
        </p>
      </div>
      
      <div className="grid gap-6">
        <UserProfileForm />
        
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.accountSettings')}</CardTitle>
            <CardDescription>{t('profile.preferences')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">{t('profile.emailNotifications')}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('profile.notificationsDesc')}
              </p>
              <p className="text-sm">
                {t('profile.changeSettings')}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">{t('profile.password')}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('profile.passwordDesc')}
              </p>
              <p className="text-sm">
                {t('profile.passwordChange')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
