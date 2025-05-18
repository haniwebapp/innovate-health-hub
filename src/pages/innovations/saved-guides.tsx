
import React, { useEffect, useState } from 'react';
import { InnovationGuideService } from '@/services/ai/innovation/InnovationGuideService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb, ArrowRight, Clock, Trash2, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SavedGuide {
  id: string;
  title: string;
  description: string;
  created_at: string;
  innovation_type: string;
  innovation_stage: string;
}

export default function SavedGuidesPage() {
  const [guides, setGuides] = useState<SavedGuide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<SavedGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStage, setFilterStage] = useState<string | null>(null);
  const [guideToDelete, setGuideToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const data = await InnovationGuideService.listGuides();
        // Make sure the data matches the SavedGuide interface
        const formattedGuides: SavedGuide[] = data.map((guide: any) => ({
          id: guide.id,
          title: guide.title,
          description: guide.description,
          created_at: guide.created_at,
          innovation_type: guide.innovation_type || 'Unknown Type',
          innovation_stage: guide.innovation_stage || 'Unknown Stage'
        }));
        setGuides(formattedGuides);
        setFilteredGuides(formattedGuides);
      } catch (error) {
        console.error("Failed to fetch guides:", error);
        toast({
          title: "Error",
          description: "Failed to load saved guides",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [toast]);

  // Filter guides based on search query and filters
  useEffect(() => {
    let result = [...guides];
    
    // Apply text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        guide => 
          guide.title.toLowerCase().includes(query) || 
          guide.description.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (filterType) {
      result = result.filter(guide => guide.innovation_type === filterType);
    }
    
    // Apply stage filter
    if (filterStage) {
      result = result.filter(guide => guide.innovation_stage === filterStage);
    }
    
    setFilteredGuides(result);
  }, [searchQuery, filterType, filterStage, guides]);

  const handleDeleteGuide = async (id: string) => {
    try {
      await InnovationGuideService.deleteGuide(id);
      setGuides(guides.filter(guide => guide.id !== id));
      toast({
        title: "Success",
        description: "Guide deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete guide:", error);
      toast({
        title: "Error",
        description: "Failed to delete guide",
        variant: "destructive"
      });
    }
    setGuideToDelete(null);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Get unique innovation types and stages for filters
  const innovationTypes = Array.from(new Set(guides.map(guide => guide.innovation_type)));
  const innovationStages = Array.from(new Set(guides.map(guide => guide.innovation_stage)));

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilterType(null);
    setFilterStage(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-moh-darkGreen">Saved Innovation Guides</h1>
            <p className="text-gray-600 mt-2">Access your previously generated innovation guidance</p>
          </div>
          <Button asChild className="bg-moh-green hover:bg-moh-darkGreen mt-4 md:mt-0">
            <Link to="/innovations/guide">Generate New Guide</Link>
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    <span>Filters</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                  {innovationTypes.map(type => (
                    <DropdownMenuItem 
                      key={type}
                      className={filterType === type ? "bg-moh-lightGreen/20" : ""}
                      onClick={() => setFilterType(type === filterType ? null : type)}
                    >
                      {type}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by Stage</DropdownMenuLabel>
                  {innovationStages.map(stage => (
                    <DropdownMenuItem 
                      key={stage}
                      className={filterStage === stage ? "bg-moh-lightGreen/20" : ""}
                      onClick={() => setFilterStage(stage === filterStage ? null : stage)}
                    >
                      {stage}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={resetFilters} className="text-moh-darkGreen font-medium">
                    Reset All Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Active filters display */}
          {(filterType || filterStage) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {filterType && (
                <div className="bg-moh-lightGreen/10 text-moh-green px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  Type: {filterType}
                  <button 
                    className="ml-2 hover:text-moh-darkGreen" 
                    onClick={() => setFilterType(null)}
                  >
                    ×
                  </button>
                </div>
              )}
              {filterStage && (
                <div className="bg-moh-lightGreen/10 text-moh-green px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  Stage: {filterStage}
                  <button 
                    className="ml-2 hover:text-moh-darkGreen" 
                    onClick={() => setFilterStage(null)}
                  >
                    ×
                  </button>
                </div>
              )}
              {(filterType || filterStage) && (
                <button 
                  className="text-xs text-moh-darkGreen hover:underline"
                  onClick={resetFilters}
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results summary */}
        <div className="text-sm text-gray-500 mb-4">
          {!loading && (
            <>
              Showing {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'}
              {(searchQuery || filterType || filterStage) ? ' with applied filters' : ''}
            </>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-moh-green"></div>
          </div>
        ) : filteredGuides.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white rounded-lg border border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-moh-lightGreen/30 text-moh-green">
              <Lightbulb size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {guides.length === 0 ? 'No guides saved yet' : 'No guides match your filters'}
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {guides.length === 0 
                ? 'Generate your first innovation guide to get personalized guidance for your healthcare innovation.'
                : 'Try adjusting your search or clearing filters to see more results.'}
            </p>
            {guides.length === 0 ? (
              <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
                <Link to="/innovations/guide">Create Your First Guide</Link>
              </Button>
            ) : (
              <Button variant="outline" onClick={resetFilters}>
                Clear All Filters
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredGuides.map((guide) => (
              <motion.div key={guide.id} variants={itemVariants}>
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300 border-moh-green/10">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="bg-moh-lightGreen/20 text-moh-green px-3 py-1 rounded-full text-xs font-medium">
                        {guide.innovation_stage}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock size={14} className="mr-1" />
                        {formatDate(guide.created_at)}
                      </div>
                    </div>
                    <CardTitle className="mt-3 text-xl text-moh-darkGreen">
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="bg-moh-lightGold/10 text-moh-darkGold px-2 py-1 rounded text-xs inline-flex">
                      {guide.innovation_type}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t flex justify-between items-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 h-8 w-8"
                      onClick={() => setGuideToDelete(guide.id)}
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Delete</span>
                    </Button>
                    <Button variant="ghost" className="ml-auto text-moh-green hover:text-moh-darkGreen group" asChild>
                      <Link to={`/innovations/guides/${guide.id}`}>
                        View Guide
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Confirmation Dialog for Deletion */}
      <AlertDialog open={!!guideToDelete} onOpenChange={() => setGuideToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this innovation guide. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => guideToDelete && handleDeleteGuide(guideToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
