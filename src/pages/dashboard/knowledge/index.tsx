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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { 
  fetchKnowledgeResources,
  KnowledgeResource,
  LearningPath,
  fetchSavedResources
} from "@/utils/knowledgeUtils";

export default function DashboardKnowledgePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredResources, setFeaturedResources] = useState<KnowledgeResource[]>([]);
  const [bestPractices, setBestPractices] = useState<KnowledgeResource[]>([]);
  const [policyGuidelines, setPolicyGuidelines] = useState<KnowledgeResource[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);

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
      <BreadcrumbNav 
        items={[{ label: "Dashboard", href: "/dashboard" }]} 
        currentPage="Knowledge Hub" 
      />
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Knowledge Hub</h1>
        <p className="text-muted-foreground">
          Access resources, guidelines, and learning materials to support your healthcare innovation journey.
        </p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search for resources, guidelines, or topics..." 
          className="pl-10 bg-background" 
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green mr-2" />
          <p>Loading knowledge resources...</p>
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
          className="space-y-6"
        >
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
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
                      Highlighted resources curated for healthcare innovators
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
                              <h3 className="font-medium mb-2 line-clamp-2">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {resource.description}
                              </p>
                              <div className="flex items-center text-xs text-muted-foreground mt-auto">
                                <span>{resource.downloads} downloads</span>
                                <span className="mx-1">•</span>
                                <span>{new Date(resource.updated_at).toLocaleDateString()}</span>
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
                          View all resources
                          <ArrowRight className="ml-2 h-4 w-4" />
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
                        Expert-reviewed healthcare innovation guidelines
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
                        Essential regulatory and policy information
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
                      Guided courses to develop your healthcare innovation skills
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
                              <Badge className="w-fit mb-1 bg-moh-green text-white">Featured</Badge>
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
                                <ArrowRight className="ml-1 h-3 w-3" />
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
                          View all learning paths
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Resources Available</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We're working on adding knowledge resources to help with your healthcare innovation journey.
                </p>
                <Button asChild>
                  <Link to="/dashboard">Return to Dashboard</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">All Resources</CardTitle>
                <CardDescription>
                  Browse all knowledge resources available in the hub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4 overflow-x-auto pb-2">
                  <Button variant="outline" className="mr-2 whitespace-nowrap">
                    All Categories
                  </Button>
                  {['Policy', 'Best Practices', 'Research', 'Case Studies', 'Guides'].map(cat => (
                    <Button key={cat} variant="ghost" className="mr-2 whitespace-nowrap">
                      {cat}
                    </Button>
                  ))}
                </div>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...featuredResources, ...bestPractices, ...policyGuidelines]
                    .filter((resource, index, self) => 
                      index === self.findIndex((r) => r.id === resource.id)
                    )
                    .map(resource => (
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
                            <h3 className="font-medium mb-2 line-clamp-2">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {resource.description}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground mt-auto">
                              <span>{resource.downloads} downloads</span>
                              <span className="mx-1">•</span>
                              <span>{new Date(resource.updated_at).toLocaleDateString()}</span>
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
            </Card>
          </TabsContent>
          
          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Learning Paths</CardTitle>
                <CardDescription>
                  Explore guided learning paths for healthcare innovation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths.map(path => (
                    <Card 
                      key={path.id}
                      className={`${
                        path.featured ? 'border-moh-green bg-moh-lightGreen/10' : ''
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                          <div className="md:w-2/3">
                            <div className="flex items-center mb-2">
                              {path.featured && (
                                <Badge className="mr-2 bg-moh-green text-white">
                                  Featured
                                </Badge>
                              )}
                              <Badge variant="outline">
                                {path.level}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-medium mb-2">{path.title}</h3>
                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {path.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="secondary">
                                {path.category}
                              </Badge>
                              <Badge variant="outline">
                                {path.estimated_hours} hours
                              </Badge>
                            </div>
                          </div>
                          <div className="md:w-1/3 flex justify-end">
                            <Button 
                              asChild
                              className="w-full md:w-auto"
                            >
                              <Link to={`/dashboard/knowledge/learning/${path.id}`}>
                                Start Learning
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {learningPaths.length === 0 && (
                    <div className="text-center py-8">
                      <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Learning Paths Available</h3>
                      <p className="text-muted-foreground mb-6">
                        We're working on creating learning paths for healthcare innovation.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Saved Items</CardTitle>
                <CardDescription>
                  Resources and learning materials you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Saved Items Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Save resources and learning paths to access them easily later.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
