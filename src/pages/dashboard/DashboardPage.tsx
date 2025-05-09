
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6" dir="ltr">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.welcome')}</h1>
        <p className="text-muted-foreground">
          {user?.user_metadata?.firstName ? `${t('dashboard.welcome')}, ${user.user_metadata.firstName}!` : t('dashboard.welcome')}! 
          {t('dashboard.description')}
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
          <TabsTrigger value="my-innovations">{t('dashboard.myInnovations')}</TabsTrigger>
          <TabsTrigger value="my-challenges">{t('dashboard.myChallenges')}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{t('dashboard.activeChallenges')}</CardTitle>
                <CardDescription>{t('dashboard.currentChallenges')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{t('dashboard.yourInnovations')}</CardTitle>
                <CardDescription>{t('dashboard.submittedInnovations')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{t('dashboard.knowledgeHub')}</CardTitle>
                <CardDescription>{t('dashboard.articlesResources')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">25+</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.gettingStarted')}</CardTitle>
              <CardDescription>{t('dashboard.quickLinks')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">{t('dashboard.submitInnovation')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('dashboard.shareInnovation')}</p>
                <a href="/innovations/submit" className="text-sm text-primary hover:underline">{t('dashboard.getStarted')} →</a>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">{t('dashboard.joinChallenge')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('dashboard.participateChallenges')}</p>
                <a href="/challenges" className="text-sm text-primary hover:underline">{t('dashboard.viewChallenges')} →</a>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">{t('dashboard.completeProfile')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('dashboard.updateInfo')}</p>
                <a href="/dashboard/profile" className="text-sm text-primary hover:underline">{t('dashboard.updateProfile')} →</a>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">{t('dashboard.exploreResources')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('dashboard.accessResources')}</p>
                <a href="/knowledge-hub" className="text-sm text-primary hover:underline">{t('dashboard.browseResources')} →</a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-innovations">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.myInnovations')}</CardTitle>
              <CardDescription>{t('dashboard.submittedInnovations')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('dashboard.noInnovations')}</p>
                <a href="/innovations/submit" className="text-primary hover:underline mt-2 inline-block">{t('dashboard.submitFirst')}</a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-challenges">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.myChallenges')}</CardTitle>
              <CardDescription>{t('dashboard.participateChallenges')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('dashboard.noChallenges')}</p>
                <a href="/challenges" className="text-primary hover:underline mt-2 inline-block">{t('dashboard.browseAvailable')}</a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
