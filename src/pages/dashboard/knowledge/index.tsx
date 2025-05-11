
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  ArrowRight, 
  Book, 
  BookOpen, 
  FileText, 
  GraduationCap,
  Lightbulb, 
  Loader2, 
  Search
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { 
  KnowledgeResource,
  LearningPath,
  fetchKnowledgeResources,
  fetchSavedResources
} from "@/utils/knowledgeUtils";
import { SemanticSearchBar } from "@/components/knowledge/SemanticSearchBar";
import { DocumentSummaryCard } from "@/components/knowledge/DocumentSummary";
import { SearchResultsList } from "@/components/knowledge/SearchResultsList";
import { LanguageSwitcher } from "@/components/knowledge/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";
import { SemanticSearchParams, KnowledgeAIService, SearchResults } from "@/services/ai/KnowledgeAIService";

export default function DashboardKnowledgePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredResources, setFeaturedResources] = useState<KnowledgeResource[]>([]);
  const [bestPractices, setBestPractices] = useState<KnowledgeResource[]>([]);
  const [policyGuidelines, setPolicyGuidelines] = useState<KnowledgeResource[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  
  // Search related states
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  
  // Language and RTL support
  const { language, t } = useLanguage();
  const rtlClasses = getRTLClasses(language);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        // Get featured resources
        const featured = await fetchKnowledgeResources(undefined, true);
        
        // Get resources by category
        const practicesPromise = fetchKnowledgeResources('best-practices');
        const policyPromise = fetchKnowledgeResources('policy');
        
        // Mock learning paths for now (API function to be implemented later)
        const mockLearningPaths: LearningPath[] = [
          {
            id: '1',
            title: 'Healthcare Innovation Fundamentals',
            description: 'Learn the basics of healthcare innovation and digital health transformation',
            category: 'Innovation',
            level: 'Beginner',
            estimated_hours: 8,
            featured: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Regulatory Compliance for Digital Health',
            description: 'Understanding regulatory frameworks and compliance for digital health products',
            category: 'Regulatory',
            level: 'Intermediate',
            estimated_hours: 12,
            featured: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Healthcare Data Privacy and Security',
            description: 'Best practices for securing healthcare data and maintaining privacy compliance',
            category: 'Security',
            level: 'Advanced',
            estimated_hours: 10,
            featured: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
        
        // Wait for all promises to resolve
        const [practices, policy] = await Promise.all([practicesPromise, policyPromise]);
        
        setFeaturedResources(featured);
        setBestPractices(practices);
        setPolicyGuidelines(policy);
        setLearningPaths(mockLearningPaths);
      } catch (error: any) {
        console.error("Error loading knowledge resources:", error);
        setError(error.message || "Failed to load knowledge resources");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSearch = async (params: SemanticSearchParams) => {
    setIsSearching(true);
    setSearchQuery(params.query);
    try {
      const results = await KnowledgeAIService.semanticSearch(params);
      setSearchResults(results);
      setActiveTab("search");
    } catch (error: any) {
      console.error("Search error:", error);
      setError(`Search failed: ${error.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  // Helper function to get icon for resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-6 w-6 text-moh-green" />;
      case 'video':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'course':
        return <GraduationCap className="h-6 w-6 text-purple-500" />;
      default:
        return <Book className="h-6 w-6 text-amber-500" />;
    }
  };

  return (
    <div className={`space-y-6 ${language === 'ar' ? 'rtl-mode' : ''}`}>
      <div className={`flex items-center justify-between ${rtlClasses.flex}`}>
        <BreadcrumbNav 
          items={[{ label: t('nav.dashboard'), href: "/dashboard" }]} 
          currentPage={t('nav.knowledge')} 
        />
        <LanguageSwitcher />
      </div>
      
      <div>
        <h1 className={`text-3xl font-bold tracking-tight mb-2 ${rtlClasses.text}`}>
          {t('knowledge.hub')}
        </h1>
        <p className={`text-muted-foreground ${rtlClasses.text}`}>
          {t('knowledge.hubDescription')}
        </p>
      </div>
      
      <SemanticSearchBar onSearch={handleSearch} isSearching={isSearching} />
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green mr-2" />
          <p>{t('knowledge.loading')}</p>
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t('common.error')}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={setActiveTab}
          value={activeTab}
          className="space-y-6"
        >
          <TabsList className={`bg-muted/50 ${rtlClasses.flex}`}>
            <TabsTrigger value="overview">{t('knowledge.overview')}</TabsTrigger>
            <TabsTrigger value="resources">{t('knowledge.resources')}</TabsTrigger>
            <TabsTrigger value="learning">{t('knowledge.learningPaths')}</TabsTrigger>
            <TabsTrigger value="search">{t('knowledge.searchResults')}</TabsTrigger>
            <TabsTrigger value="saved">{t('knowledge.saved')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {featuredResources.length > 0 ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className={`flex items-center ${rtlClasses.flex}`}>
                      <Lightbulb className={`h-5 w-5 ${rtlClasses.iconMargin} text-moh-gold`} />
                      {t('knowledge.featuredResources')}
                    </CardTitle>
                    <CardDescription className={rtlClasses.text}>
                      {t('knowledge.featuredResourcesDescription')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {featuredResources.slice(0, 3).map(resource => (
                        <motion.div 
                          key={resource.id}
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card className="h-full flex flex-col overflow-hidden">
                            <div className="aspect-video bg-muted relative">
                              {resource.thumbnail_url ? (
                                <img 
                                  src={resource.thumbnail_url} 
                                  alt={resource.title} 
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full bg-muted">
                                  {getResourceIcon(resource.type)}
                                </div>
                              )}
                            </div>
                            <CardContent className="flex-1 flex flex-col p-4">
                              <Badge 
                                variant="outline" 
                                className="self-start mb-2 bg-muted/50"
                              >
                                {resource.category}
                              </Badge>
                              <h3 className={`font-medium mb-2 line-clamp-2 ${rtlClasses.text}`}>
                                {resource.title}
                              </h3>
                              <p className={`text-sm text-muted-foreground line-clamp-2 mb-2 ${rtlClasses.text}`}>
                                {resource.description}
                              </p>
                              <div className={`flex items-center text-xs text-muted-foreground mt-auto ${rtlClasses.text}`}>
                                <span>{resource.downloads} {t('knowledge.downloads')}</span>
                                <span className="mx-1">•</span>
                                <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                              <Button 
                                asChild
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                              >
                                <Link to={`/dashboard/knowledge/resources/${resource.id}`}>
                                  {t('knowledge.viewResource')}
                                  <ArrowRight className={`h-3 w-3 ${language === 'ar' ? 'mr-1 transform rotate-180' : 'ml-1'}`} />
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  {featuredResources.length > 3 && (
                    <CardFooter className="pt-0">
                      <Button 
                        variant="ghost" 
                        className="w-full text-moh-green" 
                        asChild
                      >
                        <Link to="/dashboard/knowledge/resources">
                          {t('knowledge.viewAllResources')}
                          <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'mr-2 transform rotate-180' : 'ml-2'}`} />
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${rtlClasses.flex}`}>
                        <BookOpen className={`h-5 w-5 ${rtlClasses.iconMargin} text-purple-500`} />
                        {t('knowledge.bestPractices')}
                      </CardTitle>
                      <CardDescription className={rtlClasses.text}>
                        {t('knowledge.bestPracticesDescription')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bestPractices.slice(0, 3).map(resource => (
                          <div 
                            key={resource.id}
                            className={`flex items-start p-3 border rounded-lg ${rtlClasses.flex}`}
                          >
                            <div className="bg-muted/80 p-2 rounded mr-3">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className={`font-medium mb-1 line-clamp-1 ${rtlClasses.text}`}>{resource.title}</h3>
                              <p className={`text-xs text-muted-foreground line-clamp-2 mb-2 ${rtlClasses.text}`}>
                                {resource.description}
                              </p>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto text-moh-green" 
                                asChild
                              >
                                <Link to={`/dashboard/knowledge/resources/${resource.id}`}>
                                  {t('knowledge.readMore')}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className={`flex items-center ${rtlClasses.flex}`}>
                        <FileText className={`h-5 w-5 ${rtlClasses.iconMargin} text-blue-500`} />
                        {t('knowledge.policyGuidelines')}
                      </CardTitle>
                      <CardDescription className={rtlClasses.text}>
                        {t('knowledge.policyGuidelinesDescription')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {policyGuidelines.slice(0, 3).map(resource => (
                          <div 
                            key={resource.id}
                            className={`flex items-start p-3 border rounded-lg ${rtlClasses.flex}`}
                          >
                            <div className="bg-muted/80 p-2 rounded mr-3">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className={`font-medium mb-1 line-clamp-1 ${rtlClasses.text}`}>{resource.title}</h3>
                              <p className={`text-xs text-muted-foreground line-clamp-2 mb-2 ${rtlClasses.text}`}>
                                {resource.description}
                              </p>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto text-moh-green" 
                                asChild
                              >
                                <Link to={`/dashboard/knowledge/resources/${resource.id}`}>
                                  {t('knowledge.readMore')}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className={`flex items-center ${rtlClasses.flex}`}>
                      <GraduationCap className={`h-5 w-5 ${rtlClasses.iconMargin} text-moh-green`} />
                      {t('knowledge.learningPaths')}
                    </CardTitle>
                    <CardDescription className={rtlClasses.text}>
                      {t('knowledge.learningPathsDescription')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {learningPaths.slice(0, 3).map(path => (
                        <Card 
                          key={path.id}
                          className={`border ${
                            path.featured ? 'border-moh-green bg-moh-lightGreen/20' : ''
                          }`}
                        >
                          <CardHeader className="pb-2">
                            {path.featured && (
                              <Badge className="w-fit mb-1 bg-moh-green text-white">
                                {t('common.featured')}
                              </Badge>
                            )}
                            <CardTitle className={`text-lg ${rtlClasses.text}`}>{path.title}</CardTitle>
                            <CardDescription className={`line-clamp-2 ${rtlClasses.text}`}>
                              {path.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex flex-wrap gap-2 text-xs mb-3">
                              <Badge variant="secondary" className="text-xs font-normal">
                                {path.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs font-normal">
                                {path.level}
                              </Badge>
                              <Badge variant="outline" className="text-xs font-normal">
                                {path.estimated_hours} {t('knowledge.hours')}
                              </Badge>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              size="sm"
                              variant="outline"
                              className="w-full"
                              asChild
                            >
                              <Link to={`/dashboard/knowledge/learning/${path.id}`}>
                                {t('knowledge.viewPath')}
                                <ArrowRight className={`h-3 w-3 ${language === 'ar' ? 'mr-1 transform rotate-180' : 'ml-1'}`} />
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  {learningPaths.length > 3 && (
                    <CardFooter className="pt-0">
                      <Button 
                        variant="ghost" 
                        className="w-full text-moh-green"
                        asChild
                      >
                        <Link to="/dashboard/knowledge/learning">
                          {t('knowledge.viewAllLearningPaths')}
                          <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'mr-2 transform rotate-180' : 'ml-2'}`} />
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className={`text-lg font-medium mb-2 ${rtlClasses.text}`}>
                  {t('knowledge.noResourcesAvailable')}
                </h3>
                <p className={`text-muted-foreground mb-6 max-w-md mx-auto ${rtlClasses.text}`}>
                  {t('knowledge.noResourcesDescription')}
                </p>
                <Button asChild>
                  <Link to="/dashboard">
                    {t('common.returnToDashboard')}
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            {/* Resources tab content would go here */}
            <p>{t('knowledge.resourcesListComingSoon')}</p>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            {/* Learning paths tab content would go here */}
            <p>{t('knowledge.learningPathsComingSoon')}</p>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            {searchResults ? (
              <SearchResultsList results={searchResults} searchQuery={searchQuery} />
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className={`text-lg font-medium mb-2 ${rtlClasses.text}`}>
                  {t('knowledge.noSearchPerformed')}
                </h3>
                <p className={`text-muted-foreground ${rtlClasses.text}`}>
                  {t('knowledge.useSearchBar')}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            {/* Saved resources tab content would go here */}
            <p>{t('knowledge.savedResourcesComingSoon')}</p>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
