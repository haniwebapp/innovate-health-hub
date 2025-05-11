
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, File, Video, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { getRTLClasses } from "@/utils/rtlUtils";
import { Progress } from "@/components/ui/progress";
import { SearchResults } from "@/services/ai/KnowledgeAIService";

interface SearchResultsListProps {
  results: SearchResults;
  searchQuery: string;
}

export function SearchResultsList({ results, searchQuery }: SearchResultsListProps) {
  const { language, t } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  // Helper function to get the appropriate icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'presentation':
        return <File className="h-5 w-5 text-purple-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-moh-green" />;
    }
  };
  
  if (!results.results || results.results.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">
            {t('knowledge.noResultsFound')}
          </h3>
          <p className="text-muted-foreground text-center mb-6">
            {t('knowledge.noResultsFoundDescription', { query: searchQuery })}
          </p>
          <Button variant="outline">
            {t('knowledge.modifySearch')}
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4 mt-6">
      <div className={rtlClasses.text}>
        <p className="text-muted-foreground">
          {t('knowledge.resultsFoundCount', { count: results.totalCount, query: searchQuery })}
        </p>
      </div>
    
      {results.results.map(result => (
        <Card key={result.id} className="overflow-hidden">
          <CardHeader className={`pb-2 ${language === 'ar' ? 'text-right' : ''}`}>
            <div className={`flex justify-between items-start ${rtlClasses.flex}`}>
              <div className="flex-1">
                <div className={`flex items-center ${rtlClasses.flex}`}>
                  <div className={`${rtlClasses.iconMargin}`}>
                    {getResourceIcon(result.type)}
                  </div>
                  <CardTitle className="text-lg">{result.title}</CardTitle>
                </div>
                <CardDescription className="mt-1">
                  {result.summary && result.summary.length > 150 
                    ? `${result.summary.substring(0, 150)}...` 
                    : result.summary}
                </CardDescription>
              </div>
              
              <div className="flex flex-col items-center ml-4">
                <Badge variant="outline" className="mb-1 capitalize">
                  {result.type}
                </Badge>
                <Badge variant="secondary" className="bg-moh-lightGreen/50">
                  {result.category}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className={language === 'ar' ? 'text-right' : ''}>
            <div className="mt-2">
              <div className={`flex items-center justify-between mb-1 ${rtlClasses.flex}`}>
                <span className="text-sm text-muted-foreground">
                  {t('knowledge.relevanceScore')}
                </span>
                <span className="text-sm font-medium">
                  {result.relevanceScore}%
                </span>
              </div>
              <Progress value={result.relevanceScore} className="h-1" />
            </div>
          </CardContent>
          
          <CardFooter className="pt-0 pb-3">
            <div className={`w-full flex ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="text-moh-green border-moh-green hover:bg-moh-lightGreen/20"
              >
                <Link to={`/dashboard/knowledge/resources/${result.id}`}>
                  <span>{t('knowledge.viewResource')}</span>
                  <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'mr-1 transform rotate-180' : 'ml-1'}`} />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
