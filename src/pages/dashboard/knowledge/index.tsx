
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
  
  // Language support
  const { t } = useLanguage();

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav 
          items={[{ label: "Dashboard", href: "/dashboard" }]} 
          currentPage="Knowledge Hub" 
        />
        <LanguageSwitcher />
      </div>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Knowledge Hub
        </h1>
        <p className="text-muted-foreground">
          Access resources, research papers, and guides to support your healthcare innovation journey
        </p>
      </div>
      
      <SemanticSearchBar onSearch={handleSearch} isSearching={isSearching} />
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green mr-2" />
          <p>Loading resources...</p>
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={setActiveTab}
          value={activeTab}
          className="space-y-6"
        >
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
            <TabsTrigger value="search">Search Results</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {featuredResources.length > 0 ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-moh-gold" />
                      Featured Resources
                    </CardTitle>
                    <CardDescription>
                      Highlighted resources curated by the Ministry of Health
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
                              <h3 className="font-medium mb-2 line-clamp-2">
                                {resource.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {resource.description}
                              </p>
                              <div className="flex items-center text-xs text-muted-foreground mt-auto">
                                <span>{resource.downloads} downloads</span>
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
                                  View Resource
                                  <ArrowRight className="h-3 w-3 ml-1" />
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
                          View All Resources
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                        Best Practices
                      </CardTitle>
                      <CardDescription>
                        Learn from successful healthcare innovations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bestPractices.slice(0, 3).map(resource => (
                          <div 
                            key={resource.id}
                            className="flex items-start p-3 border rounded-lg"
                          >
                            <div className="bg-muted/80 p-2 rounded mr-3">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1 line-clamp-1">{resource.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {resource.description}
                              </p>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto text-moh-green" 
                                asChild
                              >
                                <Link to={`/dashboard/knowledge/resources/${resource.id}`}>
                                  Read More
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
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        Policy Guidelines
                      </CardTitle>
                      <CardDescription>
                        Official guidance and regulatory information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {policyGuidelines.slice(0, 3).map(resource => (
                          <div 
                            key={resource.id}
                            className="flex items-start p-3 border rounded-lg"
                          >
                            <div className="bg-muted/80 p-2 rounded mr-3">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1 line-clamp-1">{resource.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {resource.description}
                              </p>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto text-moh-green" 
                                asChild
                              >
                                <Link to={`/dashboard/knowledge/resources/${resource.id}`}>
                                  Read More
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
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-moh-green" />
                      Learning Paths
                    </CardTitle>
                    <CardDescription>
                      Structured learning programs for healthcare professionals
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
                                Featured
                              </Badge>
                            )}
                            <CardTitle className="text-lg">{path.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
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
                                {path.estimated_hours} hours
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
                                View Path
                                <ArrowRight className="h-3 w-3 ml-1" />
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
                          View All Learning Paths
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Resources Available
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  There are currently no knowledge resources available. Please check back later.
                </p>
                <Button asChild>
                  <Link to="/dashboard">
                    Return to Dashboard
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            {/* Resources tab content would go here */}
            <p>Resources list coming soon</p>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            {/* Learning paths tab content would go here */}
            <p>Learning paths coming soon</p>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            {searchResults ? (
              <SearchResultsList results={searchResults.results || []} searchQuery={searchQuery} loading={isSearching} />
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Search Performed
                </h3>
                <p className="text-muted-foreground">
                  Use the search bar above to find knowledge resources
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            {/* Saved resources tab content would go here */}
            <p>Saved resources coming soon</p>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
